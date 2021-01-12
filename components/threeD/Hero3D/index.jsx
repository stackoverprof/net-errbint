import React, { useState, useEffect } from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'
import useResize from 'use-resizing'

const Hero3D = ({drawerTransition, touchDevice}) => {
    const [flipText, setflipText] = useState(false)

    const screen = useResize().width

    const handleHover = () => {
        setflipText(true)
    }
    
    const handleunHover = () => {
        if (!touchDevice) setflipText(false) 
    }

    useEffect(() => {
        if (touchDevice) setTimeout(handleHover, 2000)
    }, [touchDevice])

    return (
        <Wrapper flipText={flipText} screen={screen}>
            <div className="hoverable" 
                onMouseOver={handleHover} 
                onMouseOut={handleunHover} 
                onTouchStart={handleHover} 
                onTouchEnd={handleunHover}>

                <Canvas canvasHover={drawerTransition ? false : flipText} touchDevice={touchDevice}/>                

                <div className="content">
                    <div className="h1">
                        <h1>Hi There! Whatsup?</h1>
                    </div>
                    <div className="h2">
                        <h2>Welcome Aboard</h2>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({flipText, screen}) =>`
    position: relative;
    height: 348px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .hoverable{
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content{
        position: absolute;
        margin: 0 auto;
        width: 100%;
        height: 45%;
        top: 86px;
        left: 0;
        
        display: flex;
        justify-content: center;
        align-items: flex-start;      
        pointer-events: none;

        padding: 0 80px;
        
        div.h1{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            max-width: 80%;
            min-width: 380px;

            position: absolute;
            top: 0;
            height: 100%;
            
            transition: ${screen > 680 ? '1s' : '0.7s'};
            
            overflow: hidden;
            ${flipText ? 'height: 0;' : ''}

            h1{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0;
                height: 156.59px;
                width: 100%;
                font-size: 64px;
                text-align: center;
            }
        }
        
        div.h2{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            max-width: 80%;
            min-width: 380px;

            position: absolute;
            width: 100%;
            height: 0;
            bottom: 0;
            
            transition: ${screen > 680 ? '1s' : '0.7s'};
            
            overflow: hidden;
            ${flipText ? 'height: 100%;' : ''}

            h2{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                bottom: 0;
                height: 156.59px;
                font-size: 64px;
                text-align: center;
            }
        }
    }
`)

export default Hero3D