import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import userReducer from './users';


const rootReducer = combineReducers({
    productsReducer,
    loginReducer,
    userReducer
})


export default rootReducer