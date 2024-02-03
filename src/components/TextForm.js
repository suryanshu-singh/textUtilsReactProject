import React, {useState} from 'react'
//import { getFunctions,httpsCallable} from "firebase/functions";
//import {app} from "../firebase.js";
const { OpenAI } = require("openai");

const OPENAI_API_KEY = "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";

//var db = firebase.firestore();

export default function TextForm(props) {
    let numWords =0;
    const openai = new OpenAI({apiKey:OPENAI_API_KEY,dangerouslyAllowBrowser: true} )
  const [apiResponse, setApiResponse] = useState("");
  const aiModel = "gpt-3.5-turbo-1106";
    const [text, setText] = useState("");
    const [fetching,setFetching] = useState(false);
    const messages = [
        {
            role:"system",
            content:"Helpful Assistant"
        },
        {
            role:"user",
            content:text
        }
    ]
    const handleUpClick = ()=>{
        console.log("Uppercase button was clicked.");
        setText(text.toUpperCase());
        props.showAlert("Uppercase converted","success");
    }
    const handleLoClick = ()=>{
        console.log("Lowercase button was clicked.");
        setText(text.toLowerCase());
    }
    const handleOnChange = (event)=>{
        console.log("On Change.");
        setText(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFetching(true);
        try {
          const completion = await openai.chat.completions.create({
            model: aiModel,
            messages:messages
        })
    
        const aiResponse = completion.choices[0].message.content
        console.log("The response received is:"+aiResponse);
        props.showAlert("AI Response generated successfully!!","success");
          setApiResponse(aiResponse);
        } catch (e) {
          console.log(e);
          props.showAlert("Unable to generate AI response at the moment, conatct system admin.","error");
          setApiResponse("Something is going wrong, Please try again.");
        }
        finally{
                    setFetching(false)
                }
      };
    // const handleSubmit = async()=>{
    //     console.log("Inside handleSubmit method");
    //     const functions = getFunctions();
    //     //console.log(functions.getFunctions.chatCompletion);
    //     console.log("What functions are there:"+functions);
    //     const chatCompletion = httpsCallable(functions,'chatCompletion')
    //     //const chatCompletion1 = httpsCallable(functions,'chatCompletion')
    //     try{
    //         console.log("Inside try block");
    //         const data = {
               
    //             text
    //         }
    //         console.log(data);
    //         setFetching(true)
    //         const result = await chatCompletion(data);
    //         console.log(result);
    //         setOutput(result.data.aiResponse);
    //         setText(result.data.aiResponse);
    //     }
    //     catch(error){
    //         console.log("The error is:"+error);
    //     } finally{
    //         setFetching(false)
    //     }
    // }
    const countWords = (text)=>{
        if(text===""){
            numWords = text.split(" ").length-1;
        }
        else{
           numWords =  text.split(" ").length;
        }
        return numWords;
        }
        return (
            <>
            <div className="container">
                <h1>{props.heading}</h1>
                <textarea className="form-control" id="myBox" value={text} onChange={handleOnChange} rows="13" column = "100"></textarea>
                <br/>
                <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-2" onClick={handleSubmit} disabled={fetching}>{fetching?'Fetching AI Response':'Submit AI Prompt'}</button>
            </div>
            <div className="container my-2">
                <h1>Your text summary</h1>
                <p> {countWords(text)} words and {text.length} characters</p>
                <p> {0.025*text.split(" ").length} minutes read</p>
                <h2>AI Response</h2>
                {/* {text} */}
                {apiResponse}
            </div>
            </>
    )
}
