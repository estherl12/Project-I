const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');

router.route('/auth/login').post(authController.loginUser);
router.route('/auth/register/student').post(authController.registerUserStudent); //route for registering students
router.route('/auth/register/teacher').post(authController.registerUserTeacher); //route for registering teacher

module.exports = router;