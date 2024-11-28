// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"
import axios from "axios"
import Loading from "./Loading"
import Error from "./Error"

const Ping = () => {
  const [serverData, setServerData] = useState({
    version: null,
    players: { online: 0, max: 20, sample: [] },
  })

  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await axios.get("/api/ping")
        setServerData(response.data)
      } catch (err) {
        console.error("Error fetching server data:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchServerData()
  }, [])

  const handleCopyText = () => {
    const copyText = "NgobrolSantai.aternos.me:64523"
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      })
      .catch((err) => console.error("Error copying text:", err))
  }

  if (error) return <Error message={error} />
  if (loading) return <Loading />

  return (
    <div className="flex items-center justify-center h-screen bg-base text-text">
      <div className="bg-surface0 p-6 rounded-lg w-3/4 shadow-md">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-xl lg:text-2xl font-bold text-yellow">
            Ngobrol Santai Minecraft Server
          </h1>
          <p className="text-xs lg:text-sm text-surface2">
            A Minecraft server that allows crossplay between Java and Bedrock
            editions (including Pocket Edition).
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-yellow">Server Status</h2>
            <div className="flex gap-4">
              {serverData?.favicon ? (
                <img
                  src={serverData.favicon}
                  alt="Server Favicon"
                  className="w-16 h-16 rounded-lg"
                />
              ) : (
                <div className="w-16 h-16 bg-surface2 rounded-full"></div>
              )}

              <div className="flex flex-col text-xs lg:text-lg">
                <p>
                  <strong>IP:</strong> NgobrolSantai.aternos.me:64523{" "}
                  <button onClick={handleCopyText} aria-label="Copy server IP">
                    {copied ? (
                      <span className="text-yellow animate-fade text-xs">
                        ✔ Copied!
                      </span>
                    ) : (
                      <ion-icon name="copy-outline"></ion-icon>
                    )}
                  </button>
                </p>
                <p>
                  <strong>Status: </strong>
                  <strong
                    className={serverData.version ? "text-green" : "text-red"}
                  >
                    {serverData.version?.name
                      ? serverData.version.name
                      : "Offline! Contact the server admin."}
                  </strong>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="https://discord.gg/ngobrolsantai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-2 bg-yellow text-base rounded-md font-semibold">
                  Join Discord!
                </button>
              </a>
              <a
                href="https://discordapp.com/users/1218085771580276757"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-2 bg-yellow text-base rounded-md font-semibold">
                  Admin Contact
                </button>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="text-xl font-semibold text-yellow">Players</div>
            <span>
              <strong>Online:</strong> {serverData.players?.online || 0} /{" "}
              {serverData.players?.max || 20}
            </span>
            <div className="bg-mantle pb-4 pl-4 pr-4 pt-2 rounded-md">
              <p className="pb-2 underline">List Online:</p>
              {serverData.players?.sample?.length > 0 ? (
                <ul>
                  {serverData.players.sample.map((player, index) => (
                    <li key={index}>{player.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-surface2">No players online (◞‸◟；)</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ping
