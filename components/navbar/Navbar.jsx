import React from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
import Navmenu from './Navmenu'
import DropperDesktop from './dropper/Desktop'
import DropperMobile from './dropper/Mobile'
import useResize from 'use-resizing'

const Navbar = ({showDrawer, open, setopen, handleDrawer}) => {
    const screen = useResize().width
    
    return (
        <Wrapper screen={screen} open={open} showDrawer={showDrawer}>
            <div className="navbar">
                <div className="contain-size">
                    <Navmenu showDrawer={showDrawer} open={open} setopen={setopen}/>
                    <div className="nav-links nav-links-upper">
                        <div className="nav-links-inner">
                            <Link href="/">Profile</Link>
                            <Link href="/abilities">Abilities</Link>
                            <Link href="/projects">Projects</Link>
                            <Link href="/experiences">Experiences</Link>
                        </div>
                    </div>
                </div>
            </div>
            {screen > 600 ?
                <DropperDesktop open={open} />
            :
                <DropperMobile open={open} />
            }
            <div className="fake-scroller-nav" onClick={handleDrawer}></div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({screen, open, showDrawer}) =>`
    width: 100%;
    background: black;

    position: sticky;
    top: 0;
    z-index: 100;
    transition: ${screen > 600 ? '0.25s' : '0.5s'};
    

    .navbar{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .contain-size{
        max-width: 1192px;
        width: ${screen > 800 ? '90%' : '100%'};
        min-width: 320px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-links{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        overflow-x: scroll;

        .nav-links-inner{
            display: flex;
            justify-content: ${screen > 800 ? 'center' : 'flex-start'};
            align-items: center;
            ${screen < 800 ? 'padding: 0 64px 0 16px;' : ''}
            height: 100%;

        }


        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }
    .nav-links-upper::after{
        content: '';
        pointer-events: none;
        position: absolute;
        height: 60px;
        width: 100%;
        background: rgb(0,0,0);
        background: linear-gradient(90deg, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 85%);
    }

    a{
        font-family: 'Bahnschrift';
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        margin: 0 10px;
        color: #FFFFFF;

        &:hover{
            color: #ff7814;
        }
    }

    .fake-scroller-nav{
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 100%;
        background: #E5E5E5;

        ${screen < 600 ? 'display: none;' : ''}
    }
`)

export default Navbar