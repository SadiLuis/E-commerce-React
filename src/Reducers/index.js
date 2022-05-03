import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import categoriesReducer from './Categories';
import userReducer from './users';
import pedidosReducer from './Pedidos';
import commentReducer from "./Comment"



const rootReducer = combineReducers({
    productsReducer,
    loginReducer,
    categoriesReducer,
    userReducer,
    pedidosReducer,
    commentReducer,

})


export default rootReducer