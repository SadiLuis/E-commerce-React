import { combineReducers } from 'redux';
import productsReducer from './Products';
import loginReducer from './LoginRegister';
import categoriesReducer from './Categories';


const rootReducer = combineReducers({
    productsReducer,
    loginReducer,
    // categoriesReducer
})


export default rootReducer