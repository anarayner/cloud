 import { composeWithDevTools } from 'redux-devtools-extension';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import fileReducer from './fileReducer';
import userReducer from './userReducer';
 import uploadReducer from './uploadReducer';
 import appReducer from './appReducer';

const rootReducer = combineReducers({
   file: fileReducer,
   user: userReducer,
   upload: uploadReducer,
   app: appReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))