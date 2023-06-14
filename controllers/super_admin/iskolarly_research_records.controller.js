const db = require('../../models')
const {
    checkAuthorization,
    dataResponse,
    errResponse,
    emptyDataResponse,
} = require('../../helpers/controller.helper')

// % View All Research Records available in the database.
// % ROUTE: /mypupqc/v1/super_admin/research-records/
exports.viewResearchRecords = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Super Admin')
    if (v != null) return v

    db.ResearchDetails.findAll({
        where: {
            research_status: 'Approved',
        },
    })
        .then(data => {
            dataResponse(res, data, 'A Record has been identified', 'No Record has been identified')
        })
        .catch(err => errResponse(res, err))
}

// % View Specific Research Records available based on the [:research_id] parameter.
// % ROUTE: /mypupqc/v1/super_admin/research-records/:research_id
exports.viewSpecificResearchRecords = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Super Admin')
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

// % Deactivate a Research Record based on the [:research_id] parameter.
// % ROUTE: /mypupqc/v1/super_admin/research-records/deleteResearch/:research_id
exports.deleteResearchRecords = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Super Admin')
    if (v != null) return v

    db.ResearchDetails.findOne({
        where: {
            research_id: req.params.research_id,
        },
    })
        .then(data => {
            // Check if user is Active or is_blacklist=false
            if (data.research_status == 'Approved') {
                db.ResearchDetails.update(
                    {
                        research_status: 'Deleted',
                    },
                    {
                        where: {
                            research_id: req.params.research_id,
                        },
                    }
                )
                    .then(data =>
                        dataResponse(
                            res,
                            data,
                            'Research Delete Successfully.',
                            'Research Delete Failed.'
                        )
                    )
                    .catch(err => errResponse(res, err))
            }
            // Check if user is Inactive or is_blacklist=true
            else {
                db.ResearchDetails.update(
                    {
                        research_status: 'Approve',
                    },
                    {
                        where: {
                            research_id: req.params.research_id,
                        },
                    }
                )
                    .then(data =>
                        dataResponse(
                            res,
                            data,
                            'Research Updated Sucessfully',
                            'Research Updated Failed'
                        )
                    )
                    .catch(err => errResponse(res, err))
            }
        })
        .catch(err => errResponse(res, err))
}