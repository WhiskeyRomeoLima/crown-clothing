//See the steps for app setup below this code or go to https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0#web-version-9
//The below import begins the connection process from our app to the configured database in Firebase
//see firebase config below
import { initializeApp } from 'firebase/app';

// extract the type of authorizations (provider) we will use in our app
// see const provider = new GoogleAuthProvider();  below
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

//this was setup in the Firebase console
const firebaseConfig = {
  apiKey: 'AIzaSyC1DhQpFSHXWb8HKgFnMI4Pw6OdbCy3CWg',
  authDomain: 'crown-clothing-db-44096.firebaseapp.com',
  projectId: 'crown-clothing-db-44096',
  storageBucket: 'crown-clothing-db-44096.appspot.com',
  messagingSenderId: '341138930160',
  appId: '1:341138930160:web:8ec357cb1630ca5a7b4535',
};

//use the above to initialize your app
const firebaseApp = initializeApp(firebaseConfig);

//https://firebase.google.com/docs/auth/web/google-signin?authuser=0&hl=en
const provider = new GoogleAuthProvider();  //this is a class

//(from the link above) Optional: Specify additional custom OAuth provider parameters 
//that you want to send with the OAuth request. To add a custom parameter, 
//call setCustomParameters on the initialized provider with an object 
//containing the key as specified by the OAuth provider documentation and the corresponding value.

// Sets the OAuth custom parameters to pass in a Google OAuth request for popup and redirect sign-in operations. 
//Valid parameters include 'hd', 'hl', 'include_granted_scopes', 'login_hint' and 'prompt'. 
//For a detailed list, check the Google documentation. 
//Reserved required OAuth 2.0 parameters such as 'client_id', 'redirect_uri', 'scope', 'response_type' and 'state' are not allowed and will be ignored.
//*forces the user to always select an account - more to come in later lectures
provider.setCustomParameters({
  prompt: 'select_account',
});

//* Go to following url to enable signin methods in the Firebase console.
//https://console.firebase.google.com/project/crown-clothing-db-44096/authentication/providers
export const auth = getAuth(); //only need on auth but may need multiple providers
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 


// go to this url to set up firestore database in your Firebase console
//https://firebase.google.com/docs/database/web/start?hl=en&authuser=0
//create database in production mode, set the geographical location
//after db is generated change edit rules to:  allow read, write: if true;
//see import statement: import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
//create reference to database in Firestore
export const db = getFirestore()

//Cloud Firestore stores data in Documents, which are stored in Collections. 
// Cloud Firestore creates collections and documents implicitly the first time you add data to the document. 
// You do not need to explicitly create collections or documents.
//use the following urls
//choose Cloud Firestore (not Realtime Database): https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0
//choose Structure data, Add and manage data: [ Add data, Delete data ... ], Read Data and other topics
//Note use of doc, getDoc, and setDoc from import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

//* start of createUserDocumentFromAuth
// uses doc, setDoc pattern vs addDoc (see urls above) 
//this function is called from the sign-in, sign-up, sign-in-form components 
//who pass the user object from the response object (UserCredentialImpl) again see below this code
export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={displayName: 'John Doe'}) => {
  const userDocRef = doc(db, 'users', userAuth.uid); // arguments = (database, name of collection, id = userAuth.uid)
  //the above code use the user's id (userAuth.uid) to get a reference to a document in the the db
  //But this document has no value (i.e. user data associated with it)

  const userSnapshot = await getDoc(userDocRef); //return the data associated this document id
  // even though we have a user id which points to document with this Id, we do not have a user

    //if user data does not exist, create user
    //this code will not run if the user exist in which case we just want to return userDocRef
  if (!userSnapshot.exists()) { 
    const {displayName, email} = userAuth
    const createdAt = new Date(); //used in setDoc below

    try {
      await setDoc(userDocRef, { //adds or updates data in the document
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
      
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}; 
//* end of createUserDocumentFrom Auth

//* called from sign-in-form, sign-up-form components
export const createAuthUserWithEmailAndPassword = async (email, password)=>{
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password) //createUserWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >
}
//* called from sign-in-form component
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password); //signInWithEmailAndPassword ( email :  string ,  password :  string ) : Promise < UserCredential >
};

export const signOutUser = async () => await signOut(auth)




//* createUserDocumentFromAuth: this is the response when called from the sign-up-form.component
  //when used by the sign-up-form.component,
  //the line of code above creates the below psuedo users collection pointing at user with an id.  
  //this collection will not be viewable in you firebase console yet. The users collecion was
  //generatated in lesson 94
    // firebase.utils.js:35
    // va {converter: null, _key: Dt, type: 'document', firestore: La} O converter: null
    // ►firestore: La {_authCredentials: J, _appCheckCredentials: tt, type:firsestorm
    // type: "document"
    // ► _key: Dt {path: wt> 
    //* id: "iokwlyXsL2abJtlTFMnNt6HQpB93" 
    // parent: (...)
    //* path: "users/iokwlyXsL2abJtlTFMnNt6HQpB93"
    // _path: (...)
    // ►[[Prototype]]: Object
    //* See Why Google/Firestorm did this below

//*Why Google/Firestorm did this
/*
And right here, you see, we actually got back some object.
This object is actually the object that represents some document reference in the database.
However, what we know is that we don't actually have a value.
But here this ID is that uid we just used and the path well at this points to our collection of users,
but then it also points to this uid but we know that nothing exists here.
There's actually no data we can get from this.

So why did Google create this for us?
The reason why Google did this is because this reference points to some now unique point inside of the
database.
There's nothing there for this ID.
So Google is like, Oh, okay, there's no harm.
I'm not going to overwrite anything with this ID.
So by giving us this reference, Google wants us to use this specific document reference object that
they provided us in order to set data there, because it's already kind of pointing to some place inside
of our database.
You can imagine that there is now this user's collection that Google hasn't made yet, but it knows
that it's pointing here.
And then inside of that user's collection is that specific user ID.
Now they don't exist, but if we wanted to set the data, Google at least knows, oh, I'm going to
set it inside of users for this specific ID.
That's exactly what Google is going to do.
*/

//*What is Firebase?
/*

Firebase is Google’s app development platform. It includes a vast range of products and features 
that allow developers to create apps fast without managing the infrastructure.

What is Firestore?

Firestore is one of the two databases available at Firebase (Firestore Lite is the other).
It’s a new and improved version of the Real-Time Database, 
and its capabilities include real-time updates, offline synchronization, 
scalability, and multi-region deployment.

What are the differences between Firebase and Firestore?

Firebase is a more compressive solution vs. Firestore and 
incorporates multiple services like databases, notifications, analytics, ML, etc. 

Firestore is a NoSQL database that is part of the Firebase app development platform

*/

//*Steps in setting up Firebase in your javascript project
/*
1. go here to get started: https://firebase.google.com/docs/web/setup?authuser=0
  - Create a Firebase project and register your app  
2. Install the SDK and initialize the Firebase
  - Install: npm install firebase
  - Initialize Firebase in your app: import {initializeApp} from 'firebase/app'
  - import { initializeApp } from 'firebase/app';

3. Access Firebase in your app

-import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

 Follow this pattern to import other Firebase services
import { } from 'firebase/<service>';

//* Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //*...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//*Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

Step 4: Step 4: Use a module bundler (webpack/Rollup) for size reduction (SKIPPED)
  Note: You can skip this step if you are using a JavaScript framework CLI tool
   like the Angular CLI, Next.js, Vue CLI, 
   //*or Create React App. 
   Check out our guide on module bundling for more information.
*/