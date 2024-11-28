import { MinecraftServer } from "mcping-js"

export default async function handler(req, res) {
  try {
    const server = new MinecraftServer("NgobrolSantai.aternos.me", 64523)
    const response = await server.ping(1000, 768)
    res.json(response)
  } catch (err) {
    console.error("Ping Error:", err)
    res
      .status(500)
      .json({ error: "Error pinging server", details: err.message })
  }
}
