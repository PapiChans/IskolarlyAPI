const db = require('../../models')
const {
    checkAuthorization,
    dataResponse,
    errResponse,
    emptyDataResponse,
} = require('../../helpers/controller.helper')

// % View All Research Pending available in the database.
// % ROUTE: /mypupqc/v1/super_admin/iskolarly/
exports.viewResearchPending = (req, res, next) => {
    // Check if user logged in or logged in but not Admin
    let v = checkAuthorization(req, res, 'Super Admin')
    if (v != null) return v

    db.ResearchDetails.findAll({
        where: {
            research_status: 'Pending',
        },
    })
        .then(data => {
            dataResponse(res, data, 'A Record has been identified', 'No Record has been identified')
        })
        .catch(err => errResponse(res, err))
}

// % View Specific Research Pending available based on the [:user_id] parameter.
// % ROUTE: /mypupqc/v1/super_admin/research-records/:research_id
exports.viewSpecificResearchPending = (req, res, next) => {
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

// % Rejecting a Research Pending based on the [:research_id] parameter.
// % ROUTE: /mypupqc/v1/super_admin/research-pending/rejectResearch/:research_id
exports.rejectResearchPending = (req, res, next) => {
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
            if (data.research_status == 'Pending') {
                db.ResearchDetails.update(
                    {
                        research_remarks: req.body.research_remarks,
                        research_status: 'Pending',
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
                            'Research Reject Successfully.',
                            'Research Reject Failed.'
                        )
                    )
                    .catch(err => errResponse(res, err))
            }
            // Check if Research is Pending
            else {
                db.ResearchDetails.update(
                    {
                        research_status: 'Pending',
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

// % Rejecting a Research Pending based on the [:research_id] parameter.
// % ROUTE: /mypupqc/v1/super_admin/research-pending/approveResearch/:research_id
exports.approveResearchPending = (req, res, next) => {
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
            if (data.research_status == 'Pending') {
                db.ResearchDetails.update(
                    {
                        research_status: 'Approved',
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
                            'Research Approve Successfully.',
                            'Research Approve Failed.'
                        )
                    )
                    .catch(err => errResponse(res, err))
            }
            // Check if Research is Pending
            else {
                db.ResearchDetails.update(
                    {
                        research_status: 'Pending',
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