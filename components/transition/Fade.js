import React from 'react'
import { motion } from 'framer-motion'

const Fade = ({children}) => {
    const motionVariants = {
        initial: { opacity: 0 },
        enter: { 
            opacity: 1, 
            transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] }
        }
    }
    
    return (
        <motion.div initial="initial" animate="enter" exit="exit" variants={motionVariants}>
            { children }
        </motion.div>
    )
}

export default Fade
