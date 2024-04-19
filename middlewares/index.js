//const fs = require("fs");
const fs = require('fs');

function logreqres(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
                // You might want to handle the error in a different way based on your application's needs
            }
            next(); // Call next regardless of whether there was an error or not
        });
    };
}

module.exports = {
    logreqres,
};

module.exports = {
    logreqres,
};