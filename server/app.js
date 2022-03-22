const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const productRouter = require('./routes/products/product.route');

const app = express();
app.use(helmet());
app.use(express.json());
// --------------------------------------- Use Morgan Package for log all http event
app.use(morgan('combined'));
// --------------------------------------- Register all routes exist in API
app.use('/products', productRouter);

app.get('/',(req, res)=>{
    res.status(200).send({
        ok : true
    })
})
module.exports = app;