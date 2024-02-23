import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Box, Plane, RoundedBox, shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { DoubleSide } from 'three';
import { rows, cols, height, chessList, createPieces, cubePositionsWithPieces, turnChess, downPieces } from './Pieces.js'
import Bomb from './Bomb.jsx';


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

    const [gameData, _] = useState({
        state: 1, // 0暂停，1运行下落，2下落结束，
        runDuration: 0.0, //
        runSpeed: 1.0, //
        currentStep: 0,
        currentPieces: createPieces()
    })

    const [cubeList, setCubeList] = useState(chessList);
    const [currentCube, setCurrentCube] = useState(cubePositionsWithPieces(gameData.currentPieces));

    const [currentCubeTime, setCurrentCubeTime] = useState(0);

    const downCurrentCube = useCallback(() => {
        const pieces = downPieces(gameData.currentPieces, cubeList)
        if (pieces != gameData.currentPieces) {
            gameData.currentPieces = pieces
            setCurrentCube(cubePositionsWithPieces(gameData.currentPieces))
        }
    }, [])

    const turnCurrentPieces = useCallback((turnType) => {
        gameData.currentPieces = turnChess(turnType, gameData.currentPieces, cubeList)
        setCurrentCube(cubePositionsWithPieces(gameData.currentPieces))
    }, [])

    // const eventData = useMemo(() => {
    //     return {'38': {key: 0, action: 0}, '40': 1, '37': 2, '39': 3}
    // }, [])
    const handleKeyDown = (event) => {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 38:
                // 处理向上键的逻辑
                turnCurrentPieces(0)
                break;
            case 40:
                // 处理向下键的逻辑
                turnCurrentPieces(1)
                break;
            case 37:
                // 处理向左键的逻辑
                turnCurrentPieces(2)
                break;
            case 39:
                // 处理向右键的逻辑
                turnCurrentPieces(3)
                break;
            case 87:
                //上
                downCurrentCube()
                break;
            case 83:
                //下
                downCurrentCube()
                break;
            case 65:
                //左
                downCurrentCube()
                break;
            case 68:
                //右
                downCurrentCube()
                break;
            case 32:
                //空格
                downCurrentCube()
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

    useFrame((state, delta) => {
        // console.log(delta);
        if (gameData.state == 1) {
            gameData.runDuration += delta * gameData.runSpeed
            if (gameData.runDuration >= gameData.currentStep + 1) {
                gameData.currentStep += 1
                downCurrentCube()
            }
        }
    })

    return (
        <>
            <group position={[0, -height * 0.5, 0]} rotation-y={Math.PI * 0} rotation-x={0.15}>
                <group position={[- cols * 0.5 + 0.5, 0.6, - rows * 0.5 + 0.5]}>
                    {
                        cubeList.map((floor, x) => {
                            return floor.map((row, y) => {
                                return row.map((item, z) => {
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
                        currentCube.map(p => {
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
                    <Plane args={[cols + 0.2, rows + 0.2]} position-y={height + 0.11} rotation-x={Math.PI * 0.5}>
                        <meshBasicMaterial color="#f00000" side={DoubleSide} transparent opacity={0.2} />
                    </Plane>
                    <Plane args={[cols, height + 0.3]} position-y={height * 0.5} position-z={-rows * 0.51}>
                        <meshBasicMaterial color="#00f000" side={DoubleSide} transparent opacity={0.2} />
                    </Plane>
                    <Plane args={[cols, height + 0.3]} position-y={height * 0.5} position-z={rows * 0.51}>
                        <meshBasicMaterial color="#ffffff" side={DoubleSide} transparent opacity={0.1} />
                    </Plane>
                    <Plane args={[rows, height + 0.3]} position-y={height * 0.5} position-x={-cols * 0.51} rotation-y={Math.PI * 0.5}>
                        <meshBasicMaterial color="#0000f0" side={DoubleSide} transparent opacity={0.2} />
                    </Plane>
                    <Plane args={[rows, height + 0.3]} position-y={height * 0.5} position-x={cols * 0.51} rotation-y={Math.PI * 0.5}>
                        <meshBasicMaterial color="#00f0f0" side={DoubleSide} transparent opacity={0.1} />
                    </Plane>
                </group>
                {/* <group position={[- cols * 0.5 + 0.5, 0.6, - rows * 0.5 + 0.5]}>
                    <Bomb position={[0, 0, 8]} color="#00ff00" />
                    <Bomb position={[1, 0, 8]} color="#00ff00" />
                    <Bomb position={[2, 0, 8]} color="#00ff00" />
                    <Bomb position={[3, 0, 8]} color="#00ff00" />
                    <Bomb position={[4, 0, 8]} color="#00ff00" />
                    <Bomb position={[5, 0, 8]} color="#00ff00" />
                    <Bomb position={[6, 0, 8]} color="#00ff00" />
                    <Bomb position={[7, 0, 8]} color="#00ff00" />
                    <Bomb position={[8, 0, 8]} color="#00ff00" />
                    <Bomb position={[9, 0, 8]} color="#00ff00" />
                </group> */}
            </group>
        </>
    )
}


