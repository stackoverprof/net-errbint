import { useEffect, useState } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState([0, -150]);

  useEffect(() => {
    const setFromEvent = e => setPosition([(e.clientX - window.innerWidth)/2 + window.innerWidth/4, (e.clientY - window.innerHeight)/2 + window.innerHeight/4 - 100]);
    window.addEventListener("mousemove", setFromEvent);

    return () => window.removeEventListener("mousemove", setFromEvent);
  }, []);

  return position;
};

export default useMousePosition;
