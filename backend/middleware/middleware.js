const cors = require('cors');
const bodyParser = require('body-parser');

const applyMiddleware = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
};

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};

module.exports = {
    applyMiddleware,
    errorHandler,
};
