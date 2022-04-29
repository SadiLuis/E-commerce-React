import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';


const rootReducer = combineReducers({
    productsReducer,
    loginReducer,
})


export default rootReducer