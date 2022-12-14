const express = require('express');
const Operation = require('../models/Operation');
const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });

router
   .route('/')
   .get(auth, async (req, res) => {
      const userId = req.user._id;
      try {
         const list = await Operation.find({ userId });
         res.status(200).send(list);
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   })
   .post(auth, async (req, res) => {
      try {
         const newOperation = await Operation.create({
            ...req.body,
            userId: req.user._id
         });
         res.status(200).send(newOperation);
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   });

router
   .route('/:operationId')
   .delete(auth, async (req, res) => {
      try {
         const { operationId } = req.params;
         const removedOperation = await Operation.findById(operationId);
         if (removedOperation.userId.toString() === req.user._id) {
            await removedOperation.remove();
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
         const { operationId } = req.params;
         const receivedOperation = await Operation.findById(operationId);
         if (receivedOperation.userId.toString() === req.user._id) {
            return res.send(receivedOperation);
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
         const { operationId } = req.params;
         const updatedOperation = await Operation.findByIdAndUpdate(
            operationId,
            req.body,
            {
               new: true
            }
         );
         if (updatedOperation.userId.toString() === req.user._id) {
            return res.send(updatedOperation);
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
