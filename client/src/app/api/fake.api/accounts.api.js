const ACCOUNTS_URL = 'http://localhost:4000/cashAccounts';

const fetchAll = () =>
   new Promise((resolve) => {
      const response = fetch(ACCOUNTS_URL);
      const accounts = response.then((response) => response.json());
      resolve(accounts);
   });

const getById = (id) =>
   new Promise((resolve) => {
      const response = fetch(`${ACCOUNTS_URL}/${id}`);
      const accounts = response.then((response) => response.json());
      resolve(accounts);
   });

export default {
   fetchAll,
   getById
};
