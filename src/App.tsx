import React, { ReactElement, useState } from 'react'
import Home from "./Home";

function App(): ReactElement {

  return (
    <div>
      Down Currently.
      Use this prompt to generate pointers in ChatGPT
      <br />
      You are an AI assistant. Your client is a busy professional who needs a summary of the script. Provide a summary of the script in at least 10 points.
    </div>
  )

  return (
    <Home />
  )
}

export default App
