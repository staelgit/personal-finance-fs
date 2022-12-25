import React from 'react';
import PropTypes from 'prop-types';

const FormsButton = ({ label, children }) => {
   return (
      <button
         type="submit"
         className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none my-2"
      >
         {label || children || 'button'}
      </button>
   );
};

FormsButton.propTypes = {
   label: PropTypes.string,
   children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
   ])
};

export default FormsButton;
