import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
   getCurrentUserData,
   getIsLoggedIn,
   getUsersLoadingStatus,
   loadCurrentUserData
} from '../../../store/authSlice';
import Loader from '../../common/loader';
import {
   loadAccountsList,
   getAccountsLoadingStatus
} from '../../../store/accounSlice';
import {
   loadCategoriesList,
   getCategoriesLoadingStatus
} from '../../../store/categorySlice';
import {
   getOperationsLoadingStatus,
   loadOperationsList
} from '../../../store/operationSlice';

const AppLoader = ({ children }) => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(getIsLoggedIn());
   const currentUser = useSelector(getCurrentUserData());
   const usersLoadingStatus = useSelector(getUsersLoadingStatus());
   const accountsLoadingStatus = useSelector(getAccountsLoadingStatus());
   const categoriesLoadingStatus = useSelector(getCategoriesLoadingStatus());
   const operationsLoadingStatus = useSelector(getOperationsLoadingStatus());

   console.log('AppLoader');
   // console.log('currentUser from AppLoader', currentUser);
   console.log('isLoggedIn from AppLoader', isLoggedIn);
   // console.log('usersStatusLoading from AppLoader', usersStatusLoading);
   // console.log('accountsStatusLoading:', accountsStatusLoading);

   useEffect(() => {
      console.log('useEffect isLoggedIn from appLoader');
      const result = isLoggedIn && !currentUser;
      console.log('result', result);
      if (result) {
         dispatch(loadCurrentUserData());
         dispatch(loadAccountsList());
         dispatch(loadCategoriesList());
         dispatch(loadOperationsList());
      }
   }, [isLoggedIn]);

   const isLoaderVisible =
      isLoggedIn &&
      (!currentUser ||
         usersLoadingStatus ||
         accountsLoadingStatus ||
         categoriesLoadingStatus ||
         operationsLoadingStatus);
   console.log('isLoaderVisible:', isLoaderVisible);
   if (isLoaderVisible) return <Loader />;

   return children;
};

AppLoader.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ])
};

export default AppLoader;
