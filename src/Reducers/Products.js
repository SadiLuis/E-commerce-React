const initialState = {
    detailProduct : []
}

export default function productsReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {

            case "GET_PRODUCT_BY_ID": 
            return {
                ...state,
                detailProduct: payload
                
            }
            default: 
                return {...state}

    }      
}