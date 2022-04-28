 import { composeWithDevTools } from 'redux-devtools-extension';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import fileReducer from './fileReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
   file: fileReducer,
   user: userReducer

})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))