/**
 * ============================================================================
 * * CONTROLLER HELPERS
 * ----------------------------------------------------------------------------
 * This are custom-defined methods used for eliminating repetitive blocks of
 * code in controller files
 *
 * @author PrensDev
 * @usedby MYPUPQC API :D - salamat po
 * ============================================================================
 */

const { userLogger } = require('../helpers/logger')

/**
 * Check the authorization of the user
 *
 * @param {*} req - throw the request parameter here
 * @param {*} res - throw the response parameter here
 * @param {*} userType - set the type of user that is authorized only
 * @returns
 */
exports.checkAuthorization = (req, res, userType) => {
    // Check if userType param is null
    if (userType == null) {
        userLogger.error('`user_type` parameter is required -> sending 500 response.')
        return res.status(500).send('`user_type` parameter is required')
    }

    // Check if userType param has valid value
    const validUserType =
        userType === 'Super Admin' || userType === 'Student' || userType === 'PUP Staff'

    // Validate userType parameter
    if (!validUserType) {
        userLogger.error('The value for `user_type` parameter is invalid -> sending 500 response.')
        return res.status(500).send('The value for `user_type` parameter is invalid')
    }

    // Check if user is not authorized
    if (!(req.user != null && req.user.user_type === userType)) {
        userLogger.error('Oops! You are unauthorized to view your request -> sending 403 response.')
        return res.status(403).send('Oops! You are unauthorized to view your request')
    }

    return null
}

/**
 * This will return an internal server error (500) response.
 * Commonly called in catch promise to return error message
 *
 * @param {*} res - throw the response parameter here
 * @param {*} err - throw the error parameter here from catch() or set a custom error message
 * @returns
 */
exports.errResponse = (res, err) => {
    userLogger.error(`{
        error: true,
        message: ${err},
        log_message: "Sending 500 response."
    }`)
    return res.status(500).send({
        error: true,
        message: `${err}`,
    })
}

/**
 * This will return an OK (200) response regardless if doesn't have data.
 *
 * @param {*} res - throw the response parameter here
 * @param {*} data - set the data object here
 * @param {*} withDataMsg - set a custom message here if has data
 * @param {*} nullDataMsg - set a custom message here if no data
 * @returns
 */
exports.dataResponse = (res, data, withDataMsg, nullDataMsg) => {
    // If no data return empty response
    // ? data.length === 0
    if (data == null) {
        userLogger.info(`{
            error: false,
            data: [],
            message: ${nullDataMsg},
            statusCode: ${res.statusCode},
            log_message: "Empty data is sent but still sending 200 response.",
        }`)
        return res.send({
            error: false,
            data: [],
            message: nullDataMsg,
        })
    }
    userLogger.info(`{
        error: false,
        data: ${data},
        message: ${withDataMsg},
        statusCode: ${res.statusCode},
        log_message: "Sending 200 response."
    }`)
    // else return response with data
    return res.send({
        error: false,
        data: data,
        message: withDataMsg,
    })
}

/**
 * This is used for empty data responses
 * This will return an OK (200) response with custom message.
 *
 * @param {*} res - throw the response parameter here
 * @param {*} message - set a custom message here for empty data
 * @returns
 */
exports.emptyDataResponse = (res, message) => {
    userLogger.info(`{
        error: false,
        message: ${message},
        statusCode: ${res.statusCode},
        log_message: "Sending 200 response but there is no data to be sent."
    }`)
    return res.send({
        error: false,
        message: message,
    })
}
