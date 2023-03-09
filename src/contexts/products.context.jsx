import {createContext, useState} from 'react'
import PRODUCTS from '../shop-data.json'

//cxreats a context object
export const ProductsContext = createContext({
  products: []

})

//returns a ProductsContext.Provider component
export const ProductsProvider = ({children}) => {
  const [products, setProducts] = useState(PRODUCTS) // default: PRODUCTS
  const value = {products} //productS = PRODUCTS (so value is destructured from products)
  return (
    <ProductsContext.Provider value = {value} >{children}</ProductsContext.Provider>
  )
}