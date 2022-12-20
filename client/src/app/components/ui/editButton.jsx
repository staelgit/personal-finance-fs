import React from 'react';
import PropTypes from 'prop-types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { setModalOn } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';

const EditButton = ({ id }) => {
   const dispatch = useDispatch();
   return (
      <button
         title={'Редактировать'}
         className={
            'w-8 h-8 -m-2 flex justify-center items-center rounded-full hover:bg-secondary-ultralight'
         }
         onClick={() => {
            dispatch(
               setModalOn({
                  type: 'operation',
                  data: {
                     type: 'update',
                     title: 'Изменить операцию',
                     componentId: id
                  }
               })
            );
         }}
      >
         <PencilSquareIcon className={'w-5 h-5'} />
      </button>
   );
};

EditButton.propTypes = {
   id: PropTypes.string.isRequired
};

export default EditButton;
