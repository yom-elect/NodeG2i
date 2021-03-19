import express from 'express';
const router = express.Router();

import { Acronym } from '../../models/acronym';


router.get('/:count?', async (req,res)=>{
    try{
        const {count} = req.params;

        const selectedAcronym = await Acronym.findRandom({},{}, {limit:count});
        res.status(200).json({data: selectedAcronym, success: true});
    }catch(err){
        res.status(400).json({
            success: false,
            err,
        });
    }
});

module.exports = router;