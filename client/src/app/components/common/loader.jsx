import React from 'react';

const Loader = () => {
   return (
      <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
         <div className="flex items-center flex-col opacity-30">
            <svg
               className="animate-spin h-10 w-10 text-gray-600 text-primary-dark mb-1.5"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
            >
               <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
               ></circle>
               <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
               ></path>
            </svg>
            <div className="text-sm">loading...</div>
         </div>
      </div>
   );
};

export default Loader;
