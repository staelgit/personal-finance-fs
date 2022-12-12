import httpService from './http.service';
// import { nanoid } from 'nanoid';

const operationEndPoint = 'operation/';

// Сделать получение по юзерайди
const operationService = {
   get: async () => {
      const { data } = await httpService.get(operationEndPoint);
      return data;
   },
   create: async (payload, userId) => {
      // const _id = payload._id ? payload._id : nanoid();
      // console.log('_id:', _id);
      const { data } = await httpService.post(operationEndPoint, {
         // _id,
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
