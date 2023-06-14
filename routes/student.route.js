var router = require('express').Router()

/**
 * =====================================================================
 * * STUDENT ROUTES
 * =====================================================================
 */

// % ======================================================================
// % Info Controller - information related to the currently logged in user
// % ======================================================================
var infoController = require('../controllers/student/info.controller')
router.get('/info', infoController.getInfo)
router.patch('/info', infoController.updateInfo)
router.put('/info/change_password', infoController.changePassword)
router.get('/educ_profile', infoController.getEducProfile)
router.put('/educ_profile', infoController.updateEducProfile)

// % ======================================================================
// % Iskolarly My Submissions Controller - Student Research Submissions
// % ======================================================================
var mySubmissionsController = require('../controllers/student/iskolarly_my_submissions.controller')
router.get('/my-submissions', mySubmissionsController.viewMySubmissions)
router.get('/my-submissions/:research_id', mySubmissionsController.viewSpecificResearchRecords)
router.get('/my-submissions/remarks/:research_id', mySubmissionsController.viewSpecificResearchRemarks)
router.post('/my-submissions/add', mySubmissionsController.addMySubmissions)

// * Export Module to use in ../index.js
module.exports = router
