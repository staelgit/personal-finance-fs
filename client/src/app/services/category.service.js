import httpService from './http.service';
// import { nanoid } from 'nanoid';

const categoryEndPoint = 'category/';

// Сделать получение по юзерайди
const categoryService = {
   get: async () => {
      const { data } = await httpService.get(categoryEndPoint);
      return data;
   },
   create: async (payload, userId) => {
      // const _id = payload._id ? payload._id : nanoid();
      // console.log('_id:', _id);
      const { data } = await httpService.post(categoryEndPoint, {
         // _id,
         ...payload,
         userId
      });
      return data;
   },
   update: async (payload) => {
      const { data } = await httpService.patch(
         categoryEndPoint + payload._id,
         payload
      );
      return data;
   },
   remove: async (categoryId) => {
      const { data } = await httpService.delete(categoryEndPoint + categoryId);
      return data;
   }
};

export default categoryService;
