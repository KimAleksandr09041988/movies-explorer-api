const userRouter = require('express').Router();

const auth = require('../middlewares/auth');
const {
  postProfile, me, login, signout, updateUser,
} = require('../controllers/users');
const { validateUpdateProfile, validateLogin, validateRegister } = require('../middlewares/validate');

userRouter.post('/signup', validateRegister, postProfile);
userRouter.post('/signin', validateLogin, login);
userRouter.use(auth);
userRouter.get('/users/me', me);
userRouter.get('/signout', signout);
userRouter.patch('/users/me', validateUpdateProfile, updateUser);

module.exports = userRouter;
