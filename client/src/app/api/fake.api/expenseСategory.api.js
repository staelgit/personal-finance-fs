const expenseCategory = [
   { _id: '67rdca3eeb7f6fgeed888881', name: 'Кафе и рестораны' },
   { _id: '67rdca3eeb7f6fgeed888882', name: 'Продукты' },
   { _id: '67rdca3eeb7f6fgeed888883', name: 'Здоровье и фитнес' }
];

const fetchAll = () =>
   new Promise((resolve) => {
      window.setTimeout(() => {
         resolve(expenseCategory);
      }, 1000);
   });

const getById = (id) =>
   new Promise((resolve) => {
      window.setTimeout(() => {
         resolve(expenseCategory.find((category) => category._id === id));
      }, 1000);
   });

export default {
   fetchAll,
   getById
};
