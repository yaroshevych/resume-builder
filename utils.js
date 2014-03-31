module.exports = {
    errorHandler: function(res, callback) {
        return function(err, data) {
            if (err) {
                return res.json(400, {
                    message: err + ''
                });
            }

            return callback(data);
        };
    }
};
