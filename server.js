const express = require('express')
const app = express;
const PORT = process.env.PORT || 5000;
const Sequelize = require('sequelize');
const router = require('./src/router')
const db = require("./src/models")
db.sequelize.sync();


app.use('/gns', (req, res, next) => {
    next();
}, router);


app.listen(PORT,() =>{
    console.log(`App listening on port ${PORT}`)
})