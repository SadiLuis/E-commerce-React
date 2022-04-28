import { SEARCH_BY_NAME, GET_CATEGORIES, ORDER_BY_PRICE, ORDER_BY_RATE, FILTER_BY_CATEGORY } from "../Actions/Index";

const initialState = {
    detailProduct : [],
    products: [],
    allProducts:[],
    productoPorNombre:[],
    filtered:[],
    categories:[]
}

export default function productsReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {

            case "GET_PRODUCT_BY_ID": 
            return {
                ...state,
                detailProduct: payload
                
            }
            case "GET_ALL_PRODUCTS":
                return{
                    ...state,
                    products: payload
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

            default: 
                return {
                    ...state
                }

    }      
}