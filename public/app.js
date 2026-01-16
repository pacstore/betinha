async function send() {
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");

  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div class="user"><b>Você:</b><br>${text}</div>`;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    messages.innerHTML += `<div class="ai"><b>Betinha:</b><br>${data.reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  } catch {
    messages.innerHTML += `<div class="ai">Erro ao falar com o servidor.</div>`;
  }
}
