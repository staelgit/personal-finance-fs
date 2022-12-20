import React, { useState } from 'react';
import Card from '../common/Card';
import { getModalData, setModalOff } from '../../store/modalSlice';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeOperation } from '../../store/operationSlice';
import { setMessage } from '../../store/messageSlice';
import SpinLoading from '../common/SpinLoader';

const Delete = () => {
   const dispatch = useDispatch();
   const { id } = useSelector(getModalData());
   console.log('id', id);
   const [loading, setLoading] = useState(false);

   const handleDelete = async () => {
      console.log('handleDelete');

      setLoading(true);

      try {
         await dispatch(removeOperation(id));
         dispatch(setModalOff());
      } catch (error) {
         dispatch(setMessage(error.message));
      } finally {
         setLoading(false);
      }
   };
   return (
      <div>
         <Card className="w-96 p-7 bg-white">
            <h1 className="mb-6">Предупреждение</h1>
            <div className="flex">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-yellow-300 "
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     fill="currentColor"
                     stroke="black"
                     d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
               </svg>
               <div className="ml-3">
                  Вы собираетесь удалить элемент. Вы уверены?
               </div>
            </div>
            <div className={'flex justify-between mt-6'}>
               <Button
                  disabled={loading}
                  buttonType="success"
                  type="button"
                  onClick={handleDelete}
                  className="w-6/12"
               >
                  {loading && <SpinLoading />} Подтверждаю
               </Button>
               <Button
                  buttonType="cancel"
                  onClick={() => dispatch(setModalOff())}
                  type="button"
                  className={'ml-3 w-6/12'}
               >
                  Я передумал
               </Button>
            </div>
         </Card>
      </div>
   );
};

export default Delete;
