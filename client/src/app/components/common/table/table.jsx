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
   data: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string,
         name: PropTypes.string,
         bookmark: PropTypes.bool,
         rate: PropTypes.number,
         completedMeetings: PropTypes.number,
         qualities: PropTypes.array,
         profession: PropTypes.string
      })
   ).isRequired,
   onSort: PropTypes.func.isRequired,
   selectedSort: PropTypes.shape({
      path: PropTypes.string,
      order: PropTypes.string
   }),
   columns: PropTypes.shape({
      name: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),

      qualities: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      profession: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      completedMeetings: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      rate: PropTypes.shape({ path: PropTypes.string, name: PropTypes.string }),
      bookmark: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      }),
      delete: PropTypes.shape({
         path: PropTypes.string,
         name: PropTypes.string,
         component: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
      })
   }).isRequired,
   children: PropTypes.array
};

export default Table;
