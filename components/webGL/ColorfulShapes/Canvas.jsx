import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber/web.cjs'
import { useSpring, a } from 'react-spring/three.cjs'
import './setupRegTHREE'
import 'three/examples/js/controls/OrbitControls'

extend({ OrbitControls: THREE.OrbitControls });

const Box = (props) => {
    const mesh = useRef()
    const [hovered, setHover] = useState(false)
    
    useFrame(() => {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })

    const springs = useSpring({
        scale: hovered ? [1.4, 1.4, 1.4] : [1, 1, 1],
        color: hovered ? '#FF5B14' : '#DADADA'
    })
    
    return (
      <a.mesh
        {...props}
        ref={mesh}
        scale={springs.scale}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}>
        <boxBufferGeometry args={[1, 1, 1]} />
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
    const {
        camera,
        gl: { domElement }
    } = useThree()

    return (
      <>
        {children}
        <orbitControls args={[camera, domElement]} enableZoom={false}/>
        <Rig mouse={mouse} />
    </>
    )
}
  
const CanvasApp = () => {
  const mouse = useRef([0, 0])
  
  return (
    <>
      <Canvas 
        shadowMap 
        colorManagement 
        camera={{ position: [0, 0, 10], fov: 25 }} 
        onMouseMove={e => (mouse.current = [e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2])}>
        <Scene mouse={mouse}>
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