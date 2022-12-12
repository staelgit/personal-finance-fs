import React from 'react';
import PropTypes from 'prop-types';

const AccountsList = ({ accounts }) => {
   return (
      <ul>
         {accounts.map((account) => (
            <li
               key={account._id}
               className="text-sm"
            >{`Id - ${account._id}, title - ${account.title}, userId - ${account.userId}`}</li>
         ))}
      </ul>
   );
};

AccountsList.propTypes = {
   accounts: PropTypes.array
};

export default AccountsList;
