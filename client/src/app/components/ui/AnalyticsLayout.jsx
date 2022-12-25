import React, { useState } from 'react';
import GroupList from '../common/groupList';
// import AnalyticsAccounts from './analyticsAccounts';
import AnalyticsExpenseIncome from './analyticsExpenseIncome';

const AnalyticsLayout = () => {
   const sectionsTypes = [
      // { _id: 1, name: 'Счета', key: 'accounts' },
      { _id: 2, name: 'Расходы', key: 'expense' },
      { _id: 3, name: 'Доходы', key: 'income' }
   ];
   const [selectedType, setSelectedType] = useState(sectionsTypes[0]);

   const handleTypeSelect = (item) => {
      setSelectedType(item);
   };

   return (
      <>
         <div className="flex mb-2">
            <GroupList
               selectedItem={selectedType}
               items={sectionsTypes}
               onItemSelect={handleTypeSelect}
            />
         </div>
         {<AnalyticsExpenseIncome type={selectedType.key} />}
         {/* {selectedType.key === 'accounts' && <AnalyticsAccounts />} */}
      </>
   );
};

export default AnalyticsLayout;
