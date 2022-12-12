const { Schema, model } = require('mongoose');

const schema = new Schema(
   {
      type: {
         type: String,
         enum: ['income', 'expense']
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      },
      categoryId: {
         type: Schema.Types.ObjectId,
         ref: 'Category'
      },
      cashAccountId: {
         type: Schema.Types.ObjectId,
         ref: 'CashAccount'
      },
      comment: {
         type: String,
         required: true
      }
   },
   {
      timestamps: true
   }
);

module.exports = model('Operation', schema);
