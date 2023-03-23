import { createContext, useEffect, useReducer } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth, } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

//an action is an object with two properties: type, optionally a payload (the new value)
const userReducer = (state, action) => {
  const { type, payload } = action; //action object consists of a type and optionally a payload
// console.log('state: ', state);
// console.log('action: ', action)
// console.log('type: ', type);
// console.log('payload: ', payload)

  switch (type) { //take action based on type
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { 
        ...state,             //spreadout existing state, then pass in updated value for current user
        currentUser: payload  //resulting in a new object so state is updated safely
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};
/*
The useReducer function takes two arguments a reference to our reducer function (userReducer) and the initial state
The userReducer function returns the current state and a dispatch function that takes an action object that performs the update
This dispatch function calls userReducer and passes the action object.
The userReducer function performs the task specified by the action.type caught by the switch statement

This dispatch is a function that whenever you call it, you pass it an action object.

So if you want this user reducer to receive an action, you have to call dispatch.

The dispatch function will take the action object and pass it to userReducer.
The userReducer will then run through the switch statement and update the state accordingly based on the action.type property

It's very similar to use state.

Whenever set state gets called, state gets updated and the functional component re-runs with reducer.

Whenever dispatch gets called and a new state object is returned, then we also will re-run this functional
component.
*/
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  // console.log('UserProvider-currentUser: ', currentUser)
  // console.log('dispatch function: ', dispatch)

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  }
  
  const value = { currentUser, setCurrentUser };
 /* onAuthChangedListener is an permanently open listner, thus it is alwas on
  The problem is that you must tell it to stop listening when the component unmounts else you would get memory leaks
  onAuthStateChangedListener give you a function that will do this: unsubcribe()
  whenever we return from the callback given to onAuthStateChangedListener it returns the unsubcribe function
  and it will run automatically run it
  And as we know with use effect, with this callback, it will run whatever you return from this callback when it unmounts.
*/
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => { //call back function that is called when auth changes
      if (user) {
        createUserDocumentFromAuth(user); // Also in firebase.util UserSnapchot = await getDoc(userDocRef) assures that a database document get created when a new user signs up
      }
      setCurrentUser(user);
    });

    return unsubscribe; // unsubscribe whenever this component unmounts
  }, []); //* run once only when 

 

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

