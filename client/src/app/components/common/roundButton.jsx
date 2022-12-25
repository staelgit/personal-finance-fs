import React from 'react';
import PropTypes from 'prop-types';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const RoundButton = ({
   size = 'big',
   buttonType = 'plus',
   className: customClasses = '',
   ...rest
}) => {
   const classes = `inline-flex items-center justify-center  leading-6 shadow rounded-full font-medium text-white focus:outline-none ${
      size === 'big' ? 'text-5xl p-2' : 'text-xl p-1'
   } ${
      buttonType === 'plus'
         ? 'bg-success hover:bg-success-dark '
         : 'bg-danger hover:bg-danger-dark'
   } ${customClasses}`;
   const iconClasses = size === 'big' ? 'h-8 w-8' : 'h-4 w-4';
   return (
      <button className={classes} {...rest}>
         {buttonType === 'plus' ? (
            <PlusIcon className={iconClasses} aria-hidden="true" />
         ) : (
            <MinusIcon className={iconClasses} aria-hidden="true" />
         )}
      </button>
   );
};

RoundButton.propTypes = {
   size: PropTypes.oneOf(['big', 'small']),
   buttonType: PropTypes.oneOf(['plus', 'minus']),
   className: PropTypes.string
};

export default RoundButton;
