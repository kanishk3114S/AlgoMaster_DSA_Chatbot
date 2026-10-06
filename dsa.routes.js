import { Router } from "express";
import { chattingFn } from "./dsa.js";

export const router = Router();

//i have combined the router with the controllers//

router.post("/api/chat" , async(req,res)=>{
    try {
        
        const query = req.body.query || req.body.ques
        if (!query) {
            return res.status(400).json({error:"error aa gaya oyeee !!"})
        }

        const reply = await chattingFn(query);

        return res.json({reply}); //return json format string to the format//


    } catch (error) {
        
        console.log("chat error : " , error.message)
        return res.status(401).json({error: error.message})

    }
})