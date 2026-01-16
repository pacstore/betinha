const form = document.getElementById("chat-form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🚫 impede reload

  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    addMessage("ai", data.reply || "Sem resposta da IA.");
  } catch (err) {
    addMessage("ai", "Erro ao falar com o servidor.");
  }
});

function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
