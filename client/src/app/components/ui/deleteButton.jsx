import React from 'react';
import PropTypes from 'prop-types';
import { TrashIcon } from '@heroicons/react/24/outline';

const DeleteButton = ({ className: customClasses = '', ...rest }) => {
   return (
      <button
         title={'Удалить'}
         className={`w-8 h-8 -m-2 flex justify-center items-center rounded-full text-gray-300 hover:bg-secondary-ultralight hover:text-secondary-dark ${customClasses}`}
         {...rest}
      >
         <TrashIcon className={'w-5 h-5'} />
      </button>
   );
};

DeleteButton.propTypes = {
   className: PropTypes.string
};

export default DeleteButton;
