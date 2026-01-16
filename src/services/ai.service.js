import fetch from "node-fetch";
import { ENV } from "../config/env.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

export async function askAI(message, history = []) {
  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ENV.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "Você é a Betinha, uma assistente inteligente focada em programação, raciocínio lógico e solução de problemas. Responda de forma clara, profissional e objetiva."
        },
        ...history,
        { role: "user", content: message }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
