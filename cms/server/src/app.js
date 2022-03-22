const express = require('express');
const categoryRouter = require('./routes/category.route');
const morgan = require('morgan');
const cms_app = express();
cms_app.use(express.json());
// --------------------------------------- Use Morgan Package for log all http event
cms_app.use(morgan('combined'));
// --------------------------------------- Register all routes exist in API
cms_app.use('/category', categoryRouter );

cms_app.get('/',(req, res)=>{
    res.status(200).send({
        ok : true
    })
})

module.exports = cms_app;