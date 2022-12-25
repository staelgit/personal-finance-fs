import httpService from './http.service';

const operationEndPoint = 'operation/';

const operationService = {
   get: async () => {
      const { data } = await httpService.get(operationEndPoint);
      return data;
   },
   create: async (payload, userId) => {
      const { data } = await httpService.post(operationEndPoint, {
         ...payload,
         userId
      });
      return data;
   },
   update: async (payload) => {
      const { data } = await httpService.patch(
         operationEndPoint + payload._id,
         payload
      );
      return data;
   },
   remove: async (operationId) => {
      const { data } = await httpService.delete(
         operationEndPoint + operationId
      );
      return data;
   }
};

export default operationService;
