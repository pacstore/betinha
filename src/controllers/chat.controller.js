export async function chat(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem vazia" });
    }

    const reply = await askAI(message);
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao falar com o servidor" });
  }
}
