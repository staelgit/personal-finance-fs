import React from 'react';
import PropTypes from 'prop-types';

import Table from '../common/table';

const AnalyticsExpenseIncomeTable = ({ categories, onSort, selectedSort }) => {
   const columns = {
      category: {
         path: 'title',
         name: 'Категория',
         component: (category) => (
            <div className={'py-2 px-1 leading-4 text-start'}>
               {category.title}
            </div>
         )
      },
      expense: {
         path: 'sum',
         name: 'Сумма',
         component: (category) => (
            <div className={'py-2 px-1 leading-4 text-center'}>
               {category.sum}
            </div>
         )
      },
      percent: {
         // path: 'percent',
         name: '%',
         component: (category) => (
            <div className={'py-2 px-1 leading-4 text-center'}>
               {category.percent !== 0 ? `${category.percent}%` : 0}
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
            data: categories
         }}
      />
   );
};

AnalyticsExpenseIncomeTable.propTypes = {
   categories: PropTypes.array.isRequired,
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.shape({
      path: PropTypes.string,
      order: PropTypes.string
   })
};

export default AnalyticsExpenseIncomeTable;
