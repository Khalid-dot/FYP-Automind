import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../App'; // Import Firestore instance from App.js

const PopUps = () => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetch data from the 'PopUps' collection
        const querySnapshot = await getDocs(collection(db, 'PopUps'));
        const notifications = querySnapshot.docs.map(doc => doc.data()); // Map docs to an array

        if (notifications.length > 0) {
          // Pick a random notification
          const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
          

          // Set the random notification to state
          setNotification(randomNotification);
          setIsVisible(true); // Show the notification
          
          // Set a timer to hide the notification after 3 seconds
          setTimeout(() => {
            setIsVisible(false); // Hide the notification after 3 seconds
          }, 3000); // 3000ms = 3 seconds
        } 
      } catch (error) {
      }
    };

    fetchNotifications(); // Initial fetch on component mount

    // Set an interval to fetch new notifications every 30 seconds
    const timer = setInterval(fetchNotifications, 30000); // 30000ms = 30 seconds

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []); // Empty dependency array to run only once on mount

  if (!isVisible || !notification) {
    return null; // If the notification is not visible, return null (don't render it)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{notification.Title}</Text>
      <Text style={styles.message}>{notification.Message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default PopUps;
