import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// import { getCategoryById } from '../../store/categorySlice';

const CategoryTableCell = ({ operation }) => {
   const { category, comment } = operation;
   // const categoryTitle = useSelector(getCategoryById(categoryId)).title;

   return (
      <div className={'text-start'}>
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
