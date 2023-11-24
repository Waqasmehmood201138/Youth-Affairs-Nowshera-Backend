const router = require('express').Router();

const { registerController, loginController,contactController,getContactController } = require('../controllers/userController');

router.post('/register',registerController);

router.post('/login',loginController);
router.post('/post-message',contactController);
router.get('/get-message',getContactController);

module.exports = router;