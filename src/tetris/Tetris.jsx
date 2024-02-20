import React, { useState } from 'react'
import { Box, Plane, RoundedBox } from '@react-three/drei'
import { DoubleSide } from 'three';

export default function Tetris() {
    const rows = 10;
    const cols = 10;
    const height = 8;

    const [cubeList, setCubeList] = useState(() => {
        const array = Array.from({ length: height }, () =>
            Array.from({ length: rows }, () => Array.from({ length: cols }, () => false))
        );
        array[0][3][1] = true;
        array[0][3][2] = true;
        array[0][4][1] = true;
        array[0][4][2] = true;
        array[1][3][1] = true;
        array[1][3][2] = true;
        array[1][4][1] = true;
        return array
    });

    const [currentCube, setCurrentCube] = useState({
        position: [0, 0, 0],
        type: 0,
        
    })

    return (
        <>
            <group position={[0, -4, 0]} rotation-y={Math.PI * 0} rotation-x={0.15}>
                <group position={[- cols * 0.5 + 0.5, 0.6, - rows * 0.5 + 0.5]}>
                    {
                        cubeList.map((floor, y) => {
                            return floor.map((row, z) => {
                                return row.map((item, x) => {
                                    if (item) {
                                        console.log(x, y, z);
                                        return (
                                            <RoundedBox key={`${x}-${y}-${z}`} args={[1, 1, 1]} position={[x, y, z]} castShadow>
                                                <meshNormalMaterial />
                                            </RoundedBox>
                                        )
                                    }
                                });
                            })
                        }).flat().flat().filter(item => item !== undefined)
                    }
                </group>
                <group>
                    <Box args={[cols, 0.2, rows]} receiveShadow >
                        <meshStandardMaterial color="#ff0ff0" />
                    </Box>
                    <Plane args={[cols, rows]} position-y={height + 0.11} rotation-x={Math.PI * 0.5}>
                        <meshStandardMaterial color="#ff0ff0" side={DoubleSide} />
                    </Plane>
                </group>
            </group>
        </>
    )
}


