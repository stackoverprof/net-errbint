import React, { useState, useEffect } from 'react'
import Styled from '@emotion/styled'
import useResize from 'use-resizing'

const HomeScroller = ({elRef, showDrawer, handleDrawer}) => {
    const [el, setel] = useState({})
    const screen = useResize()

    useEffect(() => {
        setel(elRef.current)
    }, [elRef])

    return (
        <Wrapper onClick={handleDrawer} el={el} screen={screen} showDrawer={showDrawer}>
            <div className="scroll-offset">
                <div className="scroll-thing"></div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({el, screen, showDrawer}) =>`
    position: relative;
    height: 100%;
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* opacity: ${showDrawer ? 0 : 1}; */
    transition: ${showDrawer ? 0.2 : 0}s;
    transition-delay:  ${showDrawer ? 1 : 0}s;
    ${showDrawer ? 'pointer-events: none;' : ''}
    
    .scroll-offset{
        position: absolute;
        /* height: calc(100% - 4px); */
        box-shadow: inset 4px 0 2px -4px gray;
        height: ${showDrawer ? '60px' : '100%'};
        width: 100%;
        background: #E5E5E5;
        transition: 0.6s;
    }
    
    .scroll-thing{
        position: relative;
        top: ${(screen.height -screen.height * screen.height/el.scrollHeight)* el.scrollTop/el.scrollHeight}px;
        width: 100%;
        height: ${screen.height * screen.height/el.scrollHeight}px;
        background: #ACACAC;
        ${showDrawer ? 'height: 0; top: 60px;' : ''};
        transition: 0.2s;
        transition-delay:  ${showDrawer ? 0.6 : 0}s;
    }
`)

export default HomeScroller