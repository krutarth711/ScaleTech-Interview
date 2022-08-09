const router = require('express').Router();
const guards = require('../../helpers/guard');
const controller = require('./contacts.controller');

router.post('/create', guards.isAuthorized(), controller.create); // Create a contact
router.get('/', guards.isAuthorized(), controller.getContacts); // Get All contacts for a user
router.get('/delete/:id', guards.isAuthorized(), controller.delete); // Delete contact
router.put('/update/:id', guards.isAuthorized(), controller.update); // Update contact

module.exports = router;
