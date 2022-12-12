import { useEffect, useState } from 'react';
import cashAccounts from '../mockData/cashAccounts.json';
import expenseCategories from '../mockData/expenseCategories.json';
import incomeCategories from '../mockData/incomeCategories.json';
import operations from '../mockData/operations.json';
// import typeCashAccounts from '../mockData/typeCashAccounts.json';

import httpService from '../services/http.service';

const useMockData = () => {
   const statusConsts = {
      idle: 'Not started',
      pending: 'In process',
      success: 'Ready',
      error: 'Error occurred'
   };
   const [error, setError] = useState(null);
   const [status, setStatus] = useState(statusConsts.idle);
   const [progress, setProgress] = useState(0);
   const [count, setCount] = useState(0);
   const summaryCount =
      cashAccounts.length +
      expenseCategories.length +
      incomeCategories.length +
      operations.length; /* +
      typeCashAccounts.length */
   const incrementCount = () => {
      setCount((prevState) => prevState + 1);
   };
   const updateProgress = () => {
      if (count !== 0 && statusConsts.idle) {
         setStatus(statusConsts.pending);
      }
      const newProgress = Math.floor((count / summaryCount) * 100);
      if (progress < newProgress) {
         setProgress(() => newProgress);
      }
      if (newProgress === 100) {
         setStatus(statusConsts.success);
      }
   };

   useEffect(() => {
      updateProgress();
   }, [count]);

   async function initialize() {
      try {
         for (const cashAccount of cashAccounts) {
            await httpService.put('account/' + cashAccount._id, cashAccount);
            incrementCount();
         }
         // for (const user of users) {
         //    await httpService.put('user/' + user._id, user);
         //    incrementCount();
         // }
         for (const expenseCategory of expenseCategories) {
            await httpService.put(
               'expense/' + expenseCategory._id,
               expenseCategory
            );
            incrementCount();
         }
         for (const incomeCategory of incomeCategories) {
            await httpService.put(
               'income/' + incomeCategory._id,
               incomeCategory
            );
            incrementCount();
         }
         for (const operation of operations) {
            await httpService.put('operation/' + operation._id, operation);
            incrementCount();
         }
         /*   for (const typeCashAccount of typeCashAccounts) {
            await httpService.put(
               'type/' + typeCashAccount._id,
               typeCashAccount
            );
            incrementCount();
         } */
      } catch (error) {
         setError(error);
         setStatus(statusConsts.error);
      }
   }

   return { error, initialize, progress, status };
};

export default useMockData;
