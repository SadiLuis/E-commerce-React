import {useEffect} from 'react'
import Items from './Items'
import {useSelector,useDispatch} from "react-redux";
import {updateCart} from '../../Actions/cart'
import {Wrapper, Top ,TopButton ,TopText ,TopTexts ,Button ,Info 
   ,SummaryItem ,Summary ,SummaryItemText ,SummaryButton ,SummaryTitle ,ButtonEmpty , Anuncio} from './Styles'
import { useNavigate } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { postOrder } from '../../Actions/orders';
import Swal from 'sweetalert2'
const Cart = () => {
  let items = useSelector((state) => {
    let completeProducts =  state.productsReducer.cart?.products;
    let productR = state.productsReducer?.allProducts
    //console.log(productR)
    completeProducts = completeProducts.map((e) => {
      let finded = state.productsReducer.allProducts?.find(
        (el) => el.id === e.id
      );
      //console.log(state.productsReducer.allProducts)
      return finded ? { ...finded, quantity: e.quantity } : null;
    });

    return completeProducts;
  });
  //console.log(items)
  const subtotal = useSelector((state) => state.productsReducer.cart.precioTotal);
  items = items?.filter((e) => e);
  const isAuth = useSelector((state) => state.loginReducer.isAuth);
  const navigate = useNavigate()
 const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateCart());
   
  }, [dispatch]);
     
  let total = subtotal >= 7000 ? subtotal  : subtotal + 150

  const handlebtnCompra = () => {
    if (!isAuth) {
      Swal.fire({
        title: "Necesita estar registrado para realizar la compra",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Registrarse",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/register");
        }
      });
    } else {
      if (items.length > 0) {
        let pedido = {
          pedidos: items.map((e) => ({
            productoId: e.id,
            cantidad: e.quantity,
          })),
        };
        dispatch(postOrder(pedido));
        navigate("/pedido");
      } else {
        Swal.fire({
          text: `No hay productos en el carrito`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };
  console.log(items)
  return (
    <>
    
   <Anuncio >
    Aprovechá la oferta !! Comprando por más de $7000 el envío es gratis
   </Anuncio>
    <Wrapper>
       
        <Top>
        <TopButton type='filled' className='btn btn-outline-dark' onClick={()=> navigate('/home')} >CONTINUAR COMPRANDO</TopButton>
        <TopTexts>
<TopText>Carrito de compras</TopText>


        </TopTexts>
        {/*<TopButton className='btn btn-outline-secondary'>COMPRAR AHORA</TopButton> */}
        </Top>
        {items.length ?
        (<Button>
            <Info>
            {items?.map((i) => (
                <Items
                  key={i.id}
                  title={i.title}
                  image={i.images[0]}
                  price={i.price}
                  id={i.id}
                  stock={i.cantidad}
                  quantity={i.quantity}
                  category={i.category}
                  size={i.size}
                />
              ))}
                
            </Info>
            <Summary>
                <SummaryTitle>RESUMEN DEL PEDIDO</SummaryTitle>
                <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemText>$ {subtotal}</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                <SummaryItemText>Costo de envío</SummaryItemText>
                <SummaryItemText>$ 150</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                <SummaryItemText> Descuento de envío</SummaryItemText>
                <SummaryItemText>$ {subtotal >= 7000 ? -150 :  0 } </SummaryItemText>
                </SummaryItem>
                <SummaryItem  type='total'>
                <SummaryItemText> Total</SummaryItemText>
                <SummaryItemText>$ { total }</SummaryItemText>
                </SummaryItem>
                <SummaryButton  className='btn btn-dark' onClick={handlebtnCompra}>COMPRAR AHORA</SummaryButton>
               {/* <BotonPago price={total} />*/}
                
            </Summary>

        </Button>) 
          : (
            <Button style={{display:'flex' , alignContent:'center', flexDirection:'column' ,justifyContent:'center' , marginTop:'80px'}}>
             
              <TopText style={{fontSize:'30px' ,margin:'auto'}}>
                Aún no ha guardado productos en el carrito
              </TopText>
              <br />
              <ButtonEmpty
                className="btn btn-secondary pb-4 pe-3 ps-3 rounded-15"
                onClick={() => navigate("/home")}
                
              >
                <div >
                  <FaCartPlus />
                  <br />
                  <h3>Añadir un nuevo producto</h3>
                </div>
              </ButtonEmpty>
              
            </Button>
            
          )}
        </Wrapper>)
        
     </> )
    }

export default Cart
 