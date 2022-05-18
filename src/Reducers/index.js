import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import categoriesReducer from './Categories';
import userReducer from './users';
import pedidosReducer from './Pedidos';
import commentReducer from "./Comment"
import adminReducer from './Admin';

import ordersReducer from './Orders';
import chatReducer from "./Chat"
import favReducer from './Favs';
import ofertasReducer from './Ofertas';
import notifReducer from './Notifications';




const rootReducer = combineReducers({
    productsReducer,
    loginReducer,
    categoriesReducer,
    userReducer,
    ordersReducer,
    pedidosReducer,
    commentReducer,
    chatReducer,
    favReducer,
    adminReducer,
    ofertasReducer,
    notifReducer,
})


export default rootReducer