const express = require('express');
const bodyParser = require('body-parser');
const vendorRouter = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Vendor = require('../models/vendors');

vendorRouter.use(bodyParser.json());

vendorRouter.route('/')
/*.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})*/
.get((req,res,next)=>{
    //res.end('Will send all vendors to you!');
    Vendor.find({})
    .then((vendor)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','applocation/json');
        res.json(vendor);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser, (req,res,next)=>{
    //res.end('Will add the vendor: ' + req.body.name + ' with details: ' + req.body.description);
    Vendor.create(req.body)
    .then((vendor)=>{
        console.log('vendor created',vendor);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(vendor);
    },(err)=>next(err))
    .catch((err)=>next(err)); 
})
.put(authenticate.verifyUser, (req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /vendors');
})
.delete(authenticate.verifyUser, (req,res,next)=>{
    //res.end('Deleting all the vendors!');
    Vendor.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err)); 

});

vendorRouter.route('/:vendorId')
/*.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})*/
.get((req,res,next)=>{
    //res.end('Will send details of the vendor:'+req.params.vendorId+' to you!');
    Vendor.findById(req.params.vendorId)
    .then((vendor)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(vendor);
    },(err)=>next(err))
    .catch((err)=>next(err)); 
})
.post(authenticate.verifyUser, (req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation is not supported on /vendor/' + req.params.vendorId);
})
.put(authenticate.verifyUser, (req,res,next)=>{
    //res.write('Updating the vendor: '+req.params.vendorId+'\n');
    //res.end('Will update the vendor: ' + req.body.name + ' with details: ' + req.body.description);

    Vendor.findByIdAndUpdate(req.params.vendorId,{
        $set: req.body
    },{new:true})
    .then((vendor)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(vendor);
    },(err)=>next(err))
    .catch((err)=>next(err)); 
})
.delete(authenticate.verifyUser, (req,res,next)=>{
    //res.end('Deleting vendor: ' + req.params.vendorId);
    Vendor.findByIdAndRemove(req.params.vendorId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err)); 
}); 

module.exports = vendorRouter;