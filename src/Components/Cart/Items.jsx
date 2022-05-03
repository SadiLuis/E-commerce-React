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
  Details ,PriceDetail , DeleteBtn , InputCart , ProductTotal} from './Styles'
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
          <ProductName >
             <b >Producto:</b> 
            <Link to={'/detail/'+ id}>
            {' '+ title.toUpperCase()}
             </Link>
          </ProductName>
            <ProductId >
              <b>Precio:</b> $ {price}
            </ProductId>
                 
            <ProductSize >
             <b>Tamaño:</b> {size}
            </ProductSize>
            <ProductSize >
             <b>Categoría:</b> {category}
            </ProductSize>
            </Details>
              </ProductDetail>
                 <PriceDetail>
                 <ProductAmountContainer>
                    <b style={{position:'absolute',  top:'-10px' , left:'25px'}}>Unidades</b> 
                   <ProductAmount>
                     
                     <IoRemove style={{marginRight:'15px' , marginTop:'5px' , cursor:'pointer'}} 
                     type='button' onClick={handleButtonMenos}/>
                    <InputCart
                      type="number"
                      value={input}
                      min={1}
                     max={stock}
                    // defaultValue={input}
                     onChange={handleChange}
                    disabled
                    />
                    <IoAdd style={{marginLeft:'10px' , marginTop:'5px' , cursor:'pointer'}}
                     type='button' onClick={handleButtonMas}/>
                 </ProductAmount>
                      <ProductTotal ><b>Subtotal</b></ProductTotal>
                     <ProductPrice>$ {fixedPrice}</ProductPrice>
                </ProductAmountContainer>
                </PriceDetail>
                    <DeleteBtn>
                  <button className='btn btn-outline-danger' onClick={handleDelete}>Quitar</button>
                  </DeleteBtn>
        </Product>
  )
}

export default Items