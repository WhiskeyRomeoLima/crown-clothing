//* 2nd version - After creating product context
import {useContext} from 'react'
import {ProductsContext} from '../../contexts/products.context'

//now we use products exported by ProductContext
const Shop = () => {
  const {products} = useContext(ProductsContext)
  return (
    <div>
      {products.map (({id, name}) => (
        <div key = {id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  )
}

export default Shop //imported by App.js

//* 1st version mock up the shop page to see that we are able to display products
/*
import SHOP_DATA from '../../shop-data.json'


const Shop = () => {
  return (
    <div>
      {SHOP_DATA.map (({id, name}) => (
        <div key = {id}>
          <h1>{name}</h1>
        </div>
      ))}
    </div>
  )
}

export default Shop //imported by App.js
*/