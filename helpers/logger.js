const { createLogger, format, transports } = require('winston')
const { combine, timestamp, prettyPrint, colorize, align, printf, splat } = format

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'blue',
        silly: 'white',
    },
}

const userLogger = createLogger({
    level: 'silly',
    levels: customLevels.levels,
    addColors: customLevels.colors,
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss',
        }),
        prettyPrint(),
        colorize(),
        align(),
        printf(info => {
            const { timestamp, level, message } = info
            const ts = timestamp
            return `\n${ts} [${level}]${message}`
        })
    ),
    transports: [
        new transports.Console({
            format: combine(
                splat(),
                colorize(),
                align(),
                printf(info => {
                    const { timestamp, level, message } = info
                    const ts = timestamp
                    return `\n${ts} [${level}]${message}`
                })
            ),
        }),
    ],
})

module.exports = {
    userLogger: userLogger,
}
