function logreqres(filename){
    return (req,res, next) => {
        console.log("hello from middleware 1");
    fs.appendFile(`log.txt`, `\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`, (err, data) => {
        next();
    });
    };
}

module.exports = {
    logreqres,
};