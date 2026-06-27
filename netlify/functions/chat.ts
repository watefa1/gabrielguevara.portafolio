import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { promises as fs } from "fs";
import path from "path";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  const { message } = JSON.parse(event.body || "{}");

  if (!message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Message is required" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }

  try {
    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "NVIDIA_API_KEY is not set" }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
    }

    const profilePath = path.join(__dirname, "data/profile.json");
    const profileData = await fs.readFile(profilePath, "utf-8");
    const profile = JSON.parse(profileData);

    const systemPrompt = `
You are an AI assistant for Gabriel Guevara''s portfolio.
Your only purpose is to answer questions about Gabriel''s professional profile based on the provided JSON data.

**Rules:**
- Answer only questions related to the portfolio.
- Use only information available in the provided JSON data.
- Be professional and concise.
- Never fabricate information.
- Recommend relevant projects when appropriate.
- Explain technologies in the context of Gabriel''s experience.
- If the requested information does not exist inside the knowledge base, respond with: "I couldn''t find that information in Gabriel''s portfolio."

**Out of Scope:**
Politely refuse questions about:
- Politics
- Medical advice
- Legal advice
- Personal opinions
- General programming unrelated to Gabriel
- Current events

**Tone:**
- Friendly
- Professional
- Helpful
- Honest
- Concise

**Portfolio Data:**
${JSON.stringify(profile, null, 2)}
`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama3-8b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        temperature: 0.2,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`NVIDIA API request failed with status ${response.status}`);
    }

    const completion = await response.json();
    const assistantMessage = completion.choices[0]?.message?.content || "Sorry, I couldn''t generate a response.";

    return {
      statusCode: 200,
      body: JSON.stringify({ message: assistantMessage }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while processing your request." }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};

export { handler };


