import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import EditUserPage from '../components/page/editUserPage';
import { getCurrentUserId } from '../store/authSlice';
import { useSelector } from 'react-redux';

const UserProfile = () => {
   const { userId } = useParams();
   const currentUserId = useSelector(getCurrentUserId());

   return (
      <>{userId === currentUserId ? <EditUserPage /> : <Redirect to="/" />}</>
   );
};

export default UserProfile;
