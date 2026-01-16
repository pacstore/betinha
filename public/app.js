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
    if (!res.ok) throw new Error(data.error);

    addMessage(data.reply, "ai");
  } catch {
    addMessage("Erro ao falar com o servidor.", "ai");
  }
}
