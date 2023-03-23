//CartIcon has two functions: display at far-right inside of Navigation component and 
//keep track of whether the cart is opened or not (dropdown)
import {useContext} from 'react'
import {CartContext} from '../../contexts/cart.context'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext)

  //setIsCartOpen is defined in CartContext CartProvider as const [isCartOpen, setIsCartOpen] = useState(false);
  //triggered by the onClick in ShoppingIcon (see onClick below)
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen) // If cart is open  (isCartOpen = true) close it. If cart is closed (isCartOpen = false), open it.

  //remember the <ShoppingIcon /> component was created above using the ReactComponent import
  //CartIcon component shows the cart icon svg and a span containing the number of items in the cart
  return (
    <div className='cart-icon-container'>
      <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen} />
      <span className='item-count'>{cartCount}</span>
    </div>    
  )
}

export default CartIcon //imported by navigation.component so its placement can be determined