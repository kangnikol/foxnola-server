import { MinecraftServer } from "mcping-js"

const serverConfig = {
  address: "NgobrolSantai.aternos.me",
  port: 64523,
  timeout: 1000,
  protocolVersion: 768,
}

export default function handler(req, res) {
  const server = new MinecraftServer(serverConfig.address, serverConfig.port)

  server.ping(
    serverConfig.timeout,
    serverConfig.protocolVersion,
    (err, response) => {
      if (err) {
        console.error("Ping Error:", err)
        return res
          .status(500)
          .json({ error: "Error pinging server", details: err.message })
      }

      console.log("Ping Response:", response)
      res.json(response)
    }
  )
}
