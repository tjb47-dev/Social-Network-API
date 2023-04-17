// Require the necessary packages
const express = require('express');
const db = require('./config/connection')
const routes = require('./routes');
// Set up the Express app
const PORT = process.env.PORT || 3001;
const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);
// Connect to the Mongo DB
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});