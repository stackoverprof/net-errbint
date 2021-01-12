import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Figma = () => {
    const Router = useRouter()

    useEffect(() => {
        Router.push('https://www.figma.com/file/wqlwjbkmqrIrG2pgqW2r1v/Hall-Design')
    }, [])

    return <></>
}

export default Figma