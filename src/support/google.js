import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyBcR9H4mkhq3NCpDK-qlpZk7DJ_53jpoFo",
    authDomain: "login-with-ggle.firebaseapp.com",
    databaseURL: "https://login-with-ggle.firebaseio.com",
    projectId: "login-with-ggle",
    storageBucket: "",
    messagingSenderId: "413811540321"
  };
  firebase.initializeApp(config)

  export const ref = firebase.database().ref();
  export const auth = firebase.auth;
  export const provider = new firebase.auth.GoogleAuthProvider();