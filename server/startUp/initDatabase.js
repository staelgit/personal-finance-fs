const CashAccount = require('../models/CashAccount');
const Category = require('../models/Category');
const Operation = require('../models/Operation');
// const User = require('../models/User');

const cashAccountsMock = require('../mock/cashAccounts.json');
const categoriesMock = require('../mock/categories.json');
const operationsMock = require('../mock/operations.json');
// const usersMock = require('../mock/users.json');

module.exports = async () => {
   const cashAccounts = await CashAccount.find();
   if (cashAccounts.length !== cashAccountsMock.length) {
      await createInitialEntity(CashAccount, cashAccountsMock);
   }
   const category = await Category.find();
   if (category.length !== categoriesMock.length) {
      await createInitialEntity(Category, categoriesMock);
   }
   const operations = await Operation.find();
   if (operations.length !== operationsMock.length) {
      await createInitialEntity(Operation, operationsMock);
   }
   /*   const users = await User.find();
   if (users.length !== usersMock.length) {
      await createInitialEntity(User, usersMock);
   }*/
};

async function createInitialEntity(Model, data) {
   await Model.collection.drop();
   return Promise.all(
      data.map(async (item) => {
         try {
            delete item._id;
            const newItem = new Model(item);
            await newItem.save();
            return newItem;
         } catch (e) {
            return e;
         }
      })
   );
}
