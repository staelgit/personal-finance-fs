const { Schema, model } = require('mongoose');

const schema = new Schema(
   {
      title: {
         type: String,
         required: true
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User'
      }
   },
   {
      timestamps: true
   }
);

module.exports = model('CashAccount', schema);
