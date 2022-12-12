import React from 'react';
import { useParams, Route, Redirect } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import EditUserPage from '../components/page/editUserPage';
// import UserProvider from '../hooks/useUsers';
// import { useAuth } from '../hooks/useAuth';
import { getCurrentUserId } from '../store/authSlice';
import { useSelector } from 'react-redux';

const UserProfile = () => {
   console.log('userProfile');
   const { userId, edit } = useParams();
   // const { currentUser } = useAuth();
   const currentUserId = useSelector(getCurrentUserId());

   return (
      <>
         {/* <UserProvider> */}
         {edit === 'edit' ? (
            userId === currentUserId ? (
               <EditUserPage />
            ) : (
               <Route
                  path="*"
                  element={
                     <Redirect to={`/user/${currentUserId}/edit`} replace />
                  }
               />
            )
         ) : (
            <UserPage id={userId} />
         )}
         {/* </UserProvider> */}
      </>
   );
};

export default UserProfile;
