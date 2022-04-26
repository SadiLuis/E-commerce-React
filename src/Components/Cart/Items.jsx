import React, {useEffect , useState} from 'react'
import { useSelector ,useDispatch } from 'react-redux';
import {
    addItem,
    deleteItem,
    restItem,
    deleteProductCart,
  } from "../../Actions/cart";
  import { Link } from "react-router-dom";
 import{ Product , ProductDetail ,
  ProductName ,ProductId ,ProductSize ,ProductAmountContainer ,ProductAmount ,ProductPrice ,Image ,
  Details ,PriceDetail} from './Styles'
  import { IoRemove, IoAdd } from "react-icons/io5";
  import Swal from "sweetalert2";


function Items({ id, title, price, image, stock, quantity ,size ,category}) {
    const [input, setInput] = useState(parseInt(quantity));
  const cartDB = useSelector((state) => state.productsReducer.carts);
  let priceTotal = price * quantity;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // console.log(e);
    setInput(parseInt(e.target.value));
  };

  const handleButtonMas = () => {
    if (input < stock) {
      setInput((prev) => prev + 1);
      dispatch(addItem(id));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Se supero el limite de stock!",
        footer: "cantidad disponible " + stock,
      });
    }
  };

  const handleButtonMenos = (e) => {
    // e.preventDefault();
    if (input > 1) {
      setInput((prev) => prev - 1);
      dispatch(restItem(id));
    }
  };
  const handleDelete = () => {
    // e.preventDefault();
    dispatch(deleteItem(id));
   
  };

  const fixedPrice = Math.round((priceTotal + Number.EPSILON) * 100) / 100;
  return (
    <Product>
      <ProductDetail>
        <Image src={image} />
         <Details>
          <ProductName style={{paddingBottom:'15px'}}>
             <b >Producto:</b> {title.toUpperCase()}
          </ProductName>
            <ProductId style={{paddingBottom:'15px'}}>
              <b>Categoría:</b> {category}
            </ProductId>
                 
            <ProductSize style={{paddingBottom:'15px'}}>
             <b>Tamaño:</b> {size}
            </ProductSize>
            </Details>
              </ProductDetail>
                 <PriceDetail>
                 <ProductAmountContainer>
                   <ProductAmount>
                    <IoAdd style={{marginRight:'10px' , marginTop:'5px' , cursor:'pointer'}}
                     type='button' onClick={handleButtonMas}/>
                    <input
                      type="number"
                      value={input}
                      min={1}
                     max={stock}
                    // defaultValue={input}
                     onChange={handleChange}
                    disabled
                    />
                     <IoRemove style={{marginLeft:'10px' , marginTop:'5px' , cursor:'pointer'}} 
                     type='button' onClick={handleButtonMenos}/>
                 </ProductAmount>
                </ProductAmountContainer>
                    <ProductPrice>$ {fixedPrice}</ProductPrice>
                </PriceDetail>
                    <div>
                  <button className='btn btn-outline-danger' onClick={handleDelete}>Quitar</button>
                  </div>
        </Product>
  )
}

export default Items