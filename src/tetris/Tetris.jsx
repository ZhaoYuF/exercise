import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react'
import { Box, Plane, RoundedBox, shaderMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { rows, cols, height, chessList, createPieces, cubePositionsWithPieces, turnChess, downPieces, eventData, moveChess, settlement, moveDownCubeList } from './Pieces.js'
import Bomb from './Bomb.jsx';
import audioContext from './audio.js'


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
        if(x < 0.5) {
            gl_FragColor = vec4(0.85, 0.78, 0.61, 1.0);
        } else {
            gl_FragColor = vec4(0.973, 0.925, 0.855, 1.0);
        }
      }
    `
);
extend({ CustomShaderMaterial });

const PiecesDownSpeed = {
    normal: 2.0,
    fastest: 16.0,
}

export default forwardRef(function Tetris({
    onScore,
    gameState,
    onChangeGameState,
    disabled,
}, ref) {
    const [gameData, _] = useState({
        disabled: false,
        running: false, // 是否运行
        state: 1, //1下落， 2结算， 0游戏结束
        runDuration: 0.0, //
        runSpeed: PiecesDownSpeed.normal, //
        cubeIndex: 0,
        currentStep: 0,
        currentPieces: createPieces(),
        nextPiece: undefined,
        clearBombTimer: undefined,
        directionData: [
            [0, 1, 2, 3],
            [2, 3, 1, 0],
            [1, 0, 3, 2],
            [3, 2, 0, 1]
        ],
        direction: 0, //0, 1, 2, 3: 前右后左
        // canChangePiece: true,
        score: 0,
        currentScoreCount: 0,
    })

    gameData.disabled = disabled

    const restartGame = useCallback(() => {
        gameData.running = true
        gameData.state = 1
        gameData.runDuration = 0.0
        gameData.runSpeed = PiecesDownSpeed.normal
        gameData.cubeIndex = 0
        gameData.currentStep = 0
        gameData.currentPieces = createPieces()
        gameData.nextPiece = undefined
        gameData.score = 0
        gameData.currentScoreCount = 0
        clearCubeList()
        setCurrentCube(cubePositionsWithPieces(gameData.currentPieces))
        setNextCube({ positions: [], color: undefined })
    }, []);

    gameData.running = gameState == 1 ? true : false
    if (gameData.state == 0 && gameData.running) {
        restartGame()
    }
    const tetrisRef = useRef()

    const [cubeList, setCubeList] = useState(JSON.parse(JSON.stringify(chessList)));
    const [settlementList, setSettlementList] = useState(Array.from({ length: height }, () =>
        Array.from({ length: rows + cols }, () => 0))
    );
    const [bombList, setBombList] = useState([]);
    const [currentCube, setCurrentCube] = useState(cubePositionsWithPieces(gameData.currentPieces));
    const [nextCube, setNextCube] = useState({ positions: [], color: undefined });


    const clearCubeList = useCallback(() => {
        for (let x = 0; x < cubeList.length; x++) {
            for (let y = 0; y < cubeList[0].length; y++) {
                for (let z = 0; z < cubeList[0][0].length; z++) {
                    if (cubeList[x][y][z]) {
                        cubeList[x][y][z] = undefined
                    }
                }
            }
        }
        for (let i = 0; i < settlementList.length; i++) {
            for (let j = 0; j < settlementList[0].length; j++) {
                settlementList[i][j] = 0
            }
        }

        setCubeList([...cubeList])
    }, [])

    const updateCurrentCube = useCallback((data) => {
        if (data) {
            currentCube.positions = data.positions
            currentCube.color = data.color
        } else {
            currentCube.positions = []
            currentCube.color = undefined
        }
        setCurrentCube({ ...currentCube })
    }, [])

    const updateNextCube = useCallback((data) => {
        if (data) {
            nextCube.positions = data.positions
            nextCube.color = data.color
        } else {
            nextCube.positions = []
            nextCube.color = undefined
        }
        setNextCube({ ...nextCube })
    }, [])

    const createNextCube = useCallback(() => {
        gameData.cubeIndex += currentCube.positions.length
        gameData.nextPiece = createPieces()
        updateNextCube(cubePositionsWithPieces(gameData.nextPiece))
    }, []);

    const downCurrentCube = useCallback(() => {
        const pieces = downPieces(gameData.currentPieces, cubeList)
        if (pieces != gameData.currentPieces) {
            // audioContext.playMoveMusic()
            gameData.currentPieces = pieces
            updateCurrentCube(cubePositionsWithPieces(gameData.currentPieces))
            if (gameData.nextPiece == undefined && pieces.position[1] < height) {
                createNextCube()
            }
        } else {
            audioContext.playFailMusic()
            finishedCurrentCube()
        }
    }, [])

    const cubeListAddCurrent = useCallback(() => {
        if (currentCube) {
            for (const [x, y, z] of currentCube.positions) {
                cubeList[x][y][z] = { valid: true, color: currentCube.color }
                if (y >= height) {
                    gameData.state = 0
                    onChangeGameState(0)
                } else {
                    settlementList[y][x] += 1
                    settlementList[y][cols + z] += 1
                }
            }
            updateCurrentCube()
        }
    }, [])

    const runNextCube = useCallback(() => {
        gameData.runDuration = 0.0
        gameData.currentStep = 0
        gameData.currentPieces = gameData.nextPiece || createPieces()
        gameData.nextPiece = undefined

        if (PiecesDownSpeed.normal < PiecesDownSpeed.fastest) {
            PiecesDownSpeed.normal = 2 + Math.floor(gameData.cubeIndex / 100) * 0.5
        }
        gameData.runSpeed = PiecesDownSpeed.normal
        updateCurrentCube(cubePositionsWithPieces(gameData.currentPieces))
        updateNextCube()
        if (gameData.state == 2) {
            gameData.state = 1
        }
    }, []);

    //得分后，上面的往下移，然后重新结算
    const moveCubeList = useCallback((bombs) => {
        moveDownCubeList(bombs, cubeList, settlementList)
        setCubeList([...cubeList])
        setBombList([])
        setTimeout(() => {
            updateScoreAndCubeList()
        }, 200);
    }, [])

    //结算分数，移除cube,添加爆炸
    const updateScoreAndCubeList = useCallback(() => {
        if (!gameData.running) return
        const { count, bombs } = settlement(cubeList, settlementList)
        // console.log("得分", score);
        if (count > 0) {
            audioContext.playScoreMusic()
            gameData.currentScoreCount += count
            // for (const { position } of bombs) {
            //     const [x, y, z] = position
            //     cubeList[x][y][z] = undefined
            // }
            if (gameData.clearBombTimer) {
                gameData.clearBombTimer = undefined
                clearTimeout(gameData.clearBombTimer)
            }

            setBombList([...bombs])
            setCubeList([...cubeList])

            gameData.clearBombTimer = setTimeout(() => {
                gameData.clearBombTimer = undefined
                moveCubeList(bombs)
            }, 800);
        } else {
            if (gameData.currentScoreCount > 0) {
                const score = 2 ** gameData.currentScoreCount - 1
                gameData.score += score
                onScore(gameData.score)
                gameData.currentScoreCount = 0
            }
            setTimeout(() => {
                runNextCube()
            }, 500);
        }
    }, []);

    const finishedCurrentCube = useCallback(() => {
        gameData.state = 2
        cubeListAddCurrent()
        updateScoreAndCubeList()
    }, [])

    const updateCurrentPieces = useCallback((pieces) => {
        if (pieces != gameData.currentPieces) {
            gameData.currentPieces = pieces
            updateCurrentCube(cubePositionsWithPieces(gameData.currentPieces))
        }
    }, [])

    //旋转
    const turnCurrentPieces = useCallback((turnType) => {
        
        const pieces = turnChess(gameData.directionData[gameData.direction][turnType], gameData.currentPieces, cubeList)
        if (pieces != gameData.currentPieces) {
            audioContext.playRotationMusic()
            updateCurrentPieces(pieces)
        } else {
            audioContext.playFailMusic()
        }
    }, [])

    const moveCurrentPieces = useCallback((moveType) => {
        const pieces = moveChess(gameData.directionData[gameData.direction][moveType], gameData.currentPieces, cubeList)
        if (pieces != gameData.currentPieces) {
            audioContext.playMoveMusic()
            updateCurrentPieces(pieces)
        } else {
            audioContext.playFailMusic()
        }
    }, [])

    const turnCamera = useCallback((left) => {
        gameData.direction = (gameData.direction + (left ? 3 : 1)) % 4
        tetrisRef.current.rotation.y = -Math.PI * gameData.direction * 0.5
    }, [])


    const handleKeyDown = (event) => {
        if (event.preventDefault) {
            event.preventDefault()
        }
        // 
        if (gameData.disabled) { return }
        console.log(event.keyCode);
        if (event.shiftKey) {
            if (eventData[event.keyCode]) {
                const { key, action } = eventData[event.keyCode]
                if (action == 0) {
                    if (key == 2) {
                        turnCamera(true)
                    } else if (key == 3) {
                        turnCamera(false)
                    }
                }
            }
        } else if (eventData[event.keyCode]) {
            const { key, action } = eventData[event.keyCode]
            if (action == 3) {
                if (gameData.running) {
                    gameData.running = false
                    onChangeGameState(2)
                } else {
                    gameData.running = true
                    onChangeGameState(1)
                    gameData.runSpeed = PiecesDownSpeed.normal
                    if (gameData.state == 2) {
                        updateScoreAndCubeList()
                    }
                }
                return
            }
            if (gameData.state != 1 || !gameData.running) return
            if (action == 0) {
                turnCurrentPieces(key)
            } else if (action == 1) {
                moveCurrentPieces(key)
            } else if (action == 2) {
                gameData.runSpeed = PiecesDownSpeed.fastest
            }
        }
    };

    const handleKeyUp = (event) => {
        if (gameData.state != 1) return
        if (event.keyCode == 13) {
            gameData.runSpeed = PiecesDownSpeed.normal
        }
    };




    // const onResumeScroll = () => {
    //     console.log(resume.scrollTop);
    //     console.log(camera);

    // }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        // resume.addEventListener('scroll', onResumeScroll);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            // resume.removeEventListener('scroll', onResumeScroll);
        };
    }, [])

    const resume = document.querySelector("#resume")

    useFrame((state, delta) => {
        // console.log(disabled);
        if (gameData.state == 1 && gameData.running) {
            gameData.runDuration += delta * gameData.runSpeed
            if (gameData.runDuration >= gameData.currentStep + 1) {
                gameData.currentStep += 1
                downCurrentCube()
            }
        }
        if (gameData.disabled) {
            const scrollTop = Math.max(0, resume.scrollTop - 50);
            const angle = scrollTop / 360.0 * Math.PI
            const radius = 20 + Math.atan(scrollTop * 0.004) * 20
            state.camera.position.set(Math.sin(angle) * radius, -2, Math.cos(angle) * radius)
            state.camera.lookAt(new THREE.Vector3(0, 0, 0))
        }
    })

    useImperativeHandle(ref, () => {
        return {
            handleKeyDown,
            handleKeyUp,
        };
    }, []);

    return (
        <group ref={tetrisRef} rotation-x={0} position={[0, -height * 0.5 + 1, 0]}>
            <group position={[- cols * 0.5 + 0.5, 0.6, - rows * 0.5 + 0.5]}>
                {
                    cubeList.map((floor, x) => {
                        return floor.map((row, y) => {
                            return row.map((item, z) => {
                                if (item && item.valid) {
                                    return (
                                        <RoundedBox radius={0.1} creaseAngle={1.0} smoothness={1} bevelSegments={1} key={`${x}-${y}-${z}`} args={[1, 1, 1]} position={[x, y, z]} receiveShadow>
                                            <meshStandardMaterial color={item.color} />
                                        </RoundedBox>
                                    )
                                }
                            });
                        })
                    }).flat().flat().filter(item => item !== undefined)
                }
                {
                    currentCube.positions.map(p => {
                        return (
                            <RoundedBox radius={0.1} creaseAngle={1.0} smoothness={1} bevelSegments={1} key={`${p[0]}-${p[1]}-${p[2]}`} args={[1, 1, 1]} position={p} castShadow>
                                <meshStandardMaterial color={currentCube.color} />
                            </RoundedBox>
                        )
                    })
                }
                {
                    nextCube.positions.map(p => {
                        return (
                            <RoundedBox radius={0.1} creaseAngle={1.0} smoothness={1} bevelSegments={1} key={`${p[0]}-${p[1]}-${p[2]}`} args={[1, 1, 1]} position={p}>
                                <meshStandardMaterial color={nextCube.color} />
                            </RoundedBox>
                        )
                    })
                }
            </group>
            <group>
                {/* 阴影 */}
                <Plane args={[cols, rows]} receiveShadow rotation-x={-Math.PI * 0.5} position-y={0.11} >
                    <shadowMaterial opacity={0.7} />
                </Plane>
                {/* 底 */}
                <Box args={[cols, 0.2, rows]} >
                    <customShaderMaterial uCols={cols} uRows={rows} />
                </Box>

                <Plane args={[cols + 0.2, rows + 0.2]} position-y={height + 0.11} rotation-x={Math.PI * 0.5}>
                    <meshBasicMaterial color="#c3c08a" side={THREE.DoubleSide} transparent opacity={0.4} />
                </Plane>
                <Plane args={[cols + 0.1, height + 0.3]} position-y={height * 0.5} position-z={-rows * 0.51}>
                    <meshBasicMaterial color="#fff" side={THREE.DoubleSide} transparent opacity={0.1} />
                </Plane>
                <Plane args={[cols + 0.1, height + 0.3]} position-y={height * 0.5} position-z={rows * 0.51}>
                    <meshBasicMaterial color="#fff" side={THREE.DoubleSide} transparent opacity={0.1} />
                </Plane>
                <Plane args={[rows + 0.1, height + 0.3]} position-y={height * 0.5} position-x={-cols * 0.51} rotation-y={Math.PI * 0.5}>
                    <meshBasicMaterial color="#888" side={THREE.DoubleSide} transparent opacity={0.1} />
                </Plane>
                <Plane args={[rows + 0.1, height + 0.3]} position-y={height * 0.5} position-x={cols * 0.51} rotation-y={Math.PI * 0.5}>
                    <meshBasicMaterial color="#888" side={THREE.DoubleSide} transparent opacity={0.1} />
                </Plane>
            </group>
            <group position={[- cols * 0.5 + 0.5, 0.6, - rows * 0.5 + 0.5]}>
                {
                    bombList.map(({ position, color }) => {
                        return <Bomb key={`${position[0]}-${position[1]}-${position[2]}`} position={position} color={color} />
                    }
                    )
                }

                {/* <Bomb position={[0, 0, 8]} color="#00ff00" />
                    <Bomb position={[1, 0, 8]} color="#00ff00" />
                    <Bomb position={[2, 0, 8]} color="#00ff00" />
                    <Bomb position={[3, 0, 8]} color="#00ff00" />
                    <Bomb position={[4, 0, 8]} color="#00ff00" />
                    <Bomb position={[5, 0, 8]} color="#00ff00" />
                    <Bomb position={[6, 0, 8]} color="#00ff00" />
                    <Bomb position={[7, 0, 8]} color="#00ff00" />
                    <Bomb position={[8, 0, 8]} color="#00ff00" />
                    <Bomb position={[9, 0, 8]} color="#00ff00" /> */}
            </group>
        </group>
    )
})


