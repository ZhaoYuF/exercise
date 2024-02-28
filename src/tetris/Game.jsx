import { Canvas } from "@react-three/fiber"
import Tetris from "../tetris/Tetris"
import GameUI from "./GameUI"
import { OrbitControls, Sky, CameraControls } from '@react-three/drei'
import { useRef, useState } from "react"

export default function Game() {
    // const background = "linear-gradient(#355C7D, #6C5B7B, #C06C84)"
    // const background = "linear-gradient(#eef2f3, #8e9eab)"
    const background = "linear-gradient(#485563, #2E1437)"

    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState(0) // 0结束，1运行， 2暂停
    const tetris = useRef()

    const tapKeyDown = (event) => {
        console.log("aaa");
        if(tetris.current) {
            tetris.current.handleKeyDown(event)
        }
    }

    const tapKeyUp = (event) => {
        console.log("bbb");
        if(tetris.current) {
            tetris.current.handleKeyUp(event)
        }
    }

    const onChangeGameState = (state) => {
        if(gameState == 0) {
            setScore(0)
        }
        setGameState(state)
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: background }}>
            <Canvas
                // flat
                shadows
                // dpr={2}
                gl={{
                    antialias: true
                    // toneMapping: THREE.LinearToneMapping,
                    // outputColorSpace: THREE.LinearSRGBColorSpace
                }}
                camera={{
                    position: [0, -2, 20]
                }}
                style={{ height: '100%' }}
            >
                {/* <Sky sunPosition={[10, 10, 10]} /> */}
                <CameraControls onEnd={(e) => {e.target.reset(true)}} />
                <group rotation-x={0.15}>
                    <directionalLight position={[0, 20, 0]} intensity={1.8} castShadow />
                    <directionalLight position={[5, 5, 10]} intensity={0.5} />
                    <ambientLight intensity={0.8} />
                    <Tetris onScore={(s) => {setScore(s)}} ref={tetris} gameState={gameState} onChangeGameState={onChangeGameState} />
                </group>
            </Canvas>
            <GameUI score={score} gameState={gameState} onChangeGameState={onChangeGameState} onKeyDown={tapKeyDown} onKeyUp={tapKeyUp} />
        </div>
    )
}
