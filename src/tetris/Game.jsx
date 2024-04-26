import { Canvas, useThree } from "@react-three/fiber"
import Tetris from "../tetris/Tetris"
import GameUI from "./GameUI"
import { CameraControls } from '@react-three/drei'
import { useCallback, useEffect, useRef, useState } from "react"
import audioContext from './audio.js'

const GameCanvas = ({
    setScore,
    gameState,
    disabled,
    onChangeGameState,
    tetris
}) => {
    return <Canvas
        // flat
        shadows
        // dpr={2}
        gl={{
            antialias: true
            // toneMapping: THREE.LinearToneMapping,
            // outputColorSpace: THREE.LinearSRGBColorSpace
        }}
        camera={{ position: [0, -2, 20] }}
        style={{ height: '100%' }}
        id="canvas"
    >
        {/* <Sky sunPosition={[10, 10, 10]} /> */}
        <CameraControls dollySpeed={0} onEnd={(e) => { e.target.reset(true) }} />
        <group rotation-x={0.15}>
            <directionalLight position={[0, 20, 0]} intensity={1.8} castShadow />
            <directionalLight position={[5, 5, 10]} intensity={0.5} />
            <ambientLight intensity={0.8} />
            <Tetris onScore={(s) => { setScore(s) }} ref={tetris} gameState={gameState} onChangeGameState={onChangeGameState} disabled={disabled} />
        </group>
    </Canvas>
}

export default function Game({
    disabled,
    onGameRunning,
    onGamePaused,
}) {
    const [score, setScore] = useState(0)
    // const [showUI, setShowUI] = useState(false)
    // setShowUI(!disabled)
    const [gameState, setGameState] = useState(0) // 0结束，1运行，2暂停
    const tetris = useRef()

    const tapKeyDown = (event) => {
        if (tetris.current) {
            tetris.current.handleKeyDown(event)
        }
    }

    const tapKeyUp = (event) => {
        if (tetris.current) {
            tetris.current.handleKeyUp(event)
        }
    }

    const onChangeGameState = (state) => {
        setGameState(state)
        if (state == 0) {
            console.log("归零");
            setScore(0)
        }
        if (state == 1) {
            onGameRunning()
        } else {
            onGamePaused()
        }
    }

    useEffect(() => {
        if (disabled && gameState == 1) {
            setGameState(2)
        }        
    }, [disabled, gameState])

    if(!disabled && gameState != 1) {
        console.log("播放");
        audioContext.playBackgroundMusic()
    } else {
        console.log("暂停");
        audioContext.pauseBackgroundMusic()
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <GameCanvas setScore={setScore} tetris={tetris} gameState={gameState} onChangeGameState={onChangeGameState} disabled={disabled} />
            {
                disabled ? null : <GameUI score={score} gameState={gameState} onChangeGameState={onChangeGameState} tapKeyDown={tapKeyDown} tapKeyUp={tapKeyUp} />
            }

        </div>
    )
}


