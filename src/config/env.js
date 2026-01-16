import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  GROQ_API_KEY: process.env.GROQ_API_KEY
};

if (!ENV.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY não configurada");
  process.exit(1);
}
