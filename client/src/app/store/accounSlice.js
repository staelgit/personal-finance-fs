import { createAction, createSlice } from '@reduxjs/toolkit';
import accountService from '../services/account.service';

const accountsSlice = createSlice({
   name: 'accounts',
   initialState: {
      entities: null,
      isLoading: false,
      error: null
   },
   reducers: {
      requested: (state) => {
         state.isLoading = true;
      },
      received: (state, action) => {
         state.entities = action.payload;
         state.isLoading = false;
      },
      requestFiled: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      },
      accountCreated: (state, action) => {
         state.entities.push(action.payload);
      },
      accountRemoved: (state, action) => {
         state.entities = state.entities.filter(
            (c) => c._id !== action.payload
         );
      },
      accountUpdateSuccessful: (state, action) => {
         state.entities[
            state.entities.findIndex((u) => u._id === action.payload._id)
         ] = action.payload;
      }
   }
});

const { reducer: accountsReducer, actions } = accountsSlice;
const {
   requested,
   received,
   requestFiled,
   accountCreated,
   accountRemoved,
   accountUpdateSuccessful
} = actions;

const addAccountRequested = createAction('accounts/addAccountRequested');
const removeAccountRequested = createAction('accounts/removeAccountRequested');
const updateAccountRequested = createAction('accounts/updateAccountRequested');

export const loadAccountsList = () => async (dispatch) => {
   dispatch(requested());
   try {
      const { content } = await accountService.get();
      dispatch(received(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
   // }
};

export const createAccount = (payload, userId) => async (dispatch) => {
   dispatch(addAccountRequested());
   try {
      const { content } = await accountService.create(payload, userId);
      dispatch(accountCreated(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};
export const removeAccount = (accountId) => async (dispatch) => {
   dispatch(removeAccountRequested());
   try {
      const { content } = await accountService.remove(accountId);
      if (!content) {
         dispatch(accountRemoved(accountId));
      }
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};

export const updateAccount = (payload) => async (dispatch) => {
   dispatch(updateAccountRequested());
   try {
      const { content } = await accountService.update(payload);
      dispatch(accountUpdateSuccessful(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};

export const getAccounts = () => (state) => state.accounts.entities;
export const getAccountsLoadingStatus = () => (state) =>
   state.accounts.isLoading;
export const getAccountById = (accountId) => (state) => {
   return state.accounts.entities.find((a) => a._id === accountId);
};

export default accountsReducer;
