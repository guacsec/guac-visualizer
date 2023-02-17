import { Inter } from '@next/font/google'
import React, { useState } from "react";
import Graph from 'app/graph'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div>
        <h1>GUAC Visualizer</h1>
        <div
          style={{
            border: "1px solid",
            backgroundColor: "#000000"
          }}
        >
          <Graph />
        </div>
      </div>
    </>
  )
}
