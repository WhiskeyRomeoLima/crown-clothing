import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './contexts/user.context';
import {ProductsProvider} from './contexts/products.context'
import {CartProvider} from './contexts/cart.context'
import './index.scss';

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <UserProvider> 
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>

);

/*Browser Router enables routing in the application (App).
  We want the following routes:
    Navigation component : Crown logo to '/' & Shop to shop page & Sign In to signin and signup forms
*/
//UserProvider is defined in the context component
//and provides direct access to the user data to all components wrapped in the component tree


