import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import categoriesReducer from './Categories';
import userReducer from './users';
import ordersReducer from './Orders';



const rootReducer = combineReducers({
    productsReducer,
    loginReducer,
    categoriesReducer,
    userReducer,
    ordersReducer
})


export default rootReducer