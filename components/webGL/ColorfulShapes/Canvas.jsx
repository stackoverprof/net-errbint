import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber/web.cjs'
import { useSpring, a } from 'react-spring/three.cjs'
import { softShadows } from 'drei/softShadows.cjs'
import './setupRegTHREE'
import useMouse from './useMouse'

extend({ OrbitControls: THREE.OrbitControls })

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.01, // World size (default: 0.005)
  near: 9.5, // Near plane (default: 9.5)
  samples: 27, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
})

const Box = ({args, position}) => {
    const mesh = useRef()
    const [hovered, setHover] = useState(false)
    
    useEffect(() => {
      mesh.current.rotation.x += 30
      mesh.current.rotation.y += 30
    }, [])

    const springs = useSpring({
        scale: hovered ? [1.15, 1.15, 1.15] : [1, 1, 1],
        color: hovered ? '#FF5B14' : '#555555'
    })
    
    return (
      <a.mesh
        position={position}
        ref={mesh}
        scale={springs.scale}
        castShadow
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <boxBufferGeometry args={args} />
        <a.meshStandardMaterial color={springs.color} />
      </a.mesh>
    )
  }

const Rig = ({ mouse }) => {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.current[0] / 50 - camera.position.x) * 0.05
    camera.position.y += (-mouse.current[1] / 50 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

const Scene = ({children, mouse}) => {
    return (
      <>
        <color attach="background" args={['#000']} />
        <fog attach="fog" near={0} far={30} color="#000" />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeBufferGeometry attach="geometry" args={[1000, 1000]}/>
          <meshStandardMaterial attach="material" color="#333" />
        </mesh>
        {children}
        <Rig mouse={mouse} />
    </>
    )
}
  
const CanvasApp = () => {
  const mouse = {
    current: useMouse()
  }
  
  return (
    <>
      <Canvas 
        shadowMap 
        colorManagement 
        camera={{ position: [0, 0, 10], fov: 25 }}>
        <Scene mouse={mouse}>
          <ambientLight intensity={0.3}/>
          <directionalLight 
              castShadow
              position={[0, 10, 0]} 
              intensity={0.5} 
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}

          />
          <pointLight position={[-10, 0, -20]} intensity={0.5}/>
          <pointLight position={[0, -10, 0]} intensity={1.5}/>

          <Box args={[1, 1, 1]} position={[-4, 0, 0]} />
          <Box args={[1, 1, 1]} position={[4, 0, 0]} />
          <Box args={[0.05, 0.05, 0.05]} position={[0, 0, 0]} />
        </Scene>
      </Canvas>
      <p>{mouse.current[0]} {mouse.current[1]}</p>
  </>
  )
}
  
  export default CanvasApp