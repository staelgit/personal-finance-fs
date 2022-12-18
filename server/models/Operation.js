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
      accountId: {
         type: Schema.Types.ObjectId,
         ref: 'CashAccount'
      },
      amount: {
         type: Number,
         required: true
      },
      comment: {
         type: String
      },
      date: {
         type: String,
         required: true
      }
   },
   {
      timestamps: true
   }
);

module.exports = model('Operation', schema);
