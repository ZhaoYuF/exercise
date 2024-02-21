import React, { useState, useEffect } from 'react'
import { Box, Plane, RoundedBox, shaderMaterial } from '@react-three/drei'
import { extend } from "@react-three/fiber";
import * as THREE from 'three';
import { DoubleSide } from 'three';
import { rows, cols, height, chessList, currentChess, cubePositionsWithPieces, turnChess } from './Pieces.js'


const CustomShaderMaterial = new shaderMaterial(
    // Uniforms：传递给着色器的数据
    {
        uCols: 10.0,
        uRows: 10.0,
    },
    // Vertex Shader：顶点着色器代码
    `
      uniform float uCols;
      uniform float uRows;
      varying vec2 vUv;
      void main() {
        vUv = vec2(position.x + uCols * 0.5, position.z + uRows * 0.5);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // Fragment Shader：片元着色器代码
    `
      varying vec2 vUv;

      void main() {
        float x = step(0.5, fract(vUv.x * 0.5));
        float y = step(0.5, fract(vUv.y * 0.5));
        if(y > 0.5) {
            x = 1.0 - step(0.5, x);
        }
        gl_FragColor = vec4(x, x, x, 1.0);
      }
    `
);
extend({ CustomShaderMaterial });

export default function Tetris() {

    const [cubeList, setCubeList] = useState(chessList);

    const [currentCube, setCurrentCube] = useState(currentChess);

    const handleKeyDown = (event) => {
        console.log("aaa");
        switch (event.key) {
            case 'ArrowUp':
                // 处理向上键的逻辑
                setCurrentCube(turnChess(0, currentCube, cubeList))
                break;
            case 'ArrowDown':
                // 处理向下键的逻辑
                setCurrentCube(turnChess(1, currentCube, cubeList))
                break;
            case 'ArrowLeft':
                // 处理向左键的逻辑
                setCurrentCube(turnChess(2, currentCube, cubeList))
                break;
            case 'ArrowRight':
                // 处理向右键的逻辑
                setCurrentCube(turnChess(3, currentCube, cubeList))
                break;
            default:
                // 其他按键的处理逻辑
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentCube])

    return (
        <>
            <group position={[0, -4, 0]} rotation-y={Math.PI * 0} rotation-x={0.15}>
                <group position={[- cols * 0.5 + 0.5, 0.6, - rows * 0.5 + 0.5]}>
                    {
                        cubeList.map((floor, y) => {
                            return floor.map((row, z) => {
                                return row.map((item, x) => {
                                    if (item) {
                                        return (
                                            <RoundedBox key={`${x}-${y}-${z}`} args={[1, 1, 1]} position={[x, y, z]} castShadow receiveShadow>
                                                <meshStandardMaterial />
                                            </RoundedBox>
                                        )
                                    }
                                });
                            })
                        }).flat().flat().filter(item => item !== undefined)
                    }
                    {
                        cubePositionsWithPieces(currentCube).map(p => {
                            return (
                                <RoundedBox key={`${p[0]}-${p[1]}-${p[2]}`} args={[1, 1, 1]} position={p} castShadow>
                                    <meshNormalMaterial />
                                </RoundedBox>
                            )
                        })
                    }
                </group>
                <group>
                    <Plane args={[cols, rows]} receiveShadow rotation-x={-Math.PI * 0.5} position-y={0.11} >
                        <shadowMaterial opacity={0.7} />
                    </Plane>
                    <Box args={[cols, 0.2, rows]} >
                        <customShaderMaterial uCols={cols} uRows={rows} />
                    </Box>
                    <Plane args={[cols, rows]} position-y={height + 0.11} rotation-x={Math.PI * 0.5}>
                        <meshStandardMaterial color="#ff0ff0" side={DoubleSide} />
                    </Plane>
                </group>
            </group>
        </>
    )
}


