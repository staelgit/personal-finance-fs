import React from 'react';
import NewOperation from './newOperation';
import Delete from './Delete';
import { useSelector } from 'react-redux';
import { getModalType } from '../../store/modalSlice';

const Modal = () => {
   const modalType = useSelector(getModalType());
   // const modalType = 'delete';
   // const modalType = 'operation';
   console.log('modalType:', modalType);
   return (
      <div className="modal absolute flex justify-center items-center bg-black/50 w-full h-full z-20 transition-all duration-500">
         <div>{modalType === 'operation' && <NewOperation />}</div>
         <div>{modalType === 'delete' && <Delete />}</div>
      </div>
   );
};

export default Modal;
