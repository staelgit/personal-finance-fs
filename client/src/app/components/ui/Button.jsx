import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
   label,
   children,
   buttonType = 'success',
   className: customClasses = '',
   ...rest
}) => {
   const classes = `flex justify-center items-center py-2.5 px-5 rounded text-white ${
      buttonType === 'success'
         ? 'bg-primary hover:bg-primary-dark'
         : 'bg-secondary hover:bg-secondary-dark'
   } ${customClasses}`;

   return (
      <button className={classes} {...rest}>
         {label || children || 'button'}
      </button>
   );
};

Button.propTypes = {
   label: PropTypes.string,
   children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
   ]),
   buttonType: PropTypes.string,
   className: PropTypes.string
};

export default Button;
