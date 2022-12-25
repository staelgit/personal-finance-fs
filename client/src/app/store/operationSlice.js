import { createAction, createSlice } from '@reduxjs/toolkit';
import operationService from '../services/operation.service';

const operationSlice = createSlice({
   name: 'operations',
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

export const loadOperationsList = () => async (dispatch) => {
   dispatch(requested());
   try {
      const { content } = await operationService.get();
      dispatch(received(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
   // }
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
export const getOperationById = (operationId) => (state) => {
   return state.operations.entities.find((o) => o._id === operationId);
};

export default operationsReducer;
