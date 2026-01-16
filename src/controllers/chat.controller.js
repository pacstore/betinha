import { askAI } from "../services/ai.service.js";

export async function chatController(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem vazia" });
    }

    const reply = await askAI(message);

    res.json({ reply });
  } catch (err) {
    console.error("Erro IA:", err.message);
    res.status(500).json({
      reply:
        "Houve um problema ao processar sua solicitação. Tente novamente."
    });
  }
}
