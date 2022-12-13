import React from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const BackHistoryButton = () => {
   const history = useHistory();
   return (
      <button
         type="button"
         className="inline-flex justify-center items-center rounded-md border-2 border-secondary-ultralight pl-2 pr-3.5 py-1.5 mt-3 text-sm font-medium hover:bg-secondary-ultralight hover:text-black "
         onClick={() => history.goBack()}
      >
         <ChevronLeftIcon
            className="mt-0.5 h-4 hover:bg-secondary-ultralight hover:text-black"
            aria-hidden="true"
         />
         Назад
      </button>
   );
};

export default BackHistoryButton;
