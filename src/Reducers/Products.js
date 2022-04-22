const initialState = {
    detailProduct : [],
    products: []
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
            default: 
                return {...state}

    }      
}