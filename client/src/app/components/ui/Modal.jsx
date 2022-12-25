import React from 'react';
import NewOperation from './newOperation';
import Delete from './Delete';
import { useSelector } from 'react-redux';
import { getModalType } from '../../store/modalSlice';
import NewAccount from './newAccount';
import NewCategory from './newCatigory';

const Modal = () => {
   const modalType = useSelector(getModalType());
   return (
      <div className="modal absolute flex justify-center items-center bg-black/50 w-full h-screen z-20 transition-all duration-500">
         <div>{modalType === 'operation' && <NewOperation />}</div>
         <div>{modalType === 'account' && <NewAccount />}</div>
         <div>{modalType === 'category' && <NewCategory />}</div>
         <div>{modalType === 'delete' && <Delete />}</div>
      </div>
   );
};

export default Modal;
