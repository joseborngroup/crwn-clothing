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

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  console.log(userRef);

  const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get(); // snapshot get the data from Firebase
  console.log(snapShot);
  console.log(snapShot.data());

  const collectionSnapshot = await collectionRef.get();
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data())}); // get all users data

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
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach( obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map( docSnapshot => {
    const { title, items  } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;