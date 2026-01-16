import fetch from "node-fetch";

export async function askAI(message) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Você é a Betinha, uma assistente profissional." },
          { role: "user", content: message }
        ]
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Groq error:", data);
    throw new Error("Erro na Groq");
  }

  return data.choices[0].message.content;
}
