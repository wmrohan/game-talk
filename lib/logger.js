
const path = require("path");
const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const responseType = require("../common/static.json");

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }
const level = process.env.LOG_LEVEL || "debug";

function formatParams(info) {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace("T", " ");

    return `${ts} ${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, "", "")
        : ""}`;
}

const developmentFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
);

const productionFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
);

let logger;
const logDirectory = "logs";
const fileDatePattern = "YYYY-MM-DD";

if (process.env.NODE_ENV === "production") {
    logger = createLogger({
        level: level,
        format: developmentFormat,
        transports: [
            new transports.File({ filename: "logs/error.log", level: "error" }),
            new transports.File({ filename: "logs/combined.log" })
        ]
    });

} else {
    logger = createLogger({
        level: responseType.LOGGER.INFO,
        format: productionFormat,
        transports: [
            
            new DailyRotateFile({
                filename: path.join(logDirectory, "errors-%DATE%.log"),
                datePattern: fileDatePattern,
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
                level: responseType.LOGGER.ERROR
            }),
            new DailyRotateFile({
                filename: path.join(logDirectory, "successes-%DATE%.log"),
                datePattern: fileDatePattern,
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d",
            }),
        ]
    });
}


module.exports = logger;