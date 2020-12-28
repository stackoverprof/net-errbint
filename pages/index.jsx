import React, { useState, useEffect, useRef } from 'react'
import Styled from '@emotion/styled'
import Rainbox from '../components/game/Rainbox'
import Navbar from '../components/navbar/Navbar'
import HomeScroller from '../components/misc/HomeScroller'
import ColorfulShapes from '../components/webGL/ColorfulShapes/'
import useResize from 'use-resizing'
import { useSwipeable } from "react-swipeable"
    
const Index = ({isServer}) => {
    const [showDrawer, setshowDrawer] = useState(false)
    const [drawerTransition, setdrawerTransition] = useState(false)
    const [openNavbar, setopenNavbar] = useState(false)
    const homepageRef = useRef()
    const screen = useResize().width

    const drawerSwipe = useSwipeable({
        onSwipedUp: e => handleDrawer(e),
        onSwipedDown: e => handleDrawer(e)
    })

    const handleDrawer = (e) => {
        const triggerOpen = (e.wheelDelta < 0 || e.dir == 'Up') && !showDrawer
        const triggerClose = (e.wheelDelta > 0 || e.dir == 'Down') && showDrawer && homepageRef.current.scrollTop <= 0
        
        if ((e.type == 'click') || triggerOpen || triggerClose ){  
            setdrawerTransition(true)
            setshowDrawer(!showDrawer)
            
            setTimeout(() => {
                setdrawerTransition(false)
                homepageRef.current.scrollTo(0, 0)
            }, 600)
        }
    }

    useEffect(() => {
        document.addEventListener('wheel', handleDrawer)
        
        return () => {
            document.removeEventListener('wheel', handleDrawer)
        }
    }, [showDrawer])

    return (
        <Wrapper showDrawer={showDrawer} openNavbar={openNavbar} screen={screen} drawerTransition={drawerTransition}>
            <div {...drawerSwipe} className="home">
                <Rainbox isServer={isServer}/>
                <div className="homepage" ref={homepageRef}>
                    <Navbar showDrawer={showDrawer} open={openNavbar} setopen={setopenNavbar} handleDrawer={handleDrawer} elRef={homepageRef}/>
                    <div className="page-content">
                        <ColorfulShapes drawerTransition={drawerTransition}/>
                    </div>
                </div>
            </div>
            <HomeScroller elRef={homepageRef} showDrawer={showDrawer} handleDrawer={handleDrawer}/>
        </Wrapper>
    )
}

Index.getInitialProps = async (ctx) => {
    if(ctx.req) return {isServer : true}
    return {isServer : false}
}

const Wrapper = Styled.div(({showDrawer, openNavbar, screen, drawerTransition}) =>`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .home{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .homepage{
        position: fixed;
        width: 100%;
        height: 100%;
        top: ${showDrawer ? 0 : openNavbar ? screen > 600 ? 'calc(100% - 120px)' : 'calc(100% - 170px)' : 'calc(100% - 60px)'};
        left: 0;
        background: black;
        transition: all ${drawerTransition ? '0.6s' : screen > 600 ? '0.25s' : '0.5s'}, padding 0s;

        color: white;
        
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow-x: hidden;
        overflow-y: ${drawerTransition ? 'hidden' : 'scroll'};

        ${drawerTransition && screen > 600 ? 'padding-right: 10px;' : ''}

        ${drawerTransition && screen > 600 ? fakeScrollbar : ''}

        &::-webkit-scrollbar{
            width: 10px;
            ${screen < 600 ? 'display: none;' : ''}
        }

        &::-webkit-scrollbar-track-piece{
            background: #E5E5E5;
        }

        &::-webkit-scrollbar-thumb{
            background-color: ${showDrawer ? '#ACACAC' : '#E5E5E5'};

            transition: 0.6s;
        }

        &::-webkit-scrollbar-thumb:hover{
            background-color: #909090;
        }
    }

    .page-content{
        position: relative;
        height: calc(100% - 60px);
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        
        p{
            margin: 12px 0;
            max-width: 1000px;
            width: 90%;
            min-width: 320px;
        }
    }
`)

const fakeScrollbar = `&::after{
    position: absolute;
    content: '';
    height: 200%;
    width: 10px;
    top: 0;
    right: 0;
    background: #E5E5E5;
}`
    
export default Index