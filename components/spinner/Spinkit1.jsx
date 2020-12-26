import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
    
const Spinkit1 = () => {
    const [removeDisplay, setremoveDisplay] = useState(false)
    const [isLoaded, setisLoaded] = useState(false)
    const [showMessage, setshowMessage] = useState(false)

    const remover = () => {
        setisLoaded(true)
        setTimeout(() => {
            setremoveDisplay(true)
        }, 1000)
    }
    
    useEffect(() => {
        window.onload = remover
        const timeout = setTimeout(remover, 2000)
        // const fallbackRemover = setTimeout(() => setshowMessage(true), 9000)

        return () => {
            clearTimeout(timeout)
            // clearTimeout(fallbackRemover)
        }
    }, [])

    return (
    <>
        {!removeDisplay && 
            <Wrapper isLoaded={isLoaded} showMessage={showMessage}>
                <div className="loading">
                    <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                    {/* <p>HAVE A NICE DAY!</p> */}
                    <p className="p1">Try refreshing your browser</p>
                    <p className="p2">This might be your internet connection or your browser doesn't support webGL</p>
                </div>
            </Wrapper>
        }
    </>
    )
}
    
const Wrapper = Styled.div(({isLoaded, showMessage}) =>`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(245,245,245);
    opacity: ${isLoaded ? 0 : 1};
    transition: 1s;
    z-index: 50;
    top: 0;
    left: 0;
    padding-bottom: 10%;

    .loading{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: calc(100% - 60px);
        top: 0;
    }

    .spinner {
        opacity: ${isLoaded ? 0 : 1};
        margin: 100px auto;
        margin-top: 48px;
        margin-bottom: 68px;
        height: 50px;
        text-align: center;
        font-size: 10px;
    }
    
    .spinner > div {
        background-color: #333;
        height: 100%;
        width: 6px;
        display: inline-block;
        margin-right: 2px;
        margin-left: 2px;
        
        -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
        animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }
    
    .spinner .rect2 {
        background-color: #FF5B14;
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
    
    .spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }
    
    .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
    
    .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
    
    @-webkit-keyframes sk-stretchdelay {
        0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
        20% { -webkit-transform: scaleY(1.0) }
    }
    
    @keyframes sk-stretchdelay {
        0%, 40%, 100% { 
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
        }  20% { 
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
        }
    }

    p{
        position: absolute;
        bottom: 0;
        width: 320px;
        text-align: center;
        opacity: ${showMessage ? 1 : 0};
        transition: 0.5s;
    }
    .p1{
        font-size: 18px;
        margin-bottom: 16px;
        bottom: 32px;
    }
    .p2{
        font-size: 14px;
        color: #acacac;
        transition-delay: 1s;
    }
`)
    
export default Spinkit1