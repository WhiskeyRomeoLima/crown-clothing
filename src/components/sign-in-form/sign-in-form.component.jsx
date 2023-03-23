import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  signInWithGooglePopup,
  //createUserDocumentFromAuth, moved to user.context
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields; //destructure off of formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  
  const signInWithGoogle = async () => { //button event handler
     await signInWithGooglePopup();
     //user = await signInWithGooglePopup() -- removed the assignment - user is handled in context.org
    //console.log('From sign-in-form: ', user)
    //in signInWithGooglePopup, displayName is populated with a value, where as with signinWithEmailPassword it is not
    //await createUserDocumentFromAuth(user); moved to user.context
  };

  //*in the sign-in or sign up form we want to set the user  !!! no longer need as this functionality move user.context
  /* old code - the folowing imports were removed as we centralized this functionality in firebase.utils (see onAuthStateChangedListener) 
  useContext imported from react, UserContext component imported from '../../contexts/user.context';
  we are calling useContext with UserContext as the argument and getting the setter function for
  setting the current user
    {
      setCurrentUser: () => null,
      currentUser: null,    
    }
    below we are pulling off the setCurrentUser setter function
    which is ran in the handleSubmit function directly below
  */
 // const {setCurrentUser} = useContext(UserContext) //destructure the setter function from UserContext to run after the sign in below

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      //setCurrentUser(user)  moved to user.context
      resetFormFields();
      
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

