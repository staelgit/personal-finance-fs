const incomeCategory = [
   { _id: '67rdca3eeb7f6fgeed000001', name: 'Зарплата' },
   { _id: '67rdca3eeb7f6fgeed000002', name: 'Проценты от вклада в банке' },
   { _id: '67rdca3eeb7f6fgeed000003', name: 'Деньги полученные в подарок' }
];

const fetchAll = () =>
   new Promise((resolve) => {
      window.setTimeout(() => {
         resolve(incomeCategory);
      }, 1000);
   });

const getById = (id) =>
   new Promise((resolve) => {
      window.setTimeout(() => {
         resolve(incomeCategory.find((category) => category._id === id));
      }, 1000);
   });

export default {
   fetchAll,
   getById
};
