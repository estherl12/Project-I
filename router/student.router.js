const express = require("express");
const router = express.Router();
const studentController = require('../controller/student.controller');
const { verifyUser } = require("../middleware/validateTokenHandler");
const roleValidation = require("../middleware/roleBasedValidation")

router.route('/').get(verifyUser,roleValidation.restrict("student","admin","teacher"),studentController.getStudents).post(verifyUser,roleValidation.restrict("student","admin"),studentController.createOne);
router.route('/:id').get(verifyUser,roleValidation.restrict("student","admin","teacher"),studentController.getById).patch(verifyUser,roleValidation.restrict("student","admin"),studentController.updateOne);

module.exports = router;