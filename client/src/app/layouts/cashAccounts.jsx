import React from 'react';
// import Loader from '../components/ui/loader';
import AccountsList from '../components/page/accountsList';
import {
   getAccounts,
   createAccount,
   updateAccount,
   removeAccount
} from '../store/accounSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/authSlice';

const CashAccounts = () => {
   const dispatch = useDispatch();
   const accounts = useSelector(getAccounts());
   const userId = useSelector(getCurrentUserId());
   console.log('accounts from redux:', accounts);

   const handleCreate = async () => {
      dispatch(
         createAccount(
            {
               title: 'test redux create account'
            },
            userId
         )
      );
   };
   const handleUpdate = async () => {
      dispatch(
         updateAccount({
            _id: '63960de8660a22c5ea92a1c8',
            title: 'отредактированный тайтл3'
         })
      );
   };
   const handleDelete = async () => {
      dispatch(removeAccount('6396304f660a22c5ea92a1fd'));
   };

   return (
      <div>
         <h1>Счета</h1>

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
         <AccountsList accounts={accounts} />
      </div>
   );
};

export default CashAccounts;
