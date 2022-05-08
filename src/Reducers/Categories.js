const initialState = {
    categories: [],
    
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
// import { GET_CATEGORIES, FILTER_BY_CATEGORY } from "../Actions/Index";

// const initialState={
//     categories:[],
//     //filtrado:[]
// }

// export default function categoriesReducer(state=initialState, action){
//     const { type, payload } = action;
//     switch(type){
//         case GET_CATEGORIES:
//             return {
//                 ...state,
//                 categories:payload
//             }
            
//         // case FILTER_BY_CATEGORY:
//         //     let categoriesProducts = payload === "all" ? state.allProducts : state.allProducts.filter((elem) => elem.category.includes(payload))
//         //     return {
//         //         ...state,
//         //         filtrado: categoriesProducts
//         //     }
//             default: 
//             return {
//                 ...state
//             }
//     }
// }
