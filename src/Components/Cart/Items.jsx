import React, {useEffect , useState} from 'react'
import { useSelector ,useDispatch } from 'react-redux';
import {
    addItem,
    deleteItem,
    restItem,
    deleteProductCart,
    restDisabled
  } from "../../Actions/cart";
  import { Link } from "react-router-dom";
 import{ Product , ProductDetail ,
  ProductName ,ProductId ,ProductSize ,ProductAmountContainer ,ProductAmount ,ProductPrice ,Image ,
  Details ,PriceDetail , DeleteBtn , InputCart , ProductTotal , ProductDisabled} from './Styles'
  import { IoRemove, IoAdd } from "react-icons/io5";
  import Swal from "sweetalert2";


function Items({ id, title, price, image, stock, quantity ,size ,category , status}) {
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
  useEffect(() => {
    if(!status || stock === 0) dispatch(restDisabled(id,quantity))
  }, [status ,stock ,dispatch]);
   
   
  const fixedPrice = Math.round((priceTotal + Number.EPSILON) * 100) / 100;
  
  return (
      <>
   { status && (<Product >
      <ProductDetail>
        <Image src={image} />
         <Details>
          <ProductName >
             <b >Producto:</b> 
            <Link to={'/detail/'+ id} style={{textDecoration:'none'}}>
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
                { stock > 0 ? (<ProductAmountContainer>
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
                </ProductAmountContainer>)
                :  (<ProductAmountContainer>
                  <h3>Producto sin stock</h3>
               
                 </ProductAmountContainer>
                 )}
                </PriceDetail>
                    
                    <DeleteBtn>
                  <button className='btn btn-outline-danger' onClick={handleDelete}>Quitar</button>
                  </DeleteBtn>
        </Product>)}
         
        {!status  && (<ProductDisabled >
          <ProductDetail >
            <Image src={image} style={{backgroundImage:'#dee2e6'}}/>
             <Details>
              <ProductName >
                 <b >Producto:</b> 
               
                {' '+ title.toUpperCase()}
                
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
                       <h4>Este producto ya no </h4>
                       <h4>se encuentra disponible</h4>
                    </ProductAmountContainer>
                    </PriceDetail>
                        <DeleteBtn style={{alignSelf:'center'}}>
                      <button className='btn btn-outline-danger'  onClick={handleDelete}>Quitar</button>
                      </DeleteBtn>
            </ProductDisabled>
           )}
            </>
  )
  
}

export default Items