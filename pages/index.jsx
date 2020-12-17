import React, { useState, useEffect, useRef } from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
import Navbar from '../components/navbar/Navbar'
    
const Index = () => {
    const [showDrawer, setshowDrawer] = useState(false)
    const mainContentRef = useRef()

    const handleDrawer = (e) => {
        if (e.wheelDelta < 0 && !showDrawer) {
            setshowDrawer(true)
        } else if(e.wheelDelta > 0 && showDrawer && mainContentRef.current.scrollTop <= 0) {
            setshowDrawer(false)
        }
    }

    useEffect(() => {
        document.addEventListener('wheel', handleDrawer)

        return () => {
            document.removeEventListener('wheel', handleDrawer)
        }
    }, [showDrawer])

    return (
        <Wrapper showDrawer={showDrawer}>
            <Rainbox />
            <div className="homepage">
                <Navbar showDrawer={showDrawer}/>
                <div className="main-content" ref={mainContentRef}>

                </div>
            </div>
        </Wrapper>
    )
}
    
const Wrapper = Styled.div(({showDrawer}) =>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    .homepage{
        position: fixed;
        width: 100%;
        height: 100%;
        top: ${showDrawer ? 0 : 'calc(100% - 60px)'};
        left: 0;
        background: black;
        transition: 0.6s;
    }

    .main-content{
        overflow-y: scroll;
        height: calc(100% - 60px);
        color: white;

        &::-webkit-scrollbar{
            width: 10px;
        }

        &::-webkit-scrollbar-track-piece{
            background-color: #FFF0;
        }

        &::-webkit-scrollbar-thumb{
            background-color: #CBCBCB;
            outline: 2px solid #FFF0;
            outline-offset: -2px;
            border: .1px solid #B7B7B7;
        }

        &::-webkit-scrollbar-thumb:hover{
            background-color: #909090;
        }
    }
`)
    
export default Index