import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chat.routes.js";
import { ENV } from "./config/env.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", chatRoutes);

app.get("/health", (_, res) => {
  res.send("Betinha está online 🚀");
});

app.listen(ENV.PORT, () => {
  console.log(`🔥 Betinha rodando na porta ${ENV.PORT}`);
});
