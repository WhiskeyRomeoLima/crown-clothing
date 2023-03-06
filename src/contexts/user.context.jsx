import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth, } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};



/*

Re UserContext:  Inside the navigation component we want to show a sign-out link
so that the user can sign out of their account.  But the component needs to know whether
the user is currently signed in or not. 

The way to know that is to check for an appropriate userauth object whenever
the user signs in or signs up.

For that to happen, the user object has to be stored in and reachable from a useContext object.

It seems complicated, but really all it is - is that context is just a glorified component that
is really just leveraging useState.

//* And all we're doing is exposing the value as well as the setter of this useState value externally.

Whatever values that you want a component to be able to expose, you can also expose through our context,
which we will see later throughout the course.

*/
// Essentially what's happening is we are going to create this user provider and 
//wrap it around the portion of our code that matters.

// This provider is essentially allowing any of
// its child components to access the values inside of its useState.

// So we're just doing just as we normally do, we have a value for useState 
// and we have the setter for useState

// But we want to be able to call the settee to set the value or 
//read the value anywhere inside of the component tree
//that is nested within this actual provider value.