const express = require('express');
const dataCollection = require('../model/learn');


const router = express.Router();

router.get('/data', async (req, res) => {
    try {
        let query = req.query;
        let data = await dataCollection.find(query);
        res.json({confirmation:true, message:'success', data: data});
    }
    catch(err) {
        console.log(err)
    }
})

router.post('/add', async (req, res) => {
    const result = await dataCollection.create(req.body);
    res.json({
        message:'done',
        data:result
    })
})


router.get('/data/update', async (req, res) => {
    //WHEN USING QUERY METHOD
    try{
        const query = req.query;
        console.log(query)
        const dataId = query.id;
        const updatedElem = await dataCollection.findByIdAndUpdate(dataId, query, {new:true})
        res.json({message:'updated', data: updatedElem})
    }
    catch(err){

    }
})

router.get('/data/update/:id', async (req, res) => {
    //WHEN USING Normal ID METHOD
    try{
        const data = req.body;
        console.log(data)
        const dataId = req.params.id;
        const updatedElem = await dataCollection.findByIdAndUpdate(dataId, data, {new:true})
        res.json({message:'updated', data: updatedElem})
    }
    catch(err){

    }
})

router.get('/data/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let data = await dataCollection.findById(id);
        res.json({message:'success', data: data})
    }
    catch(err) {

    }
})


module.exports = router;