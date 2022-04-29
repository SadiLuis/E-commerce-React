import React from 'react'
import {useSelector} from 'react-redux'
import icon from '../../Assets/cart.svg'
export default function ShoppingBtn() {
  const item = useSelector((state) => state.productsReducer.cart.products);
  console.log(item)
  return (
      <div>
        <img src={icon} alt='carrito' style={{width:'35px'}}/>
        {item.length}
      </div>
   
  )
}
