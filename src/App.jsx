import Game from './tetris/Game'
import Resume from './resume/Resume'
import { useState } from 'react'
import audioContext from './tetris/audio'



function App() {
  const [gameDisabled, setGameDisabled]  = useState(true)
  const [showResume, setShowResume] = useState(true)
  // const [gameDisabled, setGameDisabled]  = useState(true)
  const onGameRunning = () => {
    setShowResume(false)
  }

  const onGamePaused = () => {
    setShowResume(true)
  }
  return (
    <>
      <Game disabled={gameDisabled} onGameRunning={onGameRunning} onGamePaused={onGamePaused}></Game>
      <Resume show={showResume} onResumeHide={ () => {setGameDisabled(false)} } onResumeShow={ () => {setGameDisabled(true); setShowResume(true)} }></Resume>
    </>
  )
}

export default App
