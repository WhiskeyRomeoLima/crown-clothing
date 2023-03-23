import { createContext, useState } from 'react';

//import PRODUCTS from '../shop-data.json'; //*using ProductContext instead

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS); //using imported hardcoded data (PRODUCTS)
  const value = { products }; //we set products above with value of PRODUCTS in the above code. Like setting a default value for state.
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};