import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth, } from '../utils/firebase/firebase.utils';
// when a user signs in (sign-in-form), we get back a response via 
// signInAuthUserWithEmailAndPassword or signInWithGooglePopup() 
// when a user signs up (sign-up-form), we get a response via createAuthUserWithEmailAndPassword
// So in userContext we want to track when the user authorization changes, so we created
// onAuthStateChangedListener in firebase.utils and respond to the listener from here in userContext
// so instead of tracking from multiple form components, we track changes to user auth from one central place in the code.

//*The actual value to be accessed - the storage part
//We create essentially a base state for context as well as a state for the provider
export const UserContext = createContext(
  {
  currentUser: null, // we need to null check in order to see if we have a user.  Recall an empty object evaluates to true, so we explicitly set the default value to be null.
  setCurrentUser: () => null
  }
  );
console.log("UserContext:", UserContext);

//* The actual component that will wrap the the application and provide access to currentUser.  
//For every context there is a .provider component that wraps around child components. As a result, the children have access to whatever data the provider is providing access to.
//This is where the currentUser gets set
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // typical useState use of setting up value and setter function and setting the value to null
  
  const value = { currentUser, setCurrentUser }; // value = an object {currentUser, setCurrentUser} ??
  // value = currentUser: null, setCurrentUser: ƒ}
console.log('Provider currentUser: ', currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>; //allows children to access or set the value of the user in this case.
};

/*

//*createContext(defaultValue) 
Call createContext outside of any components to create a context.

    import { createContext } from 'react';

    const ThemeContext = createContext('light');
//*Parameters 
  defaultValue: The value that you want the context to have when there is no 
  matching context provider in the tree above the component that reads context. 
  If you don’t have any meaningful default value, specify null. 
  The default value is meant as a “last resort” fallback. It is static and never changes over time.

//*Returns 
createContext returns a context object.

The context object itself does not hold any information. 
It represents which context other components read or provide. 
Typically, you will use SomeContext.Provider in components above to 
specify the context value, and call useContext(SomeContext) in components below to read it. 
The context object has a few properties:

  SomeContext.Provider lets you provide the context value to components.
  SomeContext.Consumer is an alternative and rarely used way to read the context value.

//*Props 
  value: The value that you want to pass to all the components reading this context 
  inside this provider, no matter how deep. The context value can be of any type. 
  A component calling useContext(SomeContext) inside of the provider receives 
  the value of the innermost corresponding context provider above it.

//* To use context (using UserContext as defined abouve)
import {useContext} from 'react'

inside a component
  const {setCurrentUser}= useContext(UserContext) //returns the setter function for UserContext component

 then where ever in the code the user value changes

 setCurrentUser(user) //set the context value in the UserContext

*/






/* UserContext allows to store data at a location that accessible from anywhere in the app
   Without the need to pass that data in props (prop drilling)
   
   import createContext gives give you access to a context object and provider component
   which are customized to the application's particular needs

   Every Context object comes with a Provider component that allows consuming components 
   to subscribe to context changes.

  The Provider component accepts a value prop to be passed to consuming components 
  that are descendants of this Provider. One Provider can be connected to many consumers. 
  Providers can be nested to override values deeper within the tree.

  All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. 
  The propagation from Provider to its descendant consumers (including .contextType and useContext) 
  is not subject to the shouldComponentUpdate method, 
  so the consumer is updated even when an ancestor component skips an update.

   The below is from index.js.  Note how the two context providers wrap the app component
   such that app has access to both products context and user context
   and product context has access to user context 
   root.render(
    <React.StrictMode>
      <BrowserRouter>
        <UserProvider>  //* UserContext
          <ProductsProvider> //* ProductsContext
            <App />
          </ProductsProvider>
        </UserProvider>
      </BrowserRouter>
    </React.StrictMode>
);
*/

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


Essentially what's happening is we are going to create this user provider and 
wrap it around the portion of our code that matters.

This provider is essentially allowing any of
its child components to access the values inside of its useState.

So we're just doing just as we normally do, we have a value for useState 
and we have the setter for useState

But we want to be able to call the settee to set the value or 
read the value anywhere inside of the component tree
that is nested within this actual provider value.

So what you can think about with this provider is that this provider is essentially allowing any of
its child components to access the values inside of its use state.

So we're just doing just as we normally do, we have a value for that.
useState and we have the setter for that.
We want to be able to call this setter and get the value anywhere inside of the component
tree that is nested within this actual provider value.

So then all we do is we pass this value into here inside the Provider ( <UserContext.Provider value={value}>{children}</UserContext.Provider>)
and now we go back to UserContext and remember we're trying to instantiate the initial point of the value in Provider.

So I know that this value you can see as if, well, you're like Iowa, didn't we pass an initial null

value into current user?

We did.

But this is for the states.

This is not necessarily for the context.

The context needs an initial value as well.

And we just want to build the base empty state of what this is.

So current user being a actual object, usually the empty state of an object should be null because

you want a null check to define whether or not you have a user existing object or no object.

An empty object is still going to evaluate as true.

So we know that there's no context when the current user value is null.

And then what's the default value of a set or function?

Well, this is actually just a function that does nothing.

So it's an empty function that returns null.

It's the most basic type of blank function you can think of, but this is all we need.
*/

/*
React.createContext
const MyContext = React.createContext(defaultValue);
Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.

The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This default value can be helpful for testing components in isolation without wrapping them. Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.

Context.Provider
<MyContext.Provider value={ some value }>
Every Context object comes with a Provider React component that allows 
consuming components to subscribe to context changes.

The Provider component accepts a value prop to be passed to consuming components 
that are descendants of this Provider. One Provider can be connected to many consumers. 
Providers can be nested to override values deeper within the tree.

All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. 
The propagation from Provider to its descendant consumers (including .contextType and useContext) 
is not subject to the shouldComponentUpdate method, so the consumer is updated 
even when an ancestor component skips an update.

Changes are determined by comparing the new and old values using the same algorithm as Object.is

*/