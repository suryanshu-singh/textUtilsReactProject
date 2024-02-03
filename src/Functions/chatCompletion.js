const functions = require("firebase-functions");
const admin = require("firebase-admin");
const OpenAI = require("openai");
const express = require("express");
const app = express();
const functions = require('firebase-functions');
const cors = require('cors');
app.use(
    cors({
        origin: "*",
    })
);


if(admin.apps.length===0){
    admin.initializeApp();
}

exports.chatCompletion = functions.https.onCall(async(data,context)=>{
    const{prompt} = data;
    const OPENAI_API_KEY = "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";
    const openai = new OpenAI({apiKey:OPENAI_API_KEY})
    const aiModel = "gpt-3.5-turbo-1106"

    const messages = [
        {
            role:"system",
            content:"Helpful Assistant"
        },
        {
            role:"user",
            content:prompt
        }
    ]

    const completion = await openai.chat.completions.create({
        model: aiModel,
        messages:messages
    })

    const aiResponse = completion.choices[0].message.content
    return{
        aiResponse
    };
});