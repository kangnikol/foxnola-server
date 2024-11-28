import express from "express"
import { MinecraftServer } from "mcping-js"
import cors from "cors"

const app = express()
const PORT = 3001

app.use(cors())
app.get("/api/ping", (req, res) => {
  const server = new MinecraftServer("NgobrolSantai.aternos.me", 64523)

  server.ping(4000, 768, (err, response) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error pinging server", details: err.message })
    }
    res.json(response)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
