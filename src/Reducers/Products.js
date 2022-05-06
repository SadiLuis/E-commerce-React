
import { SEARCH_BY_NAME, GET_CATEGORIES, ORDER_BY_PRICE, ORDER_BY_RATE, FILTER_BY_CATEGORY
,UPDATE_CART ,ADD_ITEM ,REST_ITEM ,DELETE_ITEM, ORDER_ALFABETICAMENTE ,GET_CART ,DELETE_CART_DB ,DELETE_CART} from "../Actions/Index";
import { getCartLocalStorage, saveCartLocalStorage , getProductLocalStorage ,saveProductLocalStorage , getCartDb ,setCartDb, saveCartDb } from "../Helpers/localstorage";
import {deleteProductCart,addItemCart} from '../Actions/cart'
const initialState = {
    detailProduct : [],
    products: [],
    allProducts:getProductLocalStorage(),
    productoPorNombre:[],
    filtered:[],
    categories:[],
    cart: localStorage.token_ecommerce ? getCartLocalStorage() : getCartDb(),
    sameCategory: [],
    idCart: null
}

export default function productsReducer(state = initialState, action) {
    const { type, payload, idCart} = action;
    let newCart = state.cart, newProducts, itemCart;
    switch (type) {

            case "GET_PRODUCT_BY_ID": 
            return {
                ...state,
                detailProduct: payload
                
            }
            case "GET_ALL_PRODUCTS":
                saveProductLocalStorage(payload)
                return{
                    ...state,
                    products: payload,
                    allProducts: payload
                }
            case 'CLEAN_UP': 
            return {
                ...state,
                products:[]
            }


            case SEARCH_BY_NAME:
            return {
                ...state,
                products:payload,
                filtered:payload
                

            }
           
        case ORDER_BY_PRICE:
            let sortedPrice = payload === "asc" ?
                [...state.products].sort(function (a, b) {
                    return (a.price - b.price);
                }) :
                [...state.products].sort(function (a, b) {
                    return (b.price - a.price)
                })
            return {
                ...state,
                products: sortedPrice
            }
            case ORDER_ALFABETICAMENTE:
                let sortedName= action.payload==="A-Z" ?
                [...state.products].sort(function(a,b){
                    if(a.title.toLowerCase() > b.title.toLowerCase()){
                        return 1;
                    }
                    if(b.title.toLowerCase()>a.title.toLowerCase()){
                        return -1;
                    }
                    return 0;
                }) : [...state.products].sort(function(a,b){
                    if(a.title.toLowerCase() > b.title.toLowerCase()){
                        return -1;
                    } if(b.title.toLowerCase() > a.title.toLowerCase()){
                        return 1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    products:sortedName
                }



        case ORDER_BY_RATE:
            let sortedRate = payload === "asc" ?
                [...state.filtered].sort(function (a, b) {
                    return (a.rate - b.rate);
                }) :
                [...state.filtered].sort(function (a, b) {
                    return (b.rate - a.rate)
                })
            return {
                ...state,
                filtered: sortedRate
            }
            case GET_CATEGORIES:
            return {
                ...state,
                categories:payload
            }
            case FILTER_BY_CATEGORY:
            let categoriesProducts = payload === "all" ? state.allProducts : state.allProducts.filter((elem) => elem.category.includes(payload))
            return {
                ...state,
                products: categoriesProducts
            }


            case UPDATE_CART:
                if(localStorage.token_ecommerce){
                    const localS = getCartDb()
                    console.log()
                  state.idCart && localS.products?.forEach((el) =>  addItemCart(el, state.idCart))
                 
                  return {
                      ...state,
                      cart: getCartDb()
                  }
                }
                else{
                    
               return { 
                ...state,
                 cart: getCartLocalStorage(),
                  
                }
             }
            case ADD_ITEM:

            itemCart = state.cart.products.find(e => e.id === payload);
            if (itemCart) {
                newProducts = state.cart.products.map(item => 
                    item.id === payload
                    ?{...item, quantity: item.quantity + 1 }
                    : item )
                
                
                newCart = {
                    products: newProducts,
                    precioTotal: newProducts.reduce((prev, e) => {
                        let prod = state.allProducts.find(el => el.id === e.id);

                        return Math.round((prev + (prod.price * e.quantity)) * 100) / 100;
                    }, 0)

                };
               
                } else {
                newCart = {
                    products: [...state.cart.products, { id: payload, quantity: 1 }],
                    precioTotal: Math.round((state.cart.precioTotal + state.allProducts.find(e => e.id === payload).price) * 100) / 100
                };
               }

               if(localStorage.token_ecommerce) saveCartDb(newCart)
               else saveCartLocalStorage(newCart);
                
               return {
                ...state,
                cart: newCart,
                
               };
             case REST_ITEM:
            itemCart = state.cart.products.find(e => e.id === payload);
            if (itemCart) {
                newProducts = state.cart.products.map(item => 
                    item.id === payload
                    ?{...item, quantity: item.quantity - 1 }
                    : item )

                newCart = {
                    ...newCart,
                    products: newProducts,
                    precioTotal: Math.round((state.cart.precioTotal - state.allProducts.find(e => e.id === payload).price) * 100) / 100
                };
                if(localStorage.token_ecommerce) saveCartDb(newCart)
               else saveCartLocalStorage(newCart);
            }
            return {
                ...state,
                cart: newCart,
                
            };
            case DELETE_ITEM:
            itemCart = state.cart.products.find(e => e.id === payload);
            itemCart && (newCart = {
                products: state.cart.products.filter(e => e.id !== payload),
                precioTotal:
                    Math.round(( state.cart.precioTotal - (itemCart.quantity * state.allProducts.find(e => e.id === payload).price)) * 100)  / 100
            });
            if(localStorage.token_ecommerce){
                deleteProductCart(payload,state.idCart)
                saveCartDb(newCart)
            } 
                
            else saveCartLocalStorage(newCart);

            return {
                ...state,
                cart: newCart,
                
            };
            case "GET_PRODUCT_BY_CAT": 
            return {
                ...state,
                sameCategory: payload
            }
            case GET_CART: return {
                ...state,
                cart: payload,
                idCart: idCart
            }
           
            case DELETE_CART:
             newCart = {
               products: [],
               precioTotal: 0
            }
            saveCartLocalStorage(newCart)
            if(localStorage.token_ecommerce) saveCartDb(newCart)
            return {
                 ...state,
                 cart: newCart,
        
                    }

            default: 
                return {
                    ...state
                }

    }      
}