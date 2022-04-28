
import { SEARCH_BY_NAME, GET_CATEGORIES, ORDER_BY_PRICE, ORDER_BY_RATE, FILTER_BY_CATEGORY } from "../Actions/Index";

const initialState = {
    detailProduct : [],
    products: [],
    allProducts:[],
    productoPorNombre:[],
    filtered:[],
    categories:[]

import {UPDATE_CART ,ADD_ITEM ,REST_ITEM ,DELETE_ITEM} from '../Actions/Index'
import { getCartLocalStorage, saveCartLocalStorage , getProductLocalStorage ,saveProductLocalStorage } from "../Helpers/localstorage"
const initialState = {
    detailProduct : [],
    products: [],
    allProducts: getProductLocalStorage(),
    cart: getCartLocalStorage(),
    sameCategory: []

}

export default function productsReducer(state = initialState, action) {
    const { type, payload } = action;
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
                products:payload
                

            }
           
        case ORDER_BY_PRICE:
            let sortedPrice = payload === "asc" ?
                [...state.filtered].sort(function (a, b) {
                    return (a.price - b.price);
                }) :
                [...state.filtered].sort(function (a, b) {
                    return (b.price - a.price)
                })
            return {
                ...state,
                filtered: sortedPrice
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
            return { ...state, cart: getCartLocalStorage() }
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
                saveCartLocalStorage(newCart);
                } else {
                newCart = {
                    products: [...state.cart.products, { id: payload, quantity: 1 }],
                    precioTotal: Math.round((state.cart.precioTotal + state.allProducts.find(e => e.id === payload).price) * 100) / 100
                };
               }
                saveCartLocalStorage(newCart);
           
               return {
                ...state,
                cart: newCart
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
                saveCartLocalStorage(newCart);
            }
            return {
                ...state,
                cart: newCart
            };
            case DELETE_ITEM:
            itemCart = state.cart.products.find(e => e.id === payload);
            itemCart && (newCart = {
                products: state.cart.products.filter(e => e.id !== payload),
                precioTotal:
                    Math.round(( state.cart.precioTotal - (itemCart.quantity * state.allProducts.find(e => e.id === payload).price)) * 100)  / 100
            });
            saveCartLocalStorage(newCart)
            return {
                ...state,
                cart: newCart
            };
            case "GET_PRODUCT_BY_CAT": 
            return {
                ...state,
                sameCategory: payload
            }

            default: 
                return {
                    ...state
                }

    }      
}