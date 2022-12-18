import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
   name: 'modal',
   initialState: {
      isModal: false,
      type: null,
      data: null
   },
   reducers: {
      on: (state, action) => {
         state.isModal = true;
         state.type = action.payload.type;
         state.data = action.payload.data;
      },
      off: (state, action) => {
         state.isModal = false;
         state.type = null;
         state.data = null;
      }
   }
});

const { reducer: modalReducer, actions } = modalSlice;
const { on, off } = actions;

export const setModalOn = (payload) => (dispatch) => {
   dispatch(on(payload));
};

export const setModalOff = () => (dispatch) => {
   dispatch(off());
};

export const getModalStatus = () => (state) => state.modal.isModal;
export const getModalType = () => (state) => state.modal.type;
export const getModalData = () => (state) => state.modal.data;
export const getModalAll = () => (state) => state.modal;

export default modalReducer;
