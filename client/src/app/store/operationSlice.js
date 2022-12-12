import { createAction, createSlice } from '@reduxjs/toolkit';
import operationService from '../services/operation.service';
import isOutdated from '../utils/isOutdated';

const operationSlice = createSlice({
   name: 'operations',
   initialState: {
      entities: null,
      isLoading: false,
      error: null,
      lastFetch: null
   },
   reducers: {
      requested: (state) => {
         state.isLoading = true;
      },
      received: (state, action) => {
         state.entities = action.payload;
         state.lastFetch = Date.now();
         state.isLoading = false;
      },
      requestFiled: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      },
      operationCreated: (state, action) => {
         state.entities.push(action.payload);
      },
      operationRemoved: (state, action) => {
         state.entities = state.entities.filter(
            (c) => c._id !== action.payload
         );
      },
      operationUpdateSuccessful: (state, action) => {
         state.entities[
            state.entities.findIndex((u) => u._id === action.payload._id)
         ] = action.payload;
      }
   }
});

const { reducer: operationsReducer, actions } = operationSlice;
const {
   requested,
   received,
   requestFiled,
   operationCreated,
   operationRemoved,
   operationUpdateSuccessful
} = actions;

const addOperationRequested = createAction('operations/addOperationRequested');
const removeOperationRequested = createAction(
   'operations/removeOperationRequested'
);
const updateOperationRequested = createAction(
   'operations/updateOperationRequested'
);

export const loadOperationsList = () => async (dispatch, getState) => {
   console.log('dispatch loadOperationsList');
   const { lastFetch } = getState().operations;
   if (isOutdated(lastFetch)) {
      dispatch(requested());
      try {
         const { content } = await operationService.get();
         dispatch(received(content));
      } catch (error) {
         dispatch(requestFiled(error.message));
      }
   }
};

export const createOperation = (payload, userId) => async (dispatch) => {
   dispatch(addOperationRequested());
   try {
      const { content } = await operationService.create(payload, userId);
      dispatch(operationCreated(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};
export const removeOperation = (operationId) => async (dispatch) => {
   dispatch(removeOperationRequested());
   try {
      const { content } = await operationService.remove(operationId);
      if (!content) {
         dispatch(operationRemoved(operationId));
      }
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};

export const updateOperation = (payload) => async (dispatch) => {
   dispatch(updateOperationRequested());
   try {
      const { content } = await operationService.update(payload);
      dispatch(operationUpdateSuccessful(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};

export const getOperations = () => (state) => state.operations.entities;
export const getOperationsLoadingStatus = () => (state) =>
   state.operations.isLoading;
export const getOperationsByIds = (operationsIds) => (state) => {
   if (state.operations.entities) {
      const operationsArray = [];
      for (const opId of operationsIds) {
         for (const operation of state.operations.entities) {
            if (operation._id === opId) {
               operationsArray.push(operation);
               break;
            }
         }
      }
      return operationsArray;
   }
   return [];
};

export default operationsReducer;
