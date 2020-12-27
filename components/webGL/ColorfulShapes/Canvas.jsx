import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber/web.cjs'
import { useSpring, animated } from 'react-spring/three.cjs'
import './setupRegTHREE'
import 'three/examples/js/controls/OrbitControls'

extend({ OrbitControls: THREE.OrbitControls });

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })

    const springs = useSpring({
        scale: active ? [1.4, 1.4, 1.4] : [1, 1, 1]
    })
    
    return (
      <animated.mesh
        {...props}
        ref={mesh}
        scale={springs.scale}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </animated.mesh>
    )
  }

const Scene = ({children}) => {
    const {
        camera,
        gl: { domElement }
    } = useThree()
    return (
    <>
        {children}
        <orbitControls args={[camera, domElement]} />
    </>
    )
}

const CanvasApp = () => {

    return (
    <>
        <Canvas>
            <Scene>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Scene>
        </Canvas>
    </>
    )
}
  
  export default CanvasApp