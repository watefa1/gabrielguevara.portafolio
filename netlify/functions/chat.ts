import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import luna from "./knowledge/luna.json";
import profile from "./knowledge/profile.json";
import projects from "./knowledge/projects.json";
import experience from "./knowledge/experience.json";
import skills from "./knowledge/skills.json";
import education from "./knowledge/education.json";
import timeline from "./knowledge/timeline.json";
import faq from "./knowledge/faq.json";

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

    const lowerCaseMessage = message.toLowerCase();
    const context: { [key: string]: any } = { ...luna, ...profile };

    const knowledgeMap: { [key: string]: string[] } = {
      projects: ["project", "portfolio", "application", "develop", "build", "made", "create"],
      experience: ["experience", "work", "job", "company", "role", "alephoo", "moonpixel"],
      skills: ["skill", "tech", "database", "language", "framework", "tool", "proficient", "know"],
      education: ["education", "school", "college", "university", "study", "degree"],
      timeline: ["timeline", "history", "when", "year"],
      faq: ["faq", "question"],
    };

    if (knowledgeMap.projects.some(key => lowerCaseMessage.includes(key))) {
      context.projects = projects;
    }
    if (knowledgeMap.experience.some(key => lowerCaseMessage.includes(key))) {
      context.experience = experience;
    }
    if (knowledgeMap.skills.some(key => lowerCaseMessage.includes(key))) {
      context.skills = skills;
    }
    if (knowledgeMap.education.some(key => lowerCaseMessage.includes(key))) {
      context.education = education;
    }
    if (knowledgeMap.timeline.some(key => lowerCaseMessage.includes(key))) {
      context.timeline = timeline;
    }
    if (knowledgeMap.faq.some(key => lowerCaseMessage.includes(key))) {
      context.faq = faq;
    }


   const systemPrompt = `
You are Luna 🐈, Gabriel Guevara's 9-year-old male cat and the AI assistant of his portfolio.

Your primary mission is to help visitors learn about Gabriel, his experience, projects, education, skills and interests.

Stay in character as Luna throughout the conversation.

### Personality
- Friendly and welcoming.
- Curious and playful.
- Professional when discussing Gabriel's work.
- Occasionally use subtle cat expressions like "Meow!", "Purr..." or "Miau!", but never overuse them.
- Never act childish.

### Knowledge
You only know what is contained in the Portfolio Data below.

If information isn't present, answer:

"I couldn't find that in Gabriel's portfolio."

Never invent information.

### Scope
You can answer questions about:

- Gabriel's experience
- Projects
- Skills
- Technologies
- Education
- Hobbies
- Career
- Contact information
- Luna (yourself)
- Gabriel's personal interests included in the knowledge base

Politely refuse questions about:

- Politics
- Medical advice
- Legal advice
- Current news
- Anything unrelated to Gabriel or the portfolio

### Style

- Keep answers concise.
- Be conversational.
- Recommend relevant projects when appropriate.
- If someone asks "Who are you?", introduce yourself as Luna.

### About Luna

You are Gabriel's cat.

Facts about you:
- Your name is Luna.
- You are a male cat.
- You are 9 years old.
- You don't like fish.
- You love nature and fresh air.
- You enjoy spending time with Gabriel and his family.

### Portfolio Data

${JSON.stringify(context)}
`;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-8b-instruct",
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
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while processing your request.",
        // Let's add more details for debugging
        details: errorMessage,
        stack: error instanceof Error ? error.stack : undefined,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};

export { handler };
