import express from 'express';
const router = express.Router();

import { Acronym } from '../../models/acronym';

router.get('/acronym', async (req, res)=>{
    try{
        let from = req.query.from ? parseInt(req.query.from) : 50;
        let search = req.query.search ;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;

        let acronyms = await Acronym.fuzzySearch(search)
        .paginate({}, {offset: from, limit})
        .exec();
        
        console.log(acronyms);
        res.setHeader('hasMore', acronyms.hasNextPage);
        res.status(200).send(acronyms);
    }catch (err) {
        res.status(400).json({
            success: false,
            err,
          });
    }
});

router.route('/acronym/:acronym')
.get(async (req,res)=>{
    try{
        const {acronym} = req.params;

        const selectedAcronym = await Acronym.findOne({acronym});
        res.status(200).send(selectedAcronym);
    }catch (err){
        res.status(400).json({
            success: false,
            err,
          });
    }
})
.put(async(req,res)=>{
    try{
        const {acronym} = req.params;
        const data = req.body;

        const selectedAcronym = await Acronym.findOneAndUpdate({acronym},data,{
            new: true,
            upsert: true,
            returnOriginal: false
          });
        res.status(201).send(selectedAcronym);
    }catch (err){
        res.status(400).json({
            success: false,
            err,
          });
    }
})
.delete(async(req,res)=>{
    try{
        const {acronym} = req.params;
        const data = req.body;

        const selectedAcronym = await Acronym.deleteOne({acronym});
        res.status(200).send(selectedAcronym);
    }catch (err){
        res.status(400).json({
            success: false,
            err,
          });
    }
})

router.post('/acroym', async (req, res)=>{
    try {
        // {acronym: "****", definition: "*****"}
        const acronym = new Acronym(req.body);
        const result = await acronym.save();
        res.status(201).json({
            success: true,
            acronym: result,
        });
    }catch(err){
        res.status(400).json({
            success: false,
            err,
          });
    }
});




module.exports = router;