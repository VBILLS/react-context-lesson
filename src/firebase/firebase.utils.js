import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA1Q9DsA40HNLbeZMf455-tpvnDUbfRJ9A",
  authDomain: "ztm-crwn.firebaseapp.com",
  databaseURL: "https://ztm-crwn.firebaseio.com",
  projectId: "ztm-crwn",
  storageBucket: "ztm-crwn.appspot.com",
  messagingSenderId: "999861697986",
  appId: "1:999861697986:web:b1e9e2f67a1c5841faea5b",
  measurementId: "G-2CSSWE4N85"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
