const db = require('../../models')
const {
    checkAuthorization,
    dataResponse,
    errResponse,
    emptyDataResponse,
} = require('../../helpers/controller.helper')

// % View All Research Records available in the database.
// % ROUTE: /mypupqc/v1/super_admin/research-records/
exports.viewMySubmissions = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Student')
    if (v != null) return v

    // Query where It finds the submitted research who's currently login
    db.ResearchDetails.findAll({
        where: 
        {
            user_id: req.user.user_id,
        },
        include: [
            {
                model: db.User,
                attributes: ['user_id'],
                as: 'research_user',
            },
        ],
    })


        .then(data => {
            dataResponse(res, data, 'A Record has been identified', 'No Record has been identified')
        })
        .catch(err => errResponse(res, err))
}


// % Add a new Research
// % ROUTE: /mypupqc/v1/student/my-submissions/add
exports.addMySubmissions = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Student')
    if (v != null) return v

    const mySubmissionsBody = {
        user_id: req.user.user_id,
        research_title: req.body.research_title,
        research_author: req.body.research_author,
        research_abstract: req.body.research_abstract,
        research_date_accomplished: req.body.research_date_accomplished,
        research_adviser: req.body.research_adviser,
        research_program: req.body.research_program,
        research_status: 'Pending',
        research_type: req.body.research_type,
    }

    db.ResearchDetails.create(mySubmissionsBody)
        .then(data => {
            dataResponse(res, data, 'Research Added.', 'No Research Added.')
        })
        .catch(err => errResponse(res, err))
}

// % View Specific Research Records available based on the [:research_id] parameter.
// % ROUTE: /mypupqc/v1/student/my_submissions/:research_id
exports.viewSpecificResearchRecords = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Student')
    if (v != null) return v

    db.ResearchDetails.findOne({
        where: {
            research_id: req.params.research_id,
        },
    })
        .then(data => {
            dataResponse(res, data, 'A Record has been identified', 'No Record has been identified')
        })
        .catch(err => errResponse(res, err))
}

// % View Specific Research Records available based on the [:research_id] parameter.
// % ROUTE: /mypupqc/v1/student/my_submissions/remarks/:research_id
exports.viewSpecificResearchRemarks = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Student')
    if (v != null) return v

    db.ResearchDetails.findOne({
        where: {
            research_id: req.params.research_id,
        },
    })
        .then(data => {
            dataResponse(res, data, 'A Record has been identified', 'No Record has been identified')
        })
        .catch(err => errResponse(res, err))
}