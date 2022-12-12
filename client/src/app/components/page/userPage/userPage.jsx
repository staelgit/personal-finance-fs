import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../common/loader';
// import { useUser } from '../../../hooks/useUsers';
// import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../../store/authSlice';
// import history from '../../../utils/history';
import { useHistory, useRouteMatch } from 'react-router-dom';

const UserPage = ({ id: userId }) => {
   // const { currentUser } = useAuth();
   const currentUser = useSelector(getCurrentUserData());
   // const { getUserById } = useUser();
   // const user = getUserById(userId);
   const history = useHistory();
   const match = useRouteMatch();

   const handleClick = () => {
      history.push(`${match.url}/edit`);
   };

   if (currentUser) {
      return (
         <div className="container">
            <div className="card mb-3">
               <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center position-relative">
                     <img
                        src={currentUser.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="150"
                        height="150"
                     />
                     <div className="mt-3">
                        <h4>{currentUser.name}</h4>
                     </div>
                     <div className="mt-3">
                        <h4>{currentUser.email}</h4>
                     </div>
                     <button
                        className="btn btn-primary btn-sm"
                        onClick={handleClick}
                     >
                        Изменить данные
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   } else {
      return <Loader />;
   }
};

UserPage.propTypes = {
   id: PropTypes.string.isRequired
};

export default UserPage;
