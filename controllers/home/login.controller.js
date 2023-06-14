/**
 * =====================================================================
 * * LOGIN CONTROLLER
 * =====================================================================
 * Controller for Login
 * =====================================================================
 */

// Import required packages
const db = require('../../models')
const { errResponse, emptyDataResponse } = require('../../helpers/controller.helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// env config
require('dotenv').config()

// Generate token
const generateToken = data => {
    return jwt.sign(data, process.env.SECRET_TOKEN, { expiresIn: '12h' })
}

// % Login
// % ROUTE: /mypupqc/v1/login
exports.login = (req, res) => {
    // Check if email and password field is empty
    if (String(req.body.user_no) === '' || String(req.body.password) === '') {
        return res.status(500).send({
            error: true,
            message: 'User Number and Password cannot be empty',
        })
    }

    console.log(req.body)

    db.User.findOne({
        where: { user_no: req.body.user_no, is_blacklist: false },
    })
        .then(data => {
            if (data == null) errResponse(res, 'That user does not exist or is not active.')
            else {
                bcrypt.compare(req.body.password, data.password, (err, hasResult) => {
                    // Display error if exists
                    if (err) console.log(err)

                    // If no result then send empty reponse
                    if (!hasResult) return errResponse(res, 'Invalid details or password')
                    else {
                        // Else send reponse with data
                        const user_id = data.user_id
                        const user_no = data.user_no
                        const user_type = data.user_type

                        db.UserRole.findAll({
                            where: { user_id: data.user_id },
                            include: [
                                {
                                    model: db.Role,
                                    attributes: ['role_id', 'role_name'],
                                    as: 'role_assigned_to_user',
                                },
                            ],
                        })
                            .then(data => {
                                let roles = []

                                data.forEach(user_role => {
                                    roles.push(user_role.role_assigned_to_user.role_name)
                                })

                                if (roles.length === 0) roles = null

                                res.send({
                                    error: false,
                                    data: {
                                        user_id: user_id,
                                        user_no: user_no,
                                        user_type: user_type,
                                        user_roles: roles,
                                        token: generateToken({
                                            user_id: user_id,
                                            user_no: user_no,
                                            user_type: user_type,
                                            user_roles: roles,
                                        }),
                                    },
                                    message: 'User Retrieved, Token Generated',
                                })
                            })
                            .catch(err => errResponse(res, err))
                    }
                })
            }
        })
        .catch(err => errResponse(res, err))
}
