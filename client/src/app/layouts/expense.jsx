import React from 'react';
// import categoryService from '../services/category.service';
import AccountsList from '../components/page/accountsList';
import {
   getCategories,
   createCategory,
   updateCategory,
   removeCategory
} from '../store/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/authSlice';

const Expense = () => {
   const dispatch = useDispatch();
   const categories = useSelector(getCategories());
   const userId = useSelector(getCurrentUserId());
   console.log('categories from redux:', categories);

   const handleCreate = async () => {
      dispatch(
         createCategory(
            { type: 'income', title: 'тестовая категория из редакса' },
            userId
         )
      );
   };
   const handleUpdate = async () => {
      dispatch(
         updateCategory({
            _id: '6396306b660a22c5ea92a201',
            title: 'Тестовая обновленная категория',
            type: 'expense'
         })
      );
   };
   const handleDelete = async () => {
      dispatch(removeCategory('6396306b660a22c5ea92a201'));
   };

   return (
      <div>
         <h1>Расходы</h1>
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
         <AccountsList accounts={categories} />
      </div>
   );
};

export default Expense;
