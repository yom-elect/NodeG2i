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

        const acronyms = await Acronym.fuzzySearch(search)
         .limit(limit)
        .skip(from)
        .exec();
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
        res.status(201).send(selectedAcronym);
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