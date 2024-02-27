import { Canvas } from "@react-three/fiber"
import Tetris from "../tetris/Tetris"
import GameUI from "./GameUI"
import { OrbitControls, Sky } from '@react-three/drei'

export default function Game() {
  return (
    <>
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
          position: [0, 4, 20]
        }}
      style={{ background: '#fff', height: '100%' }}
      >
        <Sky />
        <OrbitControls />
        <group rotation-x={0.15}>
          <directionalLight position={[0, 20, 0]} intensity={1.8} castShadow />
          <directionalLight position={[5, 5, 10]} intensity={0.5} />
          <ambientLight intensity={0.8} />
          <Tetris />
        </group>
      </Canvas>
      <GameUI />
    </>
  )
}
