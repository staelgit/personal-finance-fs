import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({ data, columns }) => {
   const renderContent = (column, item) => {
      if (columns[column].component) {
         const component = columns[column].component;
         if (typeof component === 'function') {
            return component(item);
         }
         return component;
      }
      return _.get(item, columns[column].path);
   };
   return (
      <tbody className="px-4 border-t border-gray-200 divide-y divide-secondary-light">
         {data.map(
            (
               item // берем одну операцию
            ) => (
               <tr key={item._id}>
                  {Object.keys(columns).map((column) => (
                     <td key={column}>
                        <div className={'py-2 px-3 leading-4 text-center'}>
                           {renderContent(column, item)}
                        </div>
                     </td>
                  ))}
               </tr>
            )
         )}
      </tbody>
   );
};

TableBody.propTypes = {
   data: PropTypes.array.isRequired,
   columns: PropTypes.object.isRequired
};

export default TableBody;
