import { useEffect, useState } from "react"

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [posBefore, setposBefore] = useState({ x: 0, y: 0 })
  const [isMoving, setisMoving] = useState(false)

  const setFromEvent = e => {
    if(!isMoving) {
      setisMoving(true)
      console.log('start')
      console.log(isMoving)
    }

    setTimeout(() => {
      setposBefore({
        x: position.x,
        y: position.y
      })
      setPosition({ 
        x: (e.clientX - window.innerWidth/2)/100, 
        y: (e.clientY - window.innerHeight/2)/100
      })
    }, 250)
  }

  useEffect(() => {
    window.addEventListener("mousemove", setFromEvent)
    const checkStop = setInterval(() => {
      if (posBefore.x == position.x && posBefore.y == position.y && isMoving) {
        console.log('stop')
        setisMoving(false)
      }
      console.log('checking');
      console.log(posBefore.x)
      console.log(position.x)
    }, 1000)

    return () => {
        window.removeEventListener("mousemove", setFromEvent)
        clearInterval(checkStop)
    }
  }, [isMoving, posBefore, position])

  return position
}

export default useMousePosition
