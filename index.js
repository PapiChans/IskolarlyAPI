/**
 * ================================================================
 * * myPUPQC API - index.js Configuration
 * ================================================================
 */

// % Import Important Modules
const express = require('express')
const dotenv = require('dotenv')
const {
    successMessage,
    failedMessage,
    syncSuccessMessage,
    syncFailedMessage,
} = require('./db_message')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const { userLogger } = require('./helpers/logger')

// % Reference Models
const db = require('./models')

// % Initialize Express
var app = express()

// % Express Shenanigans
// ? parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// ? parse requrests of content-type application/json
app.use(express.json())

// % .env config
dotenv.config()

// % PORT value
const PORT = process.env.PORT || 3600

// % Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    const { method, socket, url, hostname } = req
    const { remoteAddress, remoteFamily } = socket

    // ? you can check session here.
    userLogger.info(
        JSON.stringify(
            {
                method,
                remoteAddress,
                remoteFamily,
                hostname,
                url,
            },
            null,
            2
        )
    )

    next()
})

/**
 * ================================================================
 * * AUTHENTICATION-RELATED
 * ================================================================
 */

// Authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    // If token is null -> unauthorized response
    if (token == null) return res.status(401).send('No access token is detected.')
    // Verify the token, if not verified then forbidden
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        // If token is not verified -> send forbidden response
        if (err) {
            if (process.env.ENABLE_ACCESS_TOKEN_LOG === 'true') userLogger.error(`${err}\n`)
            return res.sendStatus(403)
        }
        // Save token data to req.user
        req.user = user
        if (process.env.ENABLE_ACCESS_TOKEN_LOG === 'true') userLogger.info('Access Granted\n')
        next()
    })
}

/**
 * ================================================================
 * * ROUTES
 * ================================================================
 */

// % Main API Route for EBASA API
const MAIN_API_ROUTE = '/mypupqc/v1/'

// % Home Route
app.use(`${MAIN_API_ROUTE}`, require('./routes/home.route'))

// % With Authentication
app.use(`${MAIN_API_ROUTE}super_admin`, authenticateToken, require('./routes/super_admin.route'))
app.use(`${MAIN_API_ROUTE}student`, authenticateToken, require('./routes/student.route'))
app.use(`${MAIN_API_ROUTE}pup_staff`, authenticateToken, require('./routes/staff.route'))

/**
 * ================================================================
 * * DATABASE
 * ================================================================
 */

db.sequelize
    .authenticate()
    .then(() => {
        // * Log the success db connection message

        if (process.env.ENABLE_DB_LOG === 'true') {
            userLogger.info(successMessage())
        }

        // * Sync models to the database
        db.sequelize
            .sync({ alter: process.env.SEQUELIZE_ALTER_SYNC === 'true' || false })
            .then(() =>
                app.listen(PORT, () =>
                    userLogger.info(
                        `${syncSuccessMessage(
                            PORT,
                            MAIN_API_ROUTE,
                            process.env.SEQUELIZE_ALTER_SYNC
                        )}`
                    )
                )
            )
            .catch(err => userLogger.error(`${syncFailedMessage(err)}\n`))
    })
    .catch(err => {
        userLogger.error(`${failedMessage(err)}\n`)
    })
