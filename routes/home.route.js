var router = require('express').Router()
/**
 * =====================================================================
 * * HOME ROUTE
 * =====================================================================
 */

// % Login Controller
var loginController = require('../controllers/home/login.controller')
router.post('/login', loginController.login)

// * Export Module to use in ../index.js
module.exports = router
