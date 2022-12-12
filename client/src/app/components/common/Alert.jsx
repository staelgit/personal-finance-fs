import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, children }) => {
   const baseStyle =
      'inline-flex w-full items-center justify-center py-2 px-3 leading-6 text-sm font-medium rounded-md my-2';
   function getStyle(type) {
      switch (type) {
         case 'success':
            return `${baseStyle} text-success-darkest bg-success-ultralight`;
         case 'danger':
            return `${baseStyle} text-danger-darkest bg-danger-ultralight`;
         default:
            return `${baseStyle} `;
      }
   }

   return <div className={getStyle(type)}>{children}</div>;
};

Alert.propTypes = {
   type: PropTypes.string,
   children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
   ])
};

export default Alert;
