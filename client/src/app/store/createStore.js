import { combineReducers, configureStore } from '@reduxjs/toolkit';
import messageReducer from './messageSlice';
import authReducer from './authSlice';
import accountsReducer from './accounSlice';
import categoriesReducer from './categorySlice';
import operationsReducer from './operationSlice';
import modalReducer from './modalSlice';

const rootReducer = combineReducers({
   auth: authReducer,
   message: messageReducer,
   accounts: accountsReducer,
   categories: categoriesReducer,
   operations: operationsReducer,
   modal: modalReducer
});

export function createStore() {
   return configureStore({
      reducer: rootReducer
   });
}
