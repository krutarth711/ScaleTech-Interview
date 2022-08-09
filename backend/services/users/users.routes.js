const router = require('express').Router();
const guards = require('../../helpers/guard');
const controller = require('./users.controller');

router.post('/register', controller.register); // Register User
router.post('/login', controller.login); // Login User

module.exports = router;
