const express = require('express');

const commonRouter = require('./routes/common.route');
const categoryRouter = require('./routes/category.route');
const vendorRouter = require('./routes/vendor.route')
const productRouter = require('./routes/product.route');
const productSpecRouter = require('./routes/productSpec.route');
const galleryRouter = require('./routes/gallery.route');
const nocache = require('nocache');

const databaseConnection = require('./services/mongo.service');
const cors = require('cors');
const morgan = require('morgan');
const cms_app = express();
// --------------------------------------- database connection initialization
databaseConnection.dbConnect().then(() => {
    console.log('database connected');
});
cms_app.use(cors({
    origin:'*'
}));

cms_app.use(nocache());

cms_app.use(express.json());
// --------------------------------------- Use Morgan Package for log all http event
cms_app.use(morgan('combined'));
// --------------------------------------- Register all routes exist in API
cms_app.use('/common', commonRouter);
cms_app.use('/product', productRouter);
cms_app.use('/category', categoryRouter );
cms_app.use('/vendor', vendorRouter);
cms_app.use('/spec', productSpecRouter);
cms_app.use('/gallery', galleryRouter);

cms_app.get('/',(req, res)=>{
    res.status(200).send({
        ok : true
    })
})

module.exports = cms_app;