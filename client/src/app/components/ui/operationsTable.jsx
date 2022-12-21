import React from 'react';
import PropTypes from 'prop-types';

import Table from '../common/table';
import EditButton from '../ui/editButton';
import DeleteButton from './deleteButton';
import CategoryTableCell from './CategoryTableCell';
import { setModalOn } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';

const OperationsTable = ({ operations, onSort, selectedSort }) => {
   function handleUpdateOperation(id) {
      dispatch(
         setModalOn({
            type: 'operation',
            data: {
               type: 'update',
               title: 'Изменить операцию',
               componentId: id
            }
         })
      );
   }

   function handleDelete(id) {
      dispatch(
         setModalOn({
            type: 'delete',
            data: {
               type: 'operation',
               id
            }
         })
      );
   }

   const dispatch = useDispatch();
   const columns = {
      date: {
         path: 'date',
         name: 'Дата',
         component: (operation) => (
            <div className={'py-2 px-1 leading-4 text-center'}>
               {operation.dateString}
            </div>
         )
      },

      category: {
         path: 'category',
         name: 'Категория',
         component: (operation) => (
            <div className={'py-2 px-1 leading-4 text-start'}>
               <CategoryTableCell operation={operation} />
            </div>
         )
      },
      account: {
         path: 'account',
         name: 'Кошелек',
         component: (operation) => (
            <div className={'py-2 px-1 leading-4 text-center'}>
               {operation.account}
            </div>
         )
      },
      income: {
         path: 'incomeAmount',
         name: 'Доход',
         component: (operation) => (
            <div className={'py-2 px-1 leading-4 text-center'}>
               {operation.type === 'income' ? operation.amount : '-'}
            </div>
         )
      },
      expense: {
         path: 'expenseAmount',
         name: 'Расход',
         component: (operation) => (
            <div className={'py-2 px-1 leading-4 text-center'}>
               {operation.type === 'expense' ? operation.amount : '-'}
            </div>
         )
      },
      editButton: {
         component: (operation) => (
            <div className={'py-2 px-1  leading-4 text-center'}>
               <EditButton
                  onClick={() => handleUpdateOperation(operation._id)}
               />
            </div>
         )
      },
      deleteButton: {
         component: (operation) => (
            <div className={'py-2 px-1 leading-4 text-center'}>
               <DeleteButton onClick={() => handleDelete(operation._id)} />
            </div>
         )
      }
   };
   return (
      <Table
         {...{
            onSort,
            selectedSort,
            columns,
            data: operations
         }}
      />
   );
};

OperationsTable.propTypes = {
   operations: PropTypes.array.isRequired,
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.shape({
      path: PropTypes.string,
      order: PropTypes.string
   })
};

export default OperationsTable;
