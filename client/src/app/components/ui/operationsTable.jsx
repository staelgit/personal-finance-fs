import React from 'react';
import PropTypes from 'prop-types';
// import Bookmark from '../common/bookmark';

import Table from '../common/table';
import EditButton from '../ui/editButton';
import DeleteButton from './deleteButton';
// import DateTableCell from './DateTableCell';
import CategoryTableCell from './CategoryTableCell';
// import AccountTableCell from './AccountTableCell';
// import { Link } from 'react-router-dom';
// import Profession from './profession';
// import QualitiesList from './qualities';

const OperationsTable = ({
   operations,
   onSort,
   selectedSort
   // onToggleBookmark
}) => {
   const columns = {
      /*      name: {
         path: 'name',
         name: 'Имя',
         component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
      },
      qualities: {
         name: 'Качества',
         component: (user) => <QualitiesList qualities={user.qualities} />
      },
      profession: {
         name: 'Профессия',
         component: (user) => <Profession id={user.profession} />
      },
      completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
      rate: { path: 'rate', name: 'Оценка' },
      bookmark: {
         path: 'bookmark',
         name: 'Избранное',
         component: (user) => (
            <Bookmark
               {...{
                  bookmark: user.bookmark,
                  _id: user._id,
                  onToggleBookmark
               }}
            />
         )
      } */
      date: {
         path: 'date',
         name: 'Дата',
         component: (operation) => operation.dateString
      },

      category: {
         path: 'category',
         name: 'Категория',
         component: (operation) => <CategoryTableCell operation={operation} />
      },
      account: {
         path: 'account',
         name: 'Кошелек',
         component: (operation) => operation.account
      },
      income: {
         path: 'incomeAmount',
         name: 'Доход',
         component: (operation) =>
            operation.type === 'income' ? operation.amount : '-'
      },
      expense: {
         path: 'expenseAmount',
         name: 'Расход',
         component: (operation) =>
            operation.type === 'expense' ? operation.amount : '-'
      },
      editButton: {
         component: (operation) => <EditButton id={operation._id} />
      },
      deleteButton: {
         component: (operation) => <DeleteButton id={operation._id} />
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
   }) /*,
   onToggleBookmark: PropTypes.func */
};

export default OperationsTable;
