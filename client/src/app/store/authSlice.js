import { createSlice, createAction } from '@reduxjs/toolkit';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import history from '../utils/history';
import { generateAuthError } from '../utils/generateAuthError';
import cashAccounts from '../userBaseData/cashAccounts.json';
import categories from '../userBaseData/categories.json';
import accountService from '../services/account.service';
import categoryService from '../services/category.service';

const initialState = localStorageService.getAccessToken()
   ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
     }
   : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
     };

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      userRequested: (state) => {
         state.isLoading = true;
      },
      userReceived: (state, action) => {
         state.entities = action.payload;
         state.dataLoaded = true;
         state.isLoading = false;
      },
      userRequestFiled: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      },
      authRequested: (state) => {
         state.error = null;
      },
      authRequestSuccess: (state, action) => {
         state.auth = action.payload;
         state.isLoggedIn = true;
      },
      authRequestFailed: (state, action) => {
         state.error = action.payload;
      },
      userCreateFailed: (state, action) => {
         state.error = action.payload;
      },
      userUpdateSuccessful: (state, action) => {
         state.entities = action.payload;
      },
      userLoggedOut: (state) => {
         state.entities = null;
         state.isLoggedIn = false;
         state.auth = null;
         state.dataLoaded = false;
      }
   }
});

const { reducer: authReducer, actions } = authSlice;
const {
   userRequested,
   userReceived,
   userRequestFiled,
   authRequested,
   authRequestSuccess,
   authRequestFailed,
   userCreateFailed,
   userUpdateSuccessful,
   userLoggedOut
} = actions;

const userCreateRequested = createAction('users/userCreateRequested');
const userCreated = createAction('users/userCreated');
const userUpdateRequested = createAction('users/userUpdateRequested');
const userUpdateFailed = createAction('users/userUpdateFailed');

export const signIn =
   ({ payload, redirect }) =>
   async (dispatch) => {
      const { email, password } = payload;
      dispatch(authRequested());
      try {
         const data = await authService.login({ email, password });
         localStorageService.setTokens(data);
         dispatch(authRequestSuccess({ userId: data.userId }));
         history.push(redirect);
      } catch (error) {
         const { code, message } = error.response.data.error;
         if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
         } else {
            dispatch(authRequestFailed(error.message));
         }
      }
   };

export const signUp = (payload) => async (dispatch) => {
   dispatch(authRequested());
   try {
      const data = await authService.register(payload);
      localStorageService.setTokens(data);
      const { userId } = data;
      await dispatch(createUser(userId));
      dispatch(authRequestSuccess({ userId }));
      history.push('/');
   } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
         const errorMessage = generateAuthError(message);
         dispatch(authRequestFailed(errorMessage));
      } else {
         dispatch(authRequestFailed(error.message));
      }
   }
};

export const logOut = () => (dispatch) => {
   localStorageService.removeAuthData();
   dispatch(userLoggedOut());
   history.push('/');
};

function createUser(userId) {
   return async function (dispatch) {
      dispatch(userCreateRequested());
      try {
         for (const cashAccount of cashAccounts) {
            await accountService.create(cashAccount, userId);
         }
         for (const category of categories) {
            await categoryService.create(category, userId);
         }
         dispatch(userCreated());
      } catch (error) {
         const { code, message } = error.response.data.error;
         if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(userCreateFailed(errorMessage));
         } else {
            dispatch(userCreateFailed(error.message));
         }
      }
   };
}

export const loadCurrentUserData = () => async (dispatch) => {
   dispatch(userRequested());
   try {
      const { content } = await userService.getCurrentUser();
      dispatch(userReceived(content));
   } catch (error) {
      dispatch(userRequestFiled(error.message));
   }
};

export const updateUser = (payload) => async (dispatch) => {
   dispatch(userUpdateRequested());
   try {
      const { content } = await userService.update(payload);
      dispatch(userUpdateSuccessful(content));
   } catch (error) {
      dispatch(userUpdateFailed(error.message));
   }
};

export const getCurrentUserData = () => (state) => {
   return state.auth.entities ? state.auth.entities : null;
};

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;
// export const getUserDataStatus = () => (state) => state.auth.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.auth.isLoading;
export const getCurrentUserId = () => (state) => state.auth.auth.userId;
export const getAuthErrors = () => (state) => state.auth.error;

export default authReducer;
