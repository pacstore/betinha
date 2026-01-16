const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type === "user" ? "user" : "ai";

  div.innerHTML = `<b>${type === "user" ? "Você" : "Betinha"}:</b>\n${text}`;

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    if (!res.ok) throw new Error();

    addMessage(data.reply || "Sem resposta.", "ai");
  } catch {
    addMessage("Erro ao falar com o servidor.", "ai");
  }
}

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
