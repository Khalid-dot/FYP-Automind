// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AlzaSyAjBFxyG6IQhcJ0l7oai4ivb140mlrx4LI',
  authDomain: 'automind-f061d.firebaseapp.com',
  projectId: 'automind-f061d',
  storageBucket: 'automind-f061d.appspot.com',
  messagingSenderId: '99208573863',
  appId: '1:99208573863:android:985b5f75c3e79c65ba3c82',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
