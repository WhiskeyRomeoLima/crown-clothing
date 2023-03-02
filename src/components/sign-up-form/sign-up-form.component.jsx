//import { signInWithEmailLink } from 'firebase/auth';
import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import {UserContext} from '../../contexts/user.context'
import './sign-up-form.styles.scss';
import Button from '../button/button.component';

//section 7, lesson 106 - added useContext to import from react
//and imported the UserContext object from user.context.jsx

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); // sets the formFields to initial state
  const { displayName, email, password, confirmPassword } = formFields; //  object destructuring
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  //*in the sign-in or sign up form we want to set the user
  const {setCurrentUser} = useContext(UserContext) //destructure the setter function from UserContect to run after the sign in below

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match!');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      createUserDocumentFromAuth(user, { displayName });
      setCurrentUser(user)  //*sets the user in userContext
      console.log(user)
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create your account, email is already in use');
      } else {
        console.log(error);
      }
    }
  };

  //We need this to be generic so that we use this function in all the inputs in the FORMiNPUT components below
  //Thus the name attribute in the input element must match the corresponding name in defaultFormFields
  const handleChange = (event) => {
    //the name is passed up in the event object
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value }); //setFormFields was defined above with the useState function
  };

  return (
    <div className="sign-up-containers">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}; //end signUpForm component

export default SignUpForm; //imported by sign-in.component
