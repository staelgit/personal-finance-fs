const express = require('express');
const CashAccount = require('../models/CashAccount');
const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });

router
   .route('/')
   .get(auth, async (req, res) => {
      const userId = req.user._id;
      try {
         const list = await CashAccount.find({ userId });
         res.status(200).send(list);
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   })
   .post(auth, async (req, res) => {
      try {
         const newCashAccount = await CashAccount.create({
            ...req.body,
            userId: req.user._id
         });
         res.status(200).send(newCashAccount);
      } catch (e) {
         res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
         });
      }
   });

router
   .route('/:cashAccountId')
   .delete(auth, async (req, res) => {
      try {
         const { cashAccountId } = req.params;
         const removedCashAccount = await CashAccount.findById(cashAccountId);
         if (removedCashAccount.userId.toString() === req.user._id) {
            await removedCashAccount.remove();
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
         const { cashAccountId } = req.params;
         const receivedCashAccount = await CashAccount.findById(cashAccountId);
         if (receivedCashAccount.userId.toString() === req.user._id) {
            return res.send(receivedCashAccount);
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
         const { cashAccountId } = req.params;
         const updatedCashAccount = await CashAccount.findByIdAndUpdate(
            cashAccountId,
            req.body,
            {
               new: true
            }
         );
         if (updatedCashAccount.userId.toString() === req.user._id) {
            return res.send(updatedCashAccount);
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
