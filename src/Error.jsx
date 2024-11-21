/* eslint-disable no-unused-vars */
import React from "react"

const Error = (error) => {
  return (
    <div className="flex items-center justify-center h-screen bg-base text-text">
      <div className="bg-surface0 p-4 rounded-lg w-1/2">
        <div className="bb-text border-b">
          <span className="text-2xl font-bold text-yellow pb-4">
            FoxNola&apos;s Minecraft Server
          </span>
          <p className="text-xs pb-4 text-surface2">
            A Minecraft server that allows crossplay between Java and Bedrock
            editions (including Pocket Edition).
          </p>
        </div>
        <div className="flex items-center justify-center pt-4">
          <h2 className="text-2xl font-bold text-yellow">Error {error}</h2>
        </div>
      </div>
    </div>
  )
}

export default Error
