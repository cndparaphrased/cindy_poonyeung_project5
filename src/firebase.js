import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBDO6H7X5KHttC7MkVobPCEIcG30fmUlic",
  authDomain: "mind-on-a-shelf.firebaseapp.com",
  databaseURL: "https://mind-on-a-shelf.firebaseio.com",
  projectId: "mind-on-a-shelf",
  storageBucket: "mind-on-a-shelf.appspot.com",
  messagingSenderId: "586256316276"
};
firebase.initializeApp(config);

export default firebase;