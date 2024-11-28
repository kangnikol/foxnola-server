import { MinecraftServer } from "mcping-js"

const serverConfig = {
  address: "NgobrolSantai.aternos.me",
  port: 64523,
  timeout: 1000,
  protocolVersion: 768,
}

export default async function handler(req, res) {
  try {
    const server = new MinecraftServer(serverConfig.address, serverConfig.port)
    const response = await server.ping(
      serverConfig.timeout,
      serverConfig.protocolVersion
    )

    console.log("Ping Response:", response)
    res.json(response)
  } catch (err) {
    console.error("Ping Error:", err)
    res
      .status(500)
      .json({ error: "Error pinging server", details: err.message })
  }
}
