import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import categoriesReducer from './Categories';
import userReducer from './users';
import pedidosReducer from './Pedidos';
import commentReducer from "./Comment"


import ordersReducer from './Orders';
import chatReducer from "./Chat"





const rootReducer = combineReducers({
    productsReducer,
   loginReducer,
    categoriesReducer,
    userReducer,
    ordersReducer,
    pedidosReducer,
    commentReducer,
    chatReducer,

})


export default rootReducer