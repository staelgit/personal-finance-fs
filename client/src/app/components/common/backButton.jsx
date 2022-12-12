import React from 'react';
import history from '../../utils/history';

const BackHistoryButton = () => {
   return (
      <button className="btn btn-primary" onClick={() => history.back()}>
         <i className="bi bi-caret-left"></i>
         Назад
      </button>
   );
};

export default BackHistoryButton;
