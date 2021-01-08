import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber/web.cjs'
import { useSpring, a } from 'react-spring/three.cjs'
import { softShadows } from 'drei/softShadows.cjs'
import './setupRegTHREE'
import Rig from './Rig'
import 'three/examples/js/controls/OrbitControls'
import useMouse from './useMouse'
import useResize from "use-resizing"

extend({ OrbitControls: THREE.OrbitControls })

softShadows({
  size: 0.01,
  samples: 27
})

const Box = ({args, pos, rotate, clockwise, canvasHover}) => {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  
  useEffect(() => {
    mesh.current.rotation.x += rotate
    mesh.current.rotation.y += rotate
  }, [])
  
  useFrame(() => {
    mesh.current.rotation.x += 0.002 * (clockwise ? -1 : 1)
    mesh.current.rotation.y += 0.002 * (clockwise ? -1 : 1)
  })

  const springs = useSpring({
      scale: canvasHover ? [1.3, 1.3, 1.3] : [1, 1, 1],
      color: hovered ? '#ff7214' : '#555555',
      position: [canvasHover ? pos[0]*1.15 : pos[0], pos[1], pos[2]]
  })
  
  return (
    <a.mesh
      position={springs.position}
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

const Lighting = ({canvasHover}) => {
  const springs = useSpring({
    intensity: !canvasHover ? 2 : 0
  })

  return (
  <>  
    <ambientLight intensity={0.3}/>
    <a.pointLight castShadow position={[0, -1, 0]} intensity={springs.intensity} color="white"/>
    <pointLight position={[-10, 0, -20]} intensity={0.5}/>
    <pointLight position={[0, -10, 0]} intensity={1.5}/>
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
  </>
  )
}

const Scene = ({children, mouse, touchDevice, canvasHover}) => {  
    const { camera, gl } = useThree()

    return (
      <>
        <fog attach="fog" near={0} far={30} color="#000" />
        <color attach="background" args={['#000']} />
        <Lighting canvasHover={canvasHover}/>

        { children }

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeBufferGeometry attach="geometry" args={[1000, 1000]}/>
          <meshStandardMaterial attach="material" color="#333" />
        </mesh>

        {touchDevice ? 
          <orbitControls args={[camera, gl.domElement]} enableZoom={false} enablePan={false} enableKey={false}/>
        :
          <Rig mouse={mouse} />
        }
    </>
    )
  }
  
  const CanvasApp = ({canvasHover, touchDevice}) => {
    const mouse = {
      current: useMouse()
    }

    const screen = useResize().width
    const adjustWide = screen < 600 ? 600/1300 : screen/1300
    
    return (
      <Canvas shadowMap camera={{ position: [0, 0, 10], fov: 25 }}>
        <Scene mouse={mouse} touchDevice={touchDevice} canvasHover={canvasHover}>
          <group>
            <Box args={[1, 1, 1]} pos={[adjustWide*-5, 1, 4]} rotate={110} clockwise canvasHover={canvasHover}/>
            <Box args={[1, 1, 1]} pos={[adjustWide*-5, 1, 0]} rotate={10} canvasHover={canvasHover}/>
            <Box args={[1, 1, 1]} pos={[adjustWide*-5.5, -1, -3]} rotate={40} clockwise canvasHover={canvasHover}/>
          </group>
          <group>
            <Box args={[1, 1, 1]} pos={[adjustWide*4, 0, 5]} rotate={110} clockwise canvasHover={canvasHover}/>
            <Box args={[1, 1, 1]} pos={[adjustWide*5, 0, 0]} rotate={30} canvasHover={canvasHover}/>
            <Box args={[1, 1, 1]} pos={[adjustWide*6, 2, 0]} rotate={60} clockwise canvasHover={canvasHover}/>
          </group>
        </Scene>
      </Canvas>
    )
}
  
  export default CanvasApp