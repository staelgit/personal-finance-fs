import cashAccounts from '../userBaseData/cashAccounts.json';
import expenseCategories from '../userBaseData/expenseCategories.json';
import incomeCategories from '../userBaseData/incomeCategories.json';

import { nanoid } from 'nanoid';
import httpService from '../services/http.service';

const useUserBaseData = () => {
   async function initializeUserBaseData(userId) {
      try {
         for (const cashAccount of cashAccounts) {
            const _id = nanoid();
            await httpService.put('account/' + _id, {
               ...cashAccount,
               _id,
               userId
            });
         }
         for (const expenseCategory of expenseCategories) {
            const _id = nanoid();
            await httpService.put('expense/' + _id, {
               ...expenseCategory,
               _id,
               userId
            });
         }
         for (const incomeCategory of incomeCategories) {
            const _id = nanoid();
            await httpService.put('income/' + _id, {
               ...incomeCategory,
               _id,
               userId
            });
         }
      } catch (error) {
         return error;
      }
   }

   return { initializeUserBaseData };
};

export default useUserBaseData;
