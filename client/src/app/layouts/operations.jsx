import React from 'react';
// import operationService from '../services/operation.service';
import AccountsList from '../components/page/accountsList';
import {
   getOperations,
   createOperation,
   updateOperation,
   removeOperation
} from '../store/operationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/authSlice';

const Operations = () => {
   const dispatch = useDispatch();
   const operations = useSelector(getOperations());
   const userId = useSelector(getCurrentUserId());
   console.log('operations from redux:', operations);

   const handleCreate = async () => {
      dispatch(
         createOperation(
            {
               date: 1660743000001,
               type: 'expense',
               categoryId: '6395b22554a00885e4bdf19f',
               accountId: '6394e68132fe7c32c1d6e82f',
               comment: 'Новая операция тест '
            },
            userId
         )
      );
   };

   const handleUpdate = async () => {
      dispatch(
         updateOperation({
            _id: '63963552660a22c5ea92a20e',
            date: 1660743951490,
            type: 'income',
            categoryId: '6395b25554a00885e4bdf1a7',
            accountId: '6394e68132fe7c32c1d6e82f',
            comment: 'измененный коммент'
         })
      );
   };

   const handleDelete = async () => {
      dispatch(removeOperation('63963552660a22c5ea92a20e'));
   };

   return (
      <>
         <h1>Operations Page</h1>
         <div className="grid gap-4 grid-cols-3">
            <button
               className="inline-flex items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none my-2"
               type="button"
               onClick={handleCreate}
            >
               Создать
            </button>
            <button
               className="inline-flex items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-secondary-dark hover:bg-indigo-400 focus:outline-none my-2"
               type="button"
               onClick={handleUpdate}
            >
               Изменить
            </button>
            <button
               className="inline-flex items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-danger-darkest hover:bg-indigo-400 focus:outline-none my-2"
               type="button"
               onClick={handleDelete}
            >
               Удалить
            </button>
         </div>
         <AccountsList accounts={operations} />
      </>
   );
};

export default Operations;
