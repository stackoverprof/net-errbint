import React from 'react'
import Styled from '@emotion/styled'
import Canvas from './Canvas'

const ColorfulShapes = ({drawerTransition}) => {

    return (
        <Wrapper drawerTransition={drawerTransition}>
            <Canvas />
            <div className="content">
                <div className="h1">
                    <h1>Codes are Colorful</h1>
                </div>
                <div className="h2">
                    <h2>So is your life should be</h2>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({drawerTransition}) =>`
    position: relative;
    height: 348px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover .content div.h1{
        ${!drawerTransition ? 'height: 0;' : ''}
    }
    &:hover .content div.h2{
        ${!drawerTransition ? 'height: 100%;' : ''}
    }
    
    
    .content{
        position: absolute;
        width: 100%;
        height: 40%;
        top: 104.4px;
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
            width: 100%;
            height: 100%;
            
            transition: 1s;
            
            overflow: hidden;

            h1{
                position: absolute;
                top: 0;
                height: 139.2px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
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

            h2{
                position: absolute;
                bottom: 0;
                height: 139.2px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 64px;
            }
        }
    }
`)

export default ColorfulShapes