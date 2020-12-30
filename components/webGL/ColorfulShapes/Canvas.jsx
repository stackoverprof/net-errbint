import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber/web.cjs'
import { useSpring, a } from 'react-spring/three.cjs'
import { softShadows } from 'drei/softShadows.cjs'
import './setupRegTHREE'
import 'three/examples/js/controls/OrbitControls'
import useMouse from './useMouse'
import useResize from "use-resizing"

extend({ OrbitControls: THREE.OrbitControls })

softShadows({
  size: 0.01,
  samples: 27
})

const Box = ({args, position, rotate, colorful}) => {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  
  useEffect(() => {
    mesh.current.rotation.x += rotate
    mesh.current.rotation.y += rotate
  }, [])
  
  useFrame(() => {
    mesh.current.rotation.x += 0.002
    mesh.current.rotation.y += 0.002
  })

  const springs = useSpring({
      scale: colorful ? [1.25, 1.25, 1.25] : [1, 1, 1],
      color: hovered ? '#FFFFFF' : '#555555'
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
      {/* <a.meshStandardMaterial color={springs.color} /> */}

      {colorful && !hovered ?
        <meshNormalMaterial attach="material"/>
      : 
        <a.meshStandardMaterial color={springs.color}/>
      }

    </a.mesh>
  )
}

const FlashLight = ({colorful}) => {
  const mesh = useRef(null)

  const springs = useSpring({
    intensity: colorful ? 7 : 0
  })

  return (
    <a.pointLight ref={mesh} castShadow position={[0, -1, 0]} intensity={springs.intensity} color="white"/>
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

const Scene = ({children, mouse, touchDevice}) => {  
    const { camera, gl } = useThree()
    const controlRef = useRef(null)


    return (
      <>
        <color attach="background" args={['#000']} />
        <fog attach="fog" near={0} far={30} color="#000" />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeBufferGeometry attach="geometry" args={[1000, 1000]}/>
          <meshStandardMaterial attach="material" color="#333" />
        </mesh>
        {children}
        { touchDevice ? 
          <orbitControls args={[camera, gl.domElement]} ref={controlRef} enableZoom={false} enablePan={false} enableKey={false}/>
        :
          <Rig mouse={mouse} />
        }
    </>
    )
  }
  
  const CanvasApp = ({colorful, touchDevice}) => {
    const mouse = {
      current: useMouse()
    }

    const screen = useResize().width
    const adjustWide = screen < 600 ? 600/1300 : screen/1300

    const [lightPos, setlightPos] = useState({x: 0, y: 0})
    // const [colorful, setcolorful] = useState(false)
    
    return (
      <>
      <Canvas 
        shadowMap 
        colorManagement 
        // onPointerOver={() => setcolorful(!drawerTransition)}
        // onPointerOut={() => setcolorful(false)}
        onMouseMove={e => setlightPos({x: e.clientX - window.innerWidth/2, y: e.clientY - 60 -348/2})}
        camera={{ position: [0, 0, 10], fov: 25 }}>
        <Scene mouse={mouse} touchDevice={touchDevice}>
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
          
          <FlashLight lightPos={lightPos} colorful={colorful}/>

          <Box position={[adjustWide*-5, 1, 0]} rotate={10} args={[1, 1, 1]} colorful={colorful}/>
          <Box position={[adjustWide*-5.5, -1, -3]} rotate={40} args={[1, 1, 1]} colorful={colorful}/>
          <Box position={[adjustWide*-5, 1, 4]} rotate={110} args={[1, 1, 1]} colorful={colorful}/>

          <Box position={[adjustWide*5, 0, 0]} rotate={30} args={[1, 1, 1]} colorful={colorful}/>
          <Box position={[adjustWide*6, 2, 0]} rotate={60} args={[1, 1, 1]} colorful={colorful}/>
          <Box position={[adjustWide*4, 0, 5]} rotate={110} args={[1, 1, 1]} colorful={colorful}/>
          {/* <Box args={[0.05, 0.05, 0.05]} position={[0, 0, 0]} /> */}
        </Scene>
      </Canvas>
  </>
  )
}
  
  export default CanvasApp