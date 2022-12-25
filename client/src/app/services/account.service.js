import httpService from './http.service';

const accountEndPoint = 'account/';

const accountService = {
   get: async () => {
      const { data } = await httpService.get(accountEndPoint);
      return data;
   },
   create: async (payload, userId) => {
      const { data } = await httpService.post(accountEndPoint, {
         ...payload,
         userId
      });
      return data;
   },
   update: async (payload) => {
      const { data } = await httpService.patch(
         accountEndPoint + payload._id,
         payload
      );
      return data;
   },
   remove: async (accountId) => {
      const { data } = await httpService.delete(accountEndPoint + accountId);
      return data;
   }
};

export default accountService;
