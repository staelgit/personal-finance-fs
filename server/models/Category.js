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
      },
      type: {
         type: String,
         enum: ['income', 'expense']
      }
   },
   {
      timestamps: true
   }
);

module.exports = model('Category', schema);
