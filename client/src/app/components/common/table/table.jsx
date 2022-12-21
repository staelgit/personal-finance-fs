import React from 'react';
import PropTypes from 'prop-types';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({ onSort, selectedSort, columns, data, children }) => {
   return (
      <table className={'table-auto w-full'}>
         {children || (
            <>
               <TableHeader {...{ onSort, selectedSort, columns }} />
               <TableBody {...{ data, columns }} />
            </>
         )}
      </table>
   );
};

Table.propTypes = {
   data: PropTypes.array.isRequired,
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.shape({
      path: PropTypes.string,
      order: PropTypes.string
   }),
   columns: PropTypes.object.isRequired,
   children: PropTypes.array
};

export default Table;
