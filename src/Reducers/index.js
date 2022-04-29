import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import categoriesReducer from './Categories';
import userReducer from './users';



const rootReducer = combineReducers({
    productsReducer,
    loginReducer,
    categoriesReducer,
    userReducer

})


export default rootReducer