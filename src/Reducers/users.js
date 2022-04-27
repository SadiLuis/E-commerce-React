import {getAllUsers} from '../Actions/users'

const initialState = {
users: []
}

export default function userReducer (state = initialState, action){
    const { type, payload } = action;
    switch (type) {
    case 'GET_ALL_USERS':
        return{
            ...state,
            users: action.payload
        }
        default: 
        return{...state}
    
    }
}