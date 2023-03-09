import { Outlet, Link} from 'react-router-dom'
import { Fragment, useContext } from 'react';
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
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
  const {currentUser} = useContext(UserContext) //* We want to read the curreent user to be able to display the sign in or sign up link
  const {isCartOpen} = useContext(CartContext)

  //above: destructuring currentUser off the UserContext object
  //see detailed explanation below code
  //* note the use of the Outlet component to ensure categories, shop, and sign in forms renders under the Navigation bar
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
            currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>)
                        : (<Link className='nav-link' to='auth'>SIGN IN</Link>)          
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />} 
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