import {useEffect} from 'react'
import Items from './Items'
import {useSelector,useDispatch} from "react-redux";
import {updateCart} from '../../Actions/cart'
import {Wrapper, Top ,TopButton ,TopText ,TopTexts ,Button ,Info 
   ,SummaryItem ,Summary ,SummaryItemText ,SummaryButton ,SummaryTitle} from './Styles'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  let items = useSelector((state) => {
    let completeProducts = state.productsReducer.cart.products;
    completeProducts = completeProducts.map((e) => {
      const finded = state.productsReducer.allProducts.find(
        (el) => el.id === e.id
      );
      return finded ? { ...finded, quantity: e.quantity } : null;
    });

    return completeProducts;
  });
  const total = useSelector((state) => state.productsReducer.cart.precioTotal);
  items = items?.filter((e) => e);
  const navigate = useNavigate()
 const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateCart());
   
  }, [dispatch]);

  return (
<>
    
    <Wrapper>
       
        <Top>
        <TopButton type='filled' className='btn btn-outline-dark' onClick={()=> navigate('/home')} >CONTINUAR COMPRANDO</TopButton>
        <TopTexts>
<TopText>Carrito de compras</TopText>


        </TopTexts>
        <TopButton className='btn btn-outline-secondary'>COMPRAR AHORA</TopButton>

        </Top>
        <Button>
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
                <SummaryItemText>$ {total}</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                <SummaryItemText>Costo de envío</SummaryItemText>
                <SummaryItemText>$5.90</SummaryItemText>
                </SummaryItem>
                <SummaryItem>
                <SummaryItemText> Descuento de envío</SummaryItemText>
                <SummaryItemText>$ -5.90</SummaryItemText>
                </SummaryItem>
                <SummaryItem  type='total'>
                <SummaryItemText> Total</SummaryItemText>
                <SummaryItemText>$ {total}</SummaryItemText>
                </SummaryItem>
<SummaryButton  className='btn btn-dark'>COMPRAR AHORA</SummaryButton>
            </Summary>

        </Button>
    </Wrapper>
   
</>  )
}

export default Cart
 