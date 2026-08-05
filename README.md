# FYP-Automind: Tyre Inspection System

Automind is an intelligent tyre inspection system that evaluates the condition of a vehicle's tyres using computer vision and Optical Character Recognition (OCR). The project consists of a **React Native** mobile application and a **Python/Flask** AI backend.

---

## 📁 PROJECT STRUCTURE

This repository is divided into two primary directories, each with its own responsibilities:

- **`frontend/`**
  - **Description:** The mobile application user interface. Handles user authentication, capturing/uploading images, and displaying results.
  - **Technologies:** React Native, JavaScript

- **`server/`**
  - **Description:** The AI backend API. Exposes endpoints for extracting serial numbers (Azure OCR) and predicting tyre conditions.
  - **Technologies:** Python, Flask, TensorFlow / Keras

---

## ⚙️ PREREQUISITES

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or newer) and **npm** or **Yarn**
- **Python** (3.8 or newer) and `pip`
- **React Native Development Environment** (Android Studio / SDKs for Android, Xcode for iOS)

---

## 🔑 ENVIRONMENT CONFIGURATION

This project uses a single `.env` file at the root of the project to manage secrets for both the frontend and the server.

1. In the root directory, you will find a `.env.example` file.
2. Duplicate it and rename the copy to `.env`.
3. Open the `.env` file and replace the placeholder values (`YOUR_FIREBASE_API_KEY`, etc.) with your actual API keys and credentials.

> **Note:** The `.env` file should never be committed to version control. It is already added to your `.gitignore`.

### REQUIRED API KEYS & THEIR PURPOSES

- **Azure Cognitive Services (`AZURE_SUBSCRIPTION_KEY`, `AZURE_ENDPOINT`)**
  - **Purpose:** Used by the Python backend to perform Optical Character Recognition (OCR) on tyre images in order to extract serial numbers.
- **Azure Server URL (`AZURE_SERVER_URL`)**
  - **Purpose:** Used by the frontend to know where the backend API is hosted (e.g. `http://localhost:3000` for local development).
- **Firebase Configuration (`FIREBASE_API_KEY`, `FIREBASE_PROJECT_ID`, etc.)**
  - **Purpose:** Used by the React Native frontend to handle user authentication, real-time database queries, and cloud storage.
- **Google Web Client ID (`GOOGLE_WEB_CLIENT_ID`)**
  - **Purpose:** Used by the frontend to enable Google OAuth Sign-in functionality.
- **OpenWeather API Key (`OPENWEATHER_API_KEY`)**
  - **Purpose:** Used by the frontend to fetch and display weather forecasts and weather-related notifications.

---

## 🔌 PORTS CONFIGURATION

By default, the application runs on the following local ports:

- **Flask Backend (Server)**
  - **Port:** `3000`
  - **Description:** Exposes AI prediction endpoints (`/predict_multiple`, `/extract_serial`).

- **Metro Bundler (Frontend)**
  - **Port:** `8081`
  - **Description:** Serves the React Native bundle to the emulator or physical device.

> **Important:** If port `3000` is in use by another process on your machine, you must update the port in `server/app.py` and the `AZURE_SERVER_URL` in your `.env` file accordingly.

---

## 🚀 STEP-BY-STEP EXECUTION GUIDE

To run the full application locally, you must start both the server and the frontend in separate terminal windows.

### STEP 1: START THE PYTHON BACKEND

Open a terminal and navigate to the `server` directory:

```bash
# 1. Navigate to the server folder
cd server

# 2. (Optional but recommended) Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# 3. Install the required Python packages
pip install -r requirements.txt

# 4. Start the Flask server
python app.py
```
*The server should now be running at `http://0.0.0.0:3000` or `http://localhost:3000`.*

### STEP 2: START THE REACT NATIVE FRONTEND

Open a **new** terminal window and navigate to the `frontend` directory:

```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install the Node modules
npm install
# OR if you prefer yarn: yarn install

# 3. Start the Metro Bundler
npm start
# OR: yarn start
```

### STEP 3: LAUNCH THE MOBILE APP

Leave the Metro Bundler running in its terminal. Open another **new** terminal window, navigate to the `frontend` directory, and run the app on your preferred platform:

**For Android:**
```bash
cd frontend
npm run android
# OR: yarn android
```

**For iOS (Mac only):**
```bash
cd frontend
cd ios && pod install && cd ..
npm run ios
# OR: yarn ios
```

The application should now install and launch on your running emulator, simulator, or connected physical device! 

---

## 🛠️ TROUBLESHOOTING

- **Server binding errors:** If Python throws an `Address already in use` error, another process is using sport `3000`. Kill the process or change the port in `app.py`.
- **React Native build failures:** Ensure your Android/iOS environment variables are correctly set according to the [React Native Environment Setup guide](https://reactnative.dev/docs/environment-setup).
- **Missing Env Variables in Frontend:** If React Native cannot find your `.env` variables, try clearing the Metro bundler cache by starting it with `npm start -- --reset-cache`.
