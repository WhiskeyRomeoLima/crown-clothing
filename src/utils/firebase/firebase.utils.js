//See the steps for app setup at https://firebase.google.com/docs/auth/web/start?hl=en&authuser=0#web-version-9
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

import { 
  getFirestore, 
  doc, 
  getDoc,
  getDocs, 
  setDoc, 
  collection, 
  writeBatch,
  query
} from 'firebase/firestore'
//* use doc to get a document instance.  use getDoc and setDoc to get/set the data within a doc


//use the above to initialize your app
//* Go to following url to enable signin methods in the Firebase console.
//https://console.firebase.google.com/project/crown-clothing-db-44096/authentication/providers
const firebaseConfig = {
  apiKey: 'AIzaSyC1DhQpFSHXWb8HKgFnMI4Pw6OdbCy3CWg',
  authDomain: 'crown-clothing-db-44096.firebaseapp.com',
  projectId: 'crown-clothing-db-44096',
  storageBucket: 'crown-clothing-db-44096.appspot.com',
  messagingSenderId: '341138930160',
  appId: '1:341138930160:web:8ec357cb1630ca5a7b4535',
};

const firebaseApp = initializeApp(firebaseConfig);

//https://firebase.google.com/docs/auth/web/google-signin?authuser=0&hl=en
const provider = new GoogleAuthProvider();  //this is a class

//*forces the user to always select an account - more to come in later lectures
provider.setCustomParameters({
  prompt: 'select_account',
});

//only need one auth but may need multiple providers
export const auth = getAuth(firebaseApp); //tracks whether user is signed in and user persists between page refreshes
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

//create reference to database in Firestore
export const db = getFirestore() //* db points to the actual database in our firebase console

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

//* start of createUserDocumentFromAuth
// uses doc, setDoc pattern vs addDoc (see urls above) 
//the below function is called from the user.context which replaced calls in sign-in, sign-up, sign-in-form components 
export const createUserDocumentFromAuth = async (
  userAuth, 
  //additionalInformation ={displayName: 'John Doe'}) 
  additionalInformation ={}) => {
  if (!userAuth) return
  //else
  const userDocRef = doc(db, 'users', userAuth.uid); // arguments = (database, name of collection, id = userAuth.uid)
  //the above code use the user's id (userAuth.uid) to get a reference to a document in the the db
  //But this document has no value (i.e. user data associated with it)

  const userSnapshot = await getDoc(userDocRef); //return the data associated the document id returned above
  // even though we have a user id which points to document with this Id, we do not have a user
  // Also in user.contex this assures that a database document get created when a new user sign up
    //if user data does not exist, create user
    //this code will not run if the user exist in which case we just want to return userDocRef
  if (!userSnapshot.exists()) { 
    const {displayName, email} = userAuth
    const createdAt = new Date(); //used in setDoc below

    try {
      //setDoc(uid, data object)
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

  return userDocRef; //either a new usedoc or an existing one
}; 

//* these exports wil be called from sign-in-form, sign-up-form components
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

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
// the above is imported by user.context to centralize where user is updated
// rather in the individual signin and signup forms

//* creating a database in the Firebase console

/*

go to this url to set up firestore database in your Firebase console
https://firebase.google.com/docs/database/web/start?hl=en&authuser=0
create database in production mode, set the geographical location
after db is generated change edit rules to:  allow read, write: if true;
see import statement: import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

go to this url to set up firestore database in your Firebase console
https://firebase.google.com/docs/database/web/start?hl=en&authuser=0
create database in production mode, set the geographical location
after db is generated change edit rules to:  allow read, write: if true;
see import statement: import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
*/


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

/*
Firebase vs. Firestore Comparison
                  Firebase	                            Cloud Firestore
Summary	          App development platform	            NoSQL Scalable Database
Core Features	    Databases, Cloud Functions, 
                  Storage, Analytics, A/B Testing, 
                  Authentication, etc.	                Scalable hosting, multi region deployment, data synchronization.
Databases	        Firestore and the Real Time Database 	Firestore
Database Type	    NoSQL	                                NoSQL
Plans	            Spark and Blaze	                      Spark and Blaze
Free Tier	        Yes	                                  Yes
Pricing Model	    Pay as you go	                        Pay as you go
Pricing	          Depends on the service	              Function of network out, database size, writes, reads, and deletes.

Comparing the Firebase Realtime Database and Firestore here are some differences:
  Firestore provides better querying and more structured data
  Firestore is designed to scale
  Firestore provides multi region deployment


*/