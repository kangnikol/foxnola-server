import { MinecraftServer } from "mcping-js"

export default function handler(req, res) {
  const server = new MinecraftServer("FoxNola.aternos.me", 64523)

  server.ping(10000, -1, (err, response) => {
    if (err) {
      console.error("Ping Error:", err)
      return res
        .status(500)
        .json({ error: "Error pinging server", details: err.message })
    }
    res.json(response)
  })
}
