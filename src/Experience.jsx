import { Box } from "@react-three/drei"
import { useFrame, extend, useThree } from "@react-three/fiber"
import { DoubleSide } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

extend({OrbitControls})

export default function Experience() {
    const {camera, gl} = useThree()
    // console.log(three)
    return <>
        {/* <orbitControls args={[camera, gl.domElement]} />
        <directionalLight position={[5, 5, 5]} intensity={ 2 } /> */}
        <ambientLight intensity={ 0.5 } />
        <mesh rotation-x={Math.PI * 0.5} rotation-z={Math.PI * 0.2} position-y={-1} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial side={DoubleSide} />
        </mesh>
        <mesh scale={[1, 1, 1]} castShadow>
            <sphereGeometry args={[ 1, 40, 40]} />
            <meshStandardMaterial color="orange" />
        </mesh>
        <mesh position-x={2}>
            <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
            <meshStandardMaterial color="#ff0ff0"  />
        </mesh>
    </>
}