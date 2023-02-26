import { Outlet, Link} from 'react-router-dom'
import { Fragment, useContext } from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context';
import {signOutUser} from '../../utils/firebase/firebase.utils'
import './navigation.styles.scss'

/*
Re UserContext:  Inside the navigation component we want to show a sign out link
so that the user can sign out of their account.  But the component needs to know whether
the user is currently signed in or not. 

The way to know that is to check for an appropriate userauth object whenever
the user signs in or signs up.

For that to happen, the user object has to be stored in and reachable from a useContext object.
*/
const Navigation = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext) //* We want to read the curreent user to be able to display the sign in or sign up link
  //That is the currentUser not the setCurrentUser function we used in signIn and signUp forms
  //see detailed explanation below code

  const signOutHandler = async () => {
    const response = await signOutUser()
    setCurrentUser(null)
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div>
            <CrownLogo className="logo" />
          </div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
            ) : (
              <Link className='nav-link' to='auth'>SIGN IN</Link>
            )           
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation

/*
reminder of UserContext looks like
const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null, //current user is an object and an empty object will evaluate to true.  
});

Whenever this user value comes back, then what we want to do is 
I want to access it inside of the navigation component.

So in the navigation component, I'm going to do the same thing as I did in the sign-in-form component.

I'm going to import in the use context from React and then 
I'm going to import in the user context value from the context, user context.

But this time what I want from the user context is the 
//*current user value, not the setter.

So I'm going to call use context on the user context, the same way that we saw when we were pulling
the set function inside of our sign in form.

But this time I want the actual value of current user.

*/