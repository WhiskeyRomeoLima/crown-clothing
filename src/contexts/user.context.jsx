import { createContext, useState } from "react";


/*

Re UserContext:  Inside the navigation component we want to show a sign out link
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
//Context is the literal storage area (where the actual value you want to access is), 
//in this case, the user object will be stored
//The arguments below provide the initial value of the UserContext
//*UserProvider allows the reading and setting of the value of currentUser
//*UserContext stores the current value (initially set to null below)
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null, //current user is an object and an empty object will evaluate to true.  
                    //So we need to set it to null so we can check for an existing user.
});

//This is the component that wraps other components that need access to UserContext
//It allow wrapped components (children) to read and set the currentUser 
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // for setting the initial value of currentUser in useState
  const value = { currentUser, setCurrentUser };

  //So what you can think about with this provider is that it is essentially allowing any of
  //its child components (children) to access the values inside of its use state.
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Essentially what's happening is we are going to create this user provider and 
//wrap it around the portion of our code that matters.

// This provider is essentially allowing any of
// its child components to access the values inside of its useState.

// So we're just doing just as we normally do, we have a value for useState 
// and we have the setter for useState

// But we want to be able to call the settee to set the value or 
//read the value anywhere inside of the component tree
//that is nested within this actual provider value.