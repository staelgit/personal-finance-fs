const tokenService = require('../services/token.service');
const config = require('config');

const isDemoUserDataEditable = config.get('isDemoUserDataEditable');
const demoUserId = config.get('demoUserId');

module.exports = (req, res, next) => {
   if (req.method === 'OPTIONS') {
      return next();
   }
   try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
         return res.status(401).json({ message: 'Unauthorized' });
      }

      const data = tokenService.validateAccess(token);

      if (!data) {
         return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = data;

      if (!isDemoUserDataEditable) {
         if (req.user._id === demoUserId) {
            if (req.method !== 'GET') {
               return res.status(401).json({
                  message: 'noDemoUserDataEdit'
               });
            }
         }
      }

      next();
   } catch (e) {
      res.status(401).json({ message: 'Unauthorized' });
   }
};
