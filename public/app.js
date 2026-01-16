const messages = document.getElementById("messages");
const input = document.getElementById("input");
const form = document.getElementById("chat-form");

function addMessage(text, type) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${type}`;

  const author = document.createElement("div");
  author.className = "author";
  author.textContent = type === "user" ? "Você" : "Betinha";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  wrapper.appendChild(author);
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);

  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  input.style.height = "auto";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    if (!res.ok) throw new Error();

    addMessage(data.reply, "ai");
  } catch {
    addMessage("Erro ao falar com o servidor.", "ai");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});
