import { createContext, useState } from 'react'
// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
// using products as an example in the shop-data.json file
//* see how ProductContext is consumed in shop.component code provided below

import PRODUCTS from 'shop-data.json'

export const ProductsContext = createContext ( //imported by index.js, shop.component
  {
    products: [], //default value
    //to do
  }
)

export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState(PRODUCTS)
  const value = {products}

  return(
    <ProductsContext.Provider value={value}> {children} </ProductsContext.Provider>
  )

}


/*
default value:
The defaultValue argument is only used when a component does not have a matching Provider 
above it in the tree. This default value can be helpful for testing components in 
isolation without wrapping them.

*/
//* how consume the ProductsContext from the shop.component

/*      //* original shop.component 
import { SHOP_DATA } from '../../shop-data.json';

const ShopOriginal = () => {
  return (
      {ShopData.map(({id, name}) => (
        <h1>{name}</h1>
      ))}
  );
};

export default ShopOriginal;
*/

//* shop.component modified to use context
import { useContext } from 'react';

import { ProductsContext } from '../../contexts/products.context'; //changed import source

const Shop = () => {
  const { products } = useContext(ProductsContext); //use products via productsContext

  return (
    <div>
      {products.map(({id, name}) => (
        <h1>{name}</h1>
      ))}
    </div>
  );
};

export default Shop;