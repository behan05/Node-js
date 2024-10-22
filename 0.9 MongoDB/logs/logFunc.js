//import fs to create Log file.
const fs = require("fs");
const path = require("path");

function createLog(req) {

    // Create date contractor for logs to know the requesting time and date.
    const currentTimeAndDate = new Date();

    // necessary data which should need to append on the log file.
    const logMessage = `Getting Request From ${req.url}: and the Current Time ${currentTimeAndDate.toLocaleTimeString()} Current Date ${currentTimeAndDate.toLocaleDateString()} Request IP ${req.ip} : Request Method ${req.method} \n`;

    // appending all required data into log file.
    fs.appendFile(path.join(__dirname, 'logs.txt'),

        // condition to check error which can be occure during data appending.
        logMessage, (err) => {
            if (err) {
                console.log(`Getting Error During Appending Log: `, err.message);
            }
        })
}

module.exports = createLog;