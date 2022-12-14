const express = require('express');
const Category = require('../models/Category');
const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });

router
   .route('/')
   .get(auth, async (req, res) => {
      const userId = req.user._id;
      try {
         const list = await Category.find({ userId });
         res.status(200).send(list);
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   })
   .post(auth, async (req, res) => {
      try {
         const newCategory = await Category.create({
            ...req.body,
            userId: req.user._id
         });
         res.status(200).send(newCategory);
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   });

router
   .route('/:categoryId')
   .delete(auth, async (req, res) => {
      try {
         const { categoryId } = req.params;
         const removedCategory = await Category.findById(categoryId);
         if (removedCategory.userId.toString() === req.user._id) {
            await removedCategory.remove();
            return res.send(null);
         } else {
            res.status(401).json({ message: 'Unauthorized' });
         }
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   })
   .get(auth, async (req, res) => {
      try {
         const { categoryId } = req.params;
         const receivedCategory = await Category.findById(categoryId);
         if (receivedCategory.userId.toString() === req.user._id) {
            return res.send(receivedCategory);
         } else {
            res.status(401).json({ message: 'Unauthorized' });
         }
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   })
   .patch(auth, async (req, res) => {
      try {
         const { categoryId } = req.params;
         const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            req.body,
            {
               new: true
            }
         );
         if (updatedCategory.userId.toString() === req.user._id) {
            return res.send(updatedCategory);
         } else {
            res.status(401).json({ message: 'Unauthorized' });
         }
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   });

module.exports = router;
