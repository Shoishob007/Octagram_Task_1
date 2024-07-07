const express = require('express');
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config();
const connectDB = require('./config/database');
const { applyMiddleware, errorHandler } = require('./middleware/middleware');

const app = express();

applyMiddleware(app);

app.use('/api', dataRoutes);
app.use(errorHandler);


connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`);
});
