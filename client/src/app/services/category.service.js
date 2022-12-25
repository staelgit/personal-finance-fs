import httpService from './http.service';

const categoryEndPoint = 'category/';

const categoryService = {
   get: async () => {
      const { data } = await httpService.get(categoryEndPoint);
      return data;
   },
   create: async (payload, userId) => {
      const { data } = await httpService.post(categoryEndPoint, {
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
