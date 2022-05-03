import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import categoriesReducer from './Categories';
import userReducer from './users';

import pedidosReducer from './Pedidos';

import ordersReducer from './Orders';





const rootReducer = combineReducers({
    productsReducer,
   loginReducer,
    categoriesReducer,
    userReducer,

    pedidosReducer


    ordersReducer,
   
    

})


export default rootReducer