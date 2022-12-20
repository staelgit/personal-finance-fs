import React from 'react';
import PropTypes from 'prop-types';
import {
   BarsArrowDownIcon,
   BarsArrowUpIcon
} from '@heroicons/react/24/outline';

const TableHeader = ({ onSort, selectedSort, columns }) => {
   const handleSort = (item) => {
      if (selectedSort && selectedSort.path === item) {
         onSort({
            ...selectedSort,
            order: selectedSort.order === 'asc' ? 'desc' : 'asc'
         });
      } else {
         onSort({ path: item, order: 'asc' });
      }
   };

   const showSortingArrow = () => {
      const classes = 'w-4 h-4 text-secondary inline ml-1';
      return selectedSort.order === 'asc' ? (
         <BarsArrowUpIcon className={classes} />
      ) : (
         <BarsArrowDownIcon className={classes} />
      );
   };

   return (
      <thead>
         <tr className="py-3">
            {Object.keys(columns).map((column) => (
               <th
                  className={'px-3 py-2'}
                  key={column}
                  onClick={
                     columns[column].path
                        ? () => handleSort(columns[column].path)
                        : undefined
                  }
                  {...{ role: columns[column].path && 'button' }}
                  scope="col"
               >
                  {columns[column].name}

                  {selectedSort &&
                     columns[column].path === selectedSort.path &&
                     showSortingArrow()}
               </th>
            ))}
         </tr>
      </thead>
   );
};

TableHeader.propTypes = {
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.shape({
      path: PropTypes.string,
      order: PropTypes.string
   }),
   columns: PropTypes.object.isRequired
};

export default TableHeader;
