import express from 'express'
const router = express.Router();

import Main from './controllers/index'
import Register from './controllers/register.controller'
import Login from  './controllers/login.controller'
import Users from  './controllers/users.controller'
/* GET home page. */
router.get('/', Main);
router.post('/register', Register);
router.post('/login', Login);
router.post('/users/:action', Users);


module.exports = router;