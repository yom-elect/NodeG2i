import express from 'express';
const router = express.Router();

import cryptoToken from '../../utils/token';
import { Acronym } from '../../models/acronym';
import {auth} from '../../middlewares/auth';


router.get('/generateToken', (req,res)=>{
    const token = cryptoToken();
    res.cookie("w_auth", token).status(200).json({
        loginSuccess: true,
    });
})

router.get('/acronym', async (req, res)=>{
    try{
        let from = req.query.from ? parseInt(req.query.from) : 50;
        let search = req.query.search ?? ""  ;
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;

        const [acronyms, itemCount] = await Promise.all([
            Acronym.fuzzySearch(search).limit(limit).skip(from).lean().exec(),
            Acronym.count({})
        ]);
        
        const pageCount = Math.ceil((itemCount - from)/ limit);

        res.status(200).json({
            data: acronyms,
            success: true,
            has_more: pageCount > 1 ? true : false
        });
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

        const selectedAcronym = await Acronym.findOne({acronym},'acronym');
        res.status(200).json({
            data: selectedAcronym,
            success: true
        });
    }catch (err){
        res.status(400).json({
            success: false,
            err,
          });
    }
})
.put(auth, async(req,res)=>{
    try{
        const {acronym} = req.params;
        const data = req.body;

        const selectedAcronym = await Acronym.findOneAndUpdate({acronym},data,{
            new: true,
            upsert: true,
            returnOriginal: false,
            useFindAndModify: false
          });
        res.status(201).send({data: selectedAcronym, success: true});
    }catch (err){
        res.status(400).json({
            success: false,
            err,
          });
    }
})
.delete(auth, async(req,res)=>{
    try{
        const {acronym} = req.params;

        const deletedAcronym = await Acronym.deleteOne({acronym});
        res.status(200).send(deletedAcronym);
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
            data: result,
        });
    }catch(err){
        res.status(400).json({
            success: false,
            err,
          });
    }
});




module.exports = router;