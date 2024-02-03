import { useState } from "react"
const { OpenAI } = require("openai");

const OPENAI_API_KEY = "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";
const ChatbotApp = () => {
  const openai = new OpenAI({apiKey:OPENAI_API_KEY,dangerouslyAllowBrowser: true} )
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const aiModel = "gpt-3.5-turbo-1106";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        model: aiModel,
        messages:messages
    })

    const aiResponse = completion.choices[0].message.content
    console.log("The response received is:"+aiResponse);
      // const result = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: prompt,
      //   temperature: 0.5,
      //   max_tokens: 4000,
      // });
      //console.log("response", aiResponse.data.choices[0].text);
      setApiResponse(aiResponse);
    } catch (e) {
      console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: '100vh',
        }}
      >
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={prompt}
            placeholder="Please ask to openai"
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            disabled={loading || prompt.length === 0}
            type="submit"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
      {apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre>
            <strong>API response:</strong>
            {apiResponse}
          </pre>
        </div>
      )}
    </>
  );
};


export default ChatbotApp;