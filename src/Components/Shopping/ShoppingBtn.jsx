import React from 'react'
import {useSelector} from 'react-redux'
import icon from '../../Assets/cart.svg'
import {Link} from 'react-router-dom'
export default function ShoppingBtn() {
  const item = useSelector((state) =>  state.productsReducer.cart.products);
  
  return (
    <div>
    <Link to='/cart'>
  <sup style={{fontSize:'15px' , border:'0.5px solid lightgray' ,borderRadius:'99%' , backgroundColor:'red' , color:'white' , padding:'0px 4px 0px 4px'}}>{item.length}</sup>
    <img src={icon} alt='carrito' style={{width:'25px'}}/>
    </Link>
  </div>
   
  )
}
