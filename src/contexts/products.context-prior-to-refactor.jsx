import { createContext, useState, useEffect } from 'react';

//import { addCollectionAndDocuments} from '../utils/firebase/firebase.utils';//* Only needed in the commented out useEffect below
//import SHOP_DATA from '../shop-data.js'; 

import { getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  console.log('calling useEffect');
  //* below is how we initialized our database - DO NOT Uncomment - it is meant to run only once and never again
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap);
    }

    getCategoriesMap() //run the defined function above
  }, []);

  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};