import cashAccounts from '../userBaseData2/cashAccounts.json';
// import categories from '../userBaseData2/categories.json';
// import operations from '../userBaseData2/operations.json';

import accountService from '../services/account.service';

const useUserBaseData = () => {
   async function initializeUserBaseData(userId) {
      try {
         for (const cashAccount of cashAccounts) {
            await accountService.create(cashAccount, userId);
         }
         /*         for (const category of categories) {
            const _id = nanoid();
            await httpService.put('expense/' + _id, {
               ...category,
               _id,
               userId
            });
         }
         for (const operation of operations) {
            const _id = nanoid();
            await httpService.put('income/' + _id, {
               ...operation,
               _id,
               userId
            });
         } */
      } catch (error) {
         return error;
      }
   }

   return { initializeUserBaseData };
};

export default useUserBaseData;
