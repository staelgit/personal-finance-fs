import React from 'react';
import PropTypes from 'prop-types';

const CategoryTableCell = ({ operation }) => {
   const { category, comment } = operation;

   return (
      <div>
         <div>{category}</div>
         <div className={'pl-3 text-xs text-secondary leading-3 mt-0.5'}>
            {comment}
         </div>
      </div>
   );
};

CategoryTableCell.propTypes = {
   operation: PropTypes.object.isRequired
};

export default CategoryTableCell;
