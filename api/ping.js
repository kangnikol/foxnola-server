import { MinecraftServer } from "mcping-js"

export default function handler(req, res) {
  const server = new MinecraftServer("FoxNola.aternos.me", 64523)

  server.ping(4000, 768, (err, response) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error pinging server", details: err.message })
    }
    res.json(response)
  })
}
