import os
import time
import requests
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.mobilenet import preprocess_input
from tensorflow.keras.applications import MobileNet
from tensorflow.keras.applications.mobilenet import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

app = Flask(__name__)
CORS(app)

subscription_key = '9IvAlksxUB8bT7j7tueBvqUDMsPd8kpTCyKcSVBHsf4gNDvK4RhbJQQJ99AJACYeBjFXJ3w3AAAFACOGCRkg'
endpoint = 'https://eastus.api.cognitive.microsoft.com/'

# Load the pre-trained MobileNet model
mobilenet_model = MobileNet(weights='imagenet')

# Load your custom-trained model
model = load_model("./models/mobilenet_model_finetune.keras") #for predicting Tyre Categorry
model2 = load_model("./models/TI.keras") #for tyre vs nonTyres Pictures


# Function to extract text from an image using Azure OCR
def extract_text_from_image(image_path):
    read_url = endpoint + "vision/v3.1/read/analyze"
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key,
        'Content-Type': 'application/octet-stream'
    }

    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    response = requests.post(read_url, headers=headers, data=image_data)
    if response.status_code != 202:
        return None, f"Error: {response.status_code}, Message: {response.text}"

    operation_url = response.headers["Operation-Location"]

    while True:
        response = requests.get(operation_url, headers={'Ocp-Apim-Subscription-Key': subscription_key})
        result = response.json()

        if result['status'] == 'succeeded':
            break
        elif result['status'] == 'failed':
            return None, "Analysis failed."
        else:
            time.sleep(1)

    read_results = result['analyzeResult']['readResults']
    detected_text = []
    for page in read_results:
        for line in page['lines']:
            detected_text.append(line['text'])

    return detected_text, None

# Function to process tyre details from detected text
def process_tire_details(detected_text):
    tire_details = {
        "Width": "Not detected",
        "Aspect Ratio": "Not detected",
        "Rim Size": "Not detected",
        "Load Index": "Not detected",
        "Speed Rating": "Not detected",
        "Max Load/Pressure": "Not detected",
        "Other Markings": []
    }

    # Patterns for extracting key information
    size_pattern = re.compile(r"(\d{3})\s*/\s*(\d{2})\s*R\s*(\d{2})")
    load_speed_pattern = re.compile(r"R\s*\d{2}\s*(\d{2,3})\s*([A-Z])")
    max_pattern = re.compile(r"MAX\.?\s*([\d.]+)\s*(PSI|kg|BAR)?", re.IGNORECASE)
    serial_pattern = re.compile(r"[A-Z0-9-]{6,}")

    speed_ratings = {
        "N": "87 mph (140 km/h)",
        "P": "93 mph (150 km/h)",
        "Q": "99 mph (160 km/h)",
        "R": "106 mph (170 km/h)",
        "S": "112 mph (180 km/h)",
        "T": "118 mph (190 km/h)",
        "U": "124 mph (200 km/h)",
        "H": "130 mph (210 km/h)",
        "V": "149 mph (240 km/h)",
        "W": "168 mph (270 km/h)",
        "Y": "186 mph (300 km/h)",
        "Z": "Above 186 mph"
    }

    load_indices = {
        71: 345, 72: 355, 73: 365, 74: 375, 75: 387, 76: 400, 77: 412, 78: 425, 79: 437,
        80: 450, 81: 462, 82: 475, 83: 487, 84: 500, 85: 515, 86: 530, 87: 545, 88: 560,
        89: 580, 90: 600, 91: 615, 92: 630, 93: 650, 94: 670, 95: 690, 96: 710, 97: 730,
        98: 750, 99: 775
    }

    for text in detected_text:
        size_match = size_pattern.search(text)
        if size_match:
            tire_details["Width"] = f"{size_match.group(1)} mm"
            tire_details["Aspect Ratio"] = f"{size_match.group(2)}%"
            tire_details["Rim Size"] = f"{size_match.group(3)} inches"

        load_speed_match = load_speed_pattern.search(text)
        if load_speed_match:
            load_index = int(load_speed_match.group(1))
            speed_code = load_speed_match.group(2)

            weight_kg = load_indices.get(load_index, "Unknown")
            if weight_kg != "Unknown":
                weight_lbs = round(weight_kg * 2.20462, 1)
                tire_details["Load Index"] = f"{load_index} ({weight_kg} kg, {weight_lbs} lbs)"
            else:
                tire_details["Load Index"] = f"{load_index} (Unknown capacity)"

            tire_details["Speed Rating"] = f"{speed_code} ({speed_ratings.get(speed_code, 'Unknown speed rating')})"

        max_match = max_pattern.search(text)
        if max_match:
            pressure = max_match.group(1)
            unit = max_match.group(2) if max_match.group(2) else "PSI"
            tire_details["Max Load/Pressure"] = f"{pressure} {unit}".strip()

        if serial_pattern.match(text):
            tire_details["Other Markings"].append(text)

    tire_details["Other Markings"] = [
        "TUBELESS" if "TUBE" in marking else marking
        for marking in tire_details["Other Markings"]
        if not re.match(r"\d+\.\d+\.\d+", marking)
    ]

    return tire_details

def validate_image_is_tyre(image_path):
    try:
        print(f"Validating image for tyre content: {image_path}")

        # Load and preprocess the image
        img = image.load_img(image_path, target_size=(128,128))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # Predict using model2
        predictions = model2.predict(img_array)
        is_tyre = predictions[0][0] >= 0.5  # Check if the image is likely a tyre based on your model's output

        return is_tyre

    except Exception as e:
        print(f"Error in tyre validation: {e}")
        return False


@app.route('/predict_multiple', methods=['POST'])
def predict_multiple():
    if 'imagefiles' not in request.files:
        return jsonify({"error": "No files uploaded"}), 400

    imagefiles = request.files.getlist('imagefiles')
    results = []
    final_decision = {
        "details": [],
        "final_label": None
    }

    for imagefile in imagefiles:
        image_path = "./uploads/" + imagefile.filename
        os.makedirs("./uploads", exist_ok=True)
        imagefile.save(image_path)

        # Validate if the image is a tyre using the tyre vs non-tyre model
        if not validate_image_is_tyre(image_path):
            results.append({"filename": imagefile.filename, "error": "Not a tyre image"})
            continue

        # Process the image with the tyre categorization model if it's a tyre
        img = load_img(image_path, target_size=(128, 128))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        yhat = model.predict(img_array)
        labels = ['CRACKED', 'EXCELLENT', 'GOOD', 'POOR']
        predicted_label = labels[np.argmax(yhat)]
        confidence = np.max(yhat) * 100

        results.append({
            "filename": imagefile.filename,
            "label": predicted_label,
            "confidence": f"{confidence:.2f}%"
        })

    # Determine the most severe label based on predefined priorities
    labels_priority = {'POOR': 0, 'CRACKED': 1, 'GOOD': 2, 'EXCELLENT': 3}
    if results:
        final_decision['details'] = results
        # Aggregate results for sensitivity-based final decision
        final_decision['final_label'] = min(results, key=lambda x: labels_priority.get(x.get('label', ''), float('inf'))).get('label')

    return jsonify(final_decision)



@app.route('/extract_serial', methods=['POST'])
def handle_serial_extraction():
    # If a serial number is provided in JSON payload
    if request.is_json:
        data = request.get_json()
        if 'serialNumber' in data:
            serial_number = data['serialNumber']
            print(f"Received manual serial number: {serial_number}")

            # Simulate processing of serial number for details
            tire_details = process_tire_details([serial_number])
            return jsonify({"tire_details": tire_details}), 200

    # If an image file is uploaded
    if 'imagefile' in request.files:
        imagefile = request.files['imagefile']
        image_path = "./uploads/" + imagefile.filename
        os.makedirs("./uploads", exist_ok=True)
        imagefile.save(image_path)

        # Extract text from the uploaded image
        detected_text, error = extract_text_from_image(image_path)
        if error:
            return jsonify({"error": error}), 500

        # Process tire details from the detected text
        tire_details = process_tire_details(detected_text)
        return jsonify({"tire_details": tire_details}), 200

    return jsonify({"error": "No valid input provided"}), 400




if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)
