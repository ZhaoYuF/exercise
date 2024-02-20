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
          position: [0, 0, 12]
        }}
        // style={{ background: '#ffffff' }}
      >
        <OrbitControls />
        {/* <orbitControls args={[camera, gl.domElement]} /> */}
        <directionalLight position={[0, 20, 0]} intensity={2} castShadow />
        <ambientLight intensity={0.5} />
        <Tetris />
        {/* <Experience /> */}
      </Canvas>
    </>
  )
}

export default App
