import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'

const DropperDesktop = ({open}) => {

    return (
        <Wrapper open={open}>
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
                            <a target="_blank">
                                <img src="/img/icons/gh.svg"/>
                                <p className="n0">stackoverprof</p>
                            </a>
                        </Link>
                        <Link href="https://instagram.com/errbint">
                            <a target="_blank">
                                <img src="/img/icons/ig.svg"/>
                                <p className="n1">@errbint</p>
                            </a>
                        </Link>
                        <Link href="https://line.me/ti/p/FwXuuM_qrV">
                            <a target="_blank">
                                <img src="/img/icons/line.svg"/>
                                <p className="n2">@r.bintang11</p>
                            </a>
                        </Link>
                        <Link href="https://wa.me/628988355006">
                            <a target="_blank">
                                <img src="/img/icons/wa.svg"/>
                                <p className="n3">+62 8988355006</p>
                            </a>
                        </Link>
                        <Link href="https://www.linkedin.com/in/r-bintang-bagus-putra-angkasa-41a6b1188">
                            <a target="_blank">
                                <img src="/img/icons/lkdn.svg"/>
                                <p className="n4">R.Bintang Bagus</p>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({open}) =>`
    width: 100%;
        
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
        
        a{
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.75s;
            cursor: pointer;
            height: 100%;
            color: white;
            margin: 0;
            
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
                transition: 0.75s;
                text-align: left;
            }

        }
    }

`)

export default DropperDesktop