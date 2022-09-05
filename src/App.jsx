import { useState } from 'react'
import React from 'react'
import Main from './components/Main'
import Quiz from './components/Quiz'

export default function App() {
  const [isStart, setIsStart] = useState(false)

  function startGame() {
      setIsStart(preState => !preState)
  }

  return (
    <main className="main">
      <img src='../images/blob1.png' className="main--img1"/>
      {isStart ? <Quiz/> : <Main startGame={startGame} />}
      <img src='../images/blob2.png' className="main--img2" />
    </main>
  )
}
