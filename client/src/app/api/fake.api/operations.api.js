const operations = [
   {
      _id: '67rdca3eeb7f6fgeed471815',
      date: 1660743951490,
      typeOperation: 'income',
      cashAccountId: '67rdca3eeb7f6fgeed471818',
      categoryId: '67rdca3eeb7f6fgeed000001',
      comment: 'таки получил я зарплату'
   },
   {
      _id: '67rdca3eeb7f6fgeed471816',
      date: 1660743000001,
      typeOperation: 'expense',
      cashAccountId: '67rdca3eeb7f6fgeed471818',
      categoryId: '67rdca3eeb7f6fgeed888881',
      comment: 'купил какую то фигню... '
   }
];

const fetchAll = () =>
   new Promise((resolve) => {
      window.setTimeout(() => {
         resolve(operations);
      }, 1500);
   });

const getById = (id) =>
   new Promise((resolve) => {
      window.setTimeout(() => {
         resolve(operations.find((user) => user._id === id));
      }, 1000);
   });

export default {
   fetchAll,
   getById
};
