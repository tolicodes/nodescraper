const firebase = require('firebase-admin');
let initialized = false;

export default ({
  firebaseConfig,
  collection,
}) => {
  if (!initialized) {
    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseConfig.serviceAccount),
      databaseURL: firebaseConfig.databaseURL
    })
    initialized = true;
  }

  return firebase.firestore().collection(collection);
}