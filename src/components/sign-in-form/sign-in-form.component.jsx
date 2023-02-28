import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log('From sign-in-form: ', user)
    //in signInWithGooglePopup, displayName is populated with a value, where as with signinWithEmailPassword it is not
    await createUserDocumentFromAuth(user);
    
  };

  //*in the sign-in or sign up form we want to set the user
  const {setCurrentUser} = useContext(UserContext) //destructure the setter function from UserContect to run after the sign in below

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user)  //* fun setCurrentUser here. Sets the user in userContext

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
    <div className='sign-up-container'>
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

/*
Look inside your database at Firebase.com and you'll notice that even though we've authenticated our user, we actually don't have

any users inside of our fire store.

So what we're going to do now is we are going to make sure that whenever a user authenticates, we also

create a record of them inside of fire store.

So now we're going to start actually storing that user's information inside of our database.

So we're going to start working with fire store database.

Let's talk about the document model first.

The document model is really the smallest units inside of Firestorm.

So here, imagine we had a shoe because we are crown clothing, meaning that we sell clothing.

So imagine that we had some unique ID for this specific shoe document.

And it's Nike Air Max.

It's just a unique string.

This Nike air Max inside will have data that tells you what the information regarding this shoe will

be.

So the name will be Air Max as a string.

The brand is Nike and then the image URL.

Imagine that points to some URL of the actual image.

This is a data shape.

This is a JSON object that kind of holds the information that is relevant to shoes.

Now, if you look inside of this model, maybe sometimes so far some of these fields may be nested,

so cost might actually be another JSON object.

So far, what we saw with name, brand and image URL, it's a single level, meaning that it just points

to one value in this case being strings, whereas cost.

Here is perhaps a JSON object that has two fields on it, a price which might be a number.

And then the currency that this price is in, so USD, which is a string.

So this is something interesting that you want to know about documents is that they're pretty much JSON

objects, but this is really just the majority of how our individual pieces of data is going to get

stored.

So if you were to look at the model Nike Air Max here, that unique string with no spaces, that would

be the name of this document or the ID of this document.
*/