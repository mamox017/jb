var app_firebase = {};

(function(){
  // Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAD-b2jwQiFzcxX0Rayiw_rfBwGAPfJcpU",
    authDomain: "mootii-14ce1.firebaseapp.com",
    databaseURL: "https://mootii-14ce1.firebaseio.com",
    projectId: "mootii-14ce1",
    storageBucket: "mootii-14ce1.appspot.com",
    messagingSenderId: "657860768501",
    appId: "1:657860768501:web:3d4bb73ece4991adfa0bbc",
    measurementId: "G-X9NXSVYJFF"
  };
  // Initialize Firebase
  try {
    firebase.initializeApp(firebaseConfig)
  } catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }
  //firebase.initializeApp(firebaseConfig);
  //const db = firebase.firestore();

  app_firebase = firebase;
})()

