import React, { useState } from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'

const ColorfulShapes = ({drawerTransition, showR3F}) => {
    const [flipText, setflipText] = useState(false)

    const handleHover = () => {
        if (!drawerTransition) setflipText(!flipText)
    }

    const handleunHover = () => {
        setflipText(false) 
    }

    return (
        <Wrapper flipText={flipText}>
            <div className="hoverable" onMouseOver={handleHover} onMouseOut={handleunHover}>
                {showR3F && <Canvas drawerTransition={drawerTransition} colorful={flipText}/>}
                <div className="content">
                    <div className="h1">
                        <h1>Hi There! Whatsup?</h1>
                    </div>
                    <div className="h2">
                        <h2>Salam kenal, Erbin</h2>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({flipText}) =>`
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
        height: 40%;
        top: 80px;
        left: 0;
        
        display: flex;
        justify-content: center;
        align-items: flex-start;      
        pointer-events: none;  
        
        div.h1{
            display: flex;
            justify-content: center;
            align-items: flex-start;

            position: absolute;
            top: 0;
            height: 100%;
            
            transition: 1s;
            
            overflow: hidden;
            ${flipText ? 'height: 0;' : ''}

            h1{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0;
                height: 139.2px;
                width: 100%;
                font-size: 64px;
            }
        }
        
        div.h2{
            display: flex;
            justify-content: center;
            align-items: flex-end;
            position: absolute;
            width: 100%;
            height: 0;
            bottom: 0;
            
            transition: 1s;
            
            overflow: hidden;
            ${flipText ? 'height: 100%;' : ''}

            h2{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                bottom: 0;
                height: 139.2px;
                font-size: 64px;
            }
        }
    }
`)

export default ColorfulShapes