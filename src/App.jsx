// import { useState } from 'react'
import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"
import Tetris from "./tetris/Tetris"
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'


function App() {

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
          position: [0, 0, 20]
        }}
      style={{ background: '#fff', height: '100%' }}
      >
        {/* <Sky sunPosition={[-10, 50, 10]} /> */}
        <OrbitControls />
        <group rotation-x={0.15}>
          <directionalLight position={[1, 8, 1]} intensity={1.8} castShadow />
          <directionalLight position={[5, 5, 10]} intensity={0.5} />
          <ambientLight intensity={0.8} />
          <Tetris />
        </group>
        {/* <Experience /> */}
      </Canvas>
    </>
  )
}

export default App
