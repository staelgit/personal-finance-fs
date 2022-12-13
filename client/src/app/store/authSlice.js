import { createSlice, createAction } from '@reduxjs/toolkit';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import history from '../utils/history';
import { generateAuthError } from '../utils/generateAuthError';
// import useUserBaseData from '../utils/initUserBaseData';

// const { initializeUserBaseData } = useUserBaseData();

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
      userCreated: (state, action) => {
         state.entities = action.payload;
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
   // userCreated,
   userUpdateSuccessful,
   userLoggedOut
} = actions;

// const userCreateRequested = createAction('users/userCreateRequested');
// const createUserFailed = createAction('users/createUserFailed');
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
      dispatch(authRequestSuccess({ userId: data.userId }));
      /*
      dispatch(
         createUser({
            _id: data.localId,
            email,
            image: `https://avatars.dicebear.com/api/avataaars/${(
               Math.random() + 1
            )
               .toString(36)
               .substring(7)}.svg`,
            ...rest
         })
      );
*/

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

/*
function createUser(payload) {
   return async function (dispatch) {
      dispatch(userCreateRequested());
      try {
         const { content } = await userService.create(payload);
         console.log('payload:', payload);
         dispatch(userCreated(content));
      } catch (error) {
         dispatch(createUserFailed(error.message));
      }
   };
}
*/

export const loadCurrentUserData = () => async (dispatch) => {
   console.log('dispatch loadCurrentUserData');
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
      console.log('content:', content);
      dispatch(userUpdateSuccessful(content));
      // history.push(`/app/users/${content._id}`);
   } catch (error) {
      dispatch(userUpdateFailed(error.message));
   }
};

export const getCurrentUserData = () => (state) => {
   return state.auth.entities ? state.auth.entities : null;
};

// export const loadUsersList = () => async (dispatch) => {
//    dispatch(userRequested());
//    try {
//       const { content } = await userService.get();
//       dispatch(userReceived(content));
//    } catch (error) {
//       dispatch(userRequestFiled(error.message));
//    }
// };
// export const getUsers = () => (state) => state.users.entities;
/* export const getUserById = (userId) => (state) => {
   if (state.auth.entities) {
      return state.auth.entities.find((u) => u._id === userId);
   }
}; */

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;
export const getUserDataStatus = () => (state) => state.auth.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.auth.isLoading;
export const getCurrentUserId = () => (state) => state.auth.auth.userId;
export const getAuthErrors = () => (state) => state.auth.error;

export default authReducer;
