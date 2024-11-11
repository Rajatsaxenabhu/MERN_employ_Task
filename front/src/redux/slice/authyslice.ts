import { combineReducers } from 'redux';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer, // Ensures 'auth' is part of the state
});

export default rootReducer;
