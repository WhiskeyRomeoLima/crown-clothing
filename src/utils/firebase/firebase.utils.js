import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyC1DhQpFSHXWb8HKgFnMI4Pw6OdbCy3CWg',
  authDomain: 'crown-clothing-db-44096.firebaseapp.com',
  projectId: 'crown-clothing-db-44096',
  storageBucket: 'crown-clothing-db-44096.appspot.com',
  messagingSenderId: '341138930160',
  appId: '1:341138930160:web:8ec357cb1630ca5a7b4535',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 
// re: signInWithGooglePopup: enclosing with {} will produce await' has no effect on the type of this expression. ts(80007)
//sign-component.jsx.  If you do want brackets, you explicitly include a return statement. 

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

    //if user data does not exist, create user
    //this code will not run if the user exist
    //in which case we just want to return userDocRef
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};