import { createAction, createSlice } from '@reduxjs/toolkit';
import categoryService from '../services/category.service';
// import isOutdated from '../utils/isOutdated';

const categorySlice = createSlice({
   name: 'categories',
   initialState: {
      entities: null,
      isLoading: false,
      error: null /*,
      lastFetch: null */
   },
   reducers: {
      requested: (state) => {
         state.isLoading = true;
      },
      received: (state, action) => {
         state.entities = action.payload;
         // state.lastFetch = Date.now();
         state.isLoading = false;
      },
      requestFiled: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      },
      categoryCreated: (state, action) => {
         state.entities.push(action.payload);
      },
      categoryRemoved: (state, action) => {
         state.entities = state.entities.filter(
            (c) => c._id !== action.payload
         );
      },
      categoryUpdateSuccessful: (state, action) => {
         state.entities[
            state.entities.findIndex((u) => u._id === action.payload._id)
         ] = action.payload;
      }
   }
});

const { reducer: categoriesReducer, actions } = categorySlice;
const {
   requested,
   received,
   requestFiled,
   categoryCreated,
   categoryRemoved,
   categoryUpdateSuccessful
} = actions;

const addCategoryRequested = createAction('categories/addCategoryRequested');
const removeCategoryRequested = createAction(
   'categories/removeCategoryRequested'
);
const updateCategoryRequested = createAction(
   'categories/updateCategoryRequested'
);

export const loadCategoriesList = () => async (dispatch /*, getState */) => {
   console.log('dispatch loadCategoriesList');
   // const { lastFetch } = getState().categories;
   // if (isOutdated(lastFetch)) {
   dispatch(requested());
   try {
      const { content } = await categoryService.get();
      dispatch(received(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
   // }
};

export const createCategory = (payload, userId) => async (dispatch) => {
   dispatch(addCategoryRequested());
   try {
      const { content } = await categoryService.create(payload, userId);
      dispatch(categoryCreated(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};
export const removeCategory = (categoryId) => async (dispatch) => {
   dispatch(removeCategoryRequested());
   try {
      const { content } = await categoryService.remove(categoryId);
      if (!content) {
         dispatch(categoryRemoved(categoryId));
      }
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};

export const updateCategory = (payload) => async (dispatch) => {
   dispatch(updateCategoryRequested());
   try {
      const { content } = await categoryService.update(payload);
      dispatch(categoryUpdateSuccessful(content));
   } catch (error) {
      dispatch(requestFiled(error.message));
   }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) =>
   state.categories.isLoading;
export const getCategoryById = (categoryId) => (state) => {
   return state.categories.entities.find((c) => c._id === categoryId);
};

export default categoriesReducer;
