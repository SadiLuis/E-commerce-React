const initialState = {
    categories: []
}

export default function categoriesReducer(state = initialState, action) {
    const { type, payload } = action;
    
    switch (type) {

            case "GET_ALL_CATEGORIES": 
            return {
                ...state,
                categories: payload
                
            }
            
            default: 
                return {...state}

    }      
}