// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"
import axios from "axios"
import Loading from "./Loading"
import Error from "./Error"

const Ping = () => {
  const [serverData, setServerData] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    axios
      .get("/api/ping")
      .then((response) => setServerData(response.data))
      .catch((err) => setError(err.message))
  }, [])

  // Display error or loading state
  if (error) return <Error message={error} />
  if (!serverData) return <Loading />

  const cpyTxt = () => {
    const copyText = "FoxNola.aternos.me:64523"

    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      })
      .catch((err) => console.error("Error copying text:", err))
  }

  // Determine if the server is offline based on missing version data
  const isServerOffline = !serverData.version || !serverData.version.name

  return (
    <div className="flex items-center justify-center h-screen bg-base text-text">
      <div className="bg-surface0 p-6 rounded-lg w-3/4 shadow-md">
        {/* Server Info Header */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-xl lg:text-2xl font-bold text-yellow">
            FoxNola&apos;s Minecraft Server
          </h1>
          <p className="text-xs lg:text-sm text-surface2">
            A Minecraft server that allows crossplay between Java and Bedrock
            editions (including Pocket Edition).
          </p>
        </div>

        {/* Server Status and Details */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Section: Server Status */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-yellow">Server Status</h2>
            <div className="flex gap-4">
              {(serverData.favicon && (
                <img
                  src={serverData.favicon}
                  alt="Server Favicon"
                  className="w-16 h-16 rounded-lg"
                />
              )) || <div className="w-16 h-16 bg-surface2"></div>}

              <div className="flex flex-col text-xs lg:text-lg">
                <p>
                  <strong>IP:</strong> FoxNola.aternos.me:64523{" "}
                  <button onClick={cpyTxt} aria-label="Copy server IP">
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
                  <strong className="text-green">
                    {isServerOffline ||
                    serverData.version.name === "§c● Offline" ? (
                      <span className="text-red">
                        Offline! Contact the server admin.
                      </span>
                    ) : (
                      serverData.version.name
                    )}
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

          {/* Right Section: Players Information */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="text-xl font-semibold text-yellow">Players</div>
            <span>
              <strong>Online:</strong> {serverData.players.online || 0} /{" "}
              {serverData.players.max}
            </span>
            <div className="bg-mantle pb-4 pl-4 pr-4 pt-2 rounded-md">
              <p className="pb-2 underline">List Online:</p>
              {serverData.players.sample &&
              serverData.players.sample.length > 0 ? (
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
