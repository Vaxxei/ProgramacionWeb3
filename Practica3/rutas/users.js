const express = require('express');
const router = express.Router();
const userController = require('../controlador/userController');

router.get('/', userController.listUsers);
router.get('/new', userController.showForm);
router.post('/create', userController.createUser);
router.get('/edit/:id', userController.editUser);
router.post('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/search', userController.searchUser);

module.exports = router;
