import express from 'express';
import * as dotenv from 'dotenv';
import {OpenAI} from 'openai'

dotenv.config()

const router=express.Router()

const openai=new OpenAI({apiKey: process.env.OPENAI_API_KEY});
router.route('/').get((req,res)=>{
    res.status(200).json({Message:"from dalle routes"})
})

router.route('/').post(async(req,res)=>{
    try{
        const {prompt}=req.body


        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: 'b64_json'
          });
         

        const image=response.data[0].b64_json;
 
        res.status(200).json({photo:image})
    }
    catch(err){

        if (err.status===400){
            return res.status(400).json({message:"Openai subscription is expeired"})
        }
        res.status(500).json({message:"something wrong"})
    }
})
export default router;