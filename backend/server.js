const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();

const { applyMiddleware } = require('./middleware/middleware');
applyMiddleware(app);

app.use('/api', dataRoutes);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`);
});
