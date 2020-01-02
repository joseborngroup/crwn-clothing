import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBF7kVpM9Vi9yVGwDF1EL4tbhpvXznAuxs",
  authDomain: "crwn-db-db3b5.firebaseapp.com",
  databaseURL: "https://crwn-db-db3b5.firebaseio.com",
  projectId: "crwn-db-db3b5",
  storageBucket: "crwn-db-db3b5.appspot.com",
  messagingSenderId: "683921530878",
  appId: "1:683921530878:web:387b6bd45647fe2a562aaf",
  measurementId: "G-J2ZJJYBGQQ"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    // storing user data in firebase
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;