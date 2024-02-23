import React, { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import vertexShader from './bombShader/vertex.glsl?raw'
import fragmentShader from './bombShader/fragment.glsl?raw'
import * as THREE from 'three'

const speed = 0.8

export default function Bomb(props) {
    const timeUniform = useRef({ value: 0.0 });
    const pointsRef = useRef();
    useFrame((_, delta) => {
        if (timeUniform.current.value < 1.0 && pointsRef.current) {
            timeUniform.current.value = Math.min(1, timeUniform.current.value + delta * speed)
            pointsRef.current.material.uniforms.uTime = timeUniform.current;
            pointsRef.current.material.needsUpdate = true;
        }
    }, [])

    return (
        <points position={props.position} ref={pointsRef}>
            <boxGeometry args={[0.8, 0.8, 0.8, 4, 4, 4]} />
            <shaderMaterial
                transparent={true}
                // depthWrite={true}
                // blending={THREE.AdditiveBlending}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: timeUniform.current,
                    uColor: { value: new THREE.Color(props.color) }
                }} />
        </points>
    )
}
