const initialState = {
    admin : {}
}


export default function adminReducer(state=initialState,action){
    const {type, payload} = action;

    switch (type) {
        case 'ADD_ADMIN':
            return {
                ...state,
                admin: payload
            }
    
        default:
            return {...state}
    }
}