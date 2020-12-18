import React, { useState } from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
import Navmenu from './Navmenu'

const Navbar = ({showDrawer}) => {
    const [open, setopen] = useState(false)
    
    return (
        <Wrapper open={open} showDrawer={showDrawer}>
            <div className="navbar">
                <div className="contain-size">
                    <Navmenu showDrawer={showDrawer} open={open} setopen={setopen}/>
                    <div className="nav-links">
                        <Link href="/">Profile</Link>
                        <Link href="/abilities">Abilities</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/experiences">Experiences</Link>
                    </div>
                </div>
            </div>
            <div className="dropper">
                <div className="contain-size">
                    <div className="nav-links">
                        <Link href="/">Home</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/about">About</Link>
                        <Link href="/guestbook">Help</Link>
                    </div>
                    <div className="sosmed">
                        <Link href="https://github.com/stackoverprof/">
                            <div>
                                <img src="/img/icons/gh.svg" alt=""/>
                                <p className="n0">stackoverprof</p>
                            </div>
                        </Link>
                        <Link href="https://instagram.com/errbint">
                            <div>
                                <img src="/img/icons/ig.svg" alt=""/>
                                <p className="n1">@errbint</p>
                            </div>
                        </Link>
                        <Link href="https://line.me/ti/p/FwXuuM_qrV">
                            <div>
                                <img src="/img/icons/line.svg" alt=""/>
                                <p className="n2">@r.bintang11</p>
                            </div>
                        </Link>
                        <Link href="https://wa.me/628988355006">
                            <div>
                                <img src="/img/icons/wa.svg" alt=""/>
                                <p className="n3">+62 8988355006</p>
                            </div>
                        </Link>
                        <Link href="https://www.linkedin.com/in/r-bintang-bagus-putra-angkasa-41a6b1188">
                            <div>
                                <img src="/img/icons/lkdn.svg" alt=""/>
                                <p className="n4">R.Bintang Bagus</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({open, showDrawer}) =>`
    height: 60px;
    width: 100%;
    background: black;

    position: relative;
    top: ${open && !showDrawer ? -60 : 0}px;
    z-index: 100;
    transition: 0.25s;

    .sosmed{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        
        &:hover img{
            opacity: 0.1;
        }

        img{
            transition: 0.25s;
            width: 24px;
            height: 24px;
            pointer-events: none;
        }
        
        div{
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.25s;
            cursor: pointer;
            height: 100%;
            
            
            &:hover img{
                opacity: 1;
            }
            
            &:hover p.n0{
                width: 132px;
            }
            &:hover p.n1{
                width: 88px;
            }
            &:hover p.n2{
                width: 120px;
            }
            &:hover p.n3{
                width: 150px;
            }
            &:hover p.n4{
                width: 146px;
            }
            &:hover p{
                color: white;
            }

            p{
                white-space: nowrap;
                font-family: 'Bahnschrift';
                font-style: normal;
                font-weight: normal;
                font-size: 20px;
                line-height: 24px;
                text-align: center;
                margin: 0 10px;
                color: #555;
                overflow: hidden;
                width: 0;
                transition: 0.25s;
                text-align: left;
            }

        }
    }

    .navbar{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dropper{
        width: 100%;
        height: ${open ? 60 : 0}px;
        background: #181818;
        overflow: hidden;
        transition: 0.25s;
        display: flex;
        justify-content: center;
        align-items: center;

        .contain-size{
            padding-left: 12px;
        }
    }

    .contain-size{
        max-width: 1192px;
        width: 90%;
        min-width: 720px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-links{
        display: flex;
        justify-content: center;
        align-items: center;

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
                color: rgb(255, 120, 20);
            }
        }
`)

export default Navbar