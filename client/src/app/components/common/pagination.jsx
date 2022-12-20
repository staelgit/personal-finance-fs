import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
   const pageCount = Math.ceil(itemsCount / pageSize);

   if (pageCount === 1) return null;

   const pages = _.range(1, pageCount + 1);

   return (
      <nav>
         <ul className="pagination flex">
            {pages.map((page) => (
               <button
                  key={`page_${page}`}
                  className={`page-item mx-2  px-2 rounded  border hover:bg-secondary-ultralight ${
                     page === currentPage
                        ? 'ring-2 ring-offset-1 ring-primary pointer-events-none'
                        : ''
                  }`}
                  onClick={() => onPageChange(page)}
               >
                  <li>{page}</li>
               </button>
            ))}
         </ul>
      </nav>
   );
};

Pagination.propTypes = {
   itemsCount: PropTypes.number.isRequired,
   pageSize: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
   currentPage: PropTypes.number.isRequired
};

export default Pagination;
