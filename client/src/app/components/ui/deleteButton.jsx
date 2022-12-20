import React from 'react';
import PropTypes from 'prop-types';
import { TrashIcon } from '@heroicons/react/24/outline';
import { setModalOn } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';

const DeleteButton = ({ id }) => {
   const dispatch = useDispatch();
   return (
      <button
         title={'Удалить'}
         className={
            'w-8 h-8 -m-2 flex justify-center items-center rounded-full hover:bg-secondary-ultralight'
         }
         onClick={() => {
            dispatch(
               setModalOn({
                  type: 'delete',
                  data: {
                     id
                  }
               })
            );
         }}
      >
         <TrashIcon className={'w-5 h-5'} />
      </button>
   );
};

DeleteButton.propTypes = {
   id: PropTypes.string.isRequired
};

export default DeleteButton;
