import React from 'react';
import PropTypes from 'prop-types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const EditButton = ({ className: customClasses = '', ...rest }) => {
   return (
      <button
         title={'Редактировать'}
         className={`w-8 h-8 flex justify-center items-center rounded-full text-gray-300 hover:bg-secondary-ultralight hover:text-secondary-dark ${customClasses}`}
         {...rest}
      >
         <PencilSquareIcon className={'w-5 h-5'} />
      </button>
   );
};

EditButton.propTypes = {
   className: PropTypes.string
};

export default EditButton;
