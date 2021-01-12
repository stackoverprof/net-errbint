import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const CV = () => {
    const Router = useRouter()

    useEffect(() => {
        Router.push('https://drive.google.com/drive/folders/1NrqRHTAxg_E43Q3-bFoplH-FD24TKeV4?usp=sharing')
    }, [])

    return <></>
}

export default CV