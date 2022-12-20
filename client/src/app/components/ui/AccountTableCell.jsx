import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getAccountById } from '../../store/accounSlice';

const AccountTableCell = ({ accountId }) => {
   const accountTitle = useSelector(getAccountById(accountId)).title;

   return <>{accountTitle}</>;
};

AccountTableCell.propTypes = {
   accountId: PropTypes.string.isRequired
};

export default AccountTableCell;
