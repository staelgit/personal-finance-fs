import React, { useState } from 'react';
import Card from '../common/Card';
import { getModalData, setModalOff } from '../../store/modalSlice';
import Button from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getOperations, removeOperation } from '../../store/operationSlice';
import { setMessage } from '../../store/messageSlice';
import SpinLoading from '../common/SpinLoader';
import { removeAccount } from '../../store/accounSlice';
import { removeCategory } from '../../store/categorySlice';

const Delete = () => {
   const dispatch = useDispatch();
   const { id, type } = useSelector(getModalData());

   const [loading, setLoading] = useState(false);
   const operations = useSelector(getOperations());

   const isPossible = checkPossibilityDeletion(id);

   const handleDelete = async () => {
      setLoading(true);

      try {
         type === 'operation' && (await dispatch(removeOperation(id)));
         type === 'account' && (await dispatch(removeAccount(id)));
         type === 'category' && (await dispatch(removeCategory(id)));
         dispatch(setModalOff());
      } catch (error) {
         dispatch(setMessage(error.message));
      } finally {
         setLoading(false);
      }
   };

   function checkPossibilityDeletion(id) {
      if (type === 'operation') {
         return true;
      }
      if (type === 'account') {
         return !operations.some((o) => o.accountId === id);
      }
      if (type === 'category') {
         return !operations.some((o) => o.categoryId === id);
      }
   }

   return (
      <div>
         <Card className="w-[32rem] py-0 px-0 bg-white">
            <h1 className="px-5 py-3">Предупреждение</h1>
            <div className="px-5 py-5 flex items-center border-y border-secondary-light">
               <div>
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
               </div>

               <div className="ml-3">
                  {isPossible
                     ? 'Вы собираетесь удалить элемент. Вы уверены?'
                     : 'Данный элемент невозможно удалить так как он используется в существующих операциях'}
               </div>
            </div>
            {isPossible ? (
               <div className={'flex justify-between px-5 py-3'}>
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
            ) : (
               <div className={'flex justify-center px-5 py-3'}>
                  <Button
                     buttonType="cancel"
                     onClick={() => dispatch(setModalOff())}
                     type="button"
                     className={'w-4/12'}
                  >
                     Отмена
                  </Button>
               </div>
            )}
         </Card>
      </div>
   );
};

export default Delete;
