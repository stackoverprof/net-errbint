import React from 'react'
import Styled from '@emotion/styled'
import Link from 'next/link'

const DropperMobile = ({open}) => {

    return (
        <Wrapper open={open}>
            <div className="inner">
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
                        </a>
                    </Link>
                    <Link href="https://instagram.com/errbint">
                        <a target="_blank">
                            <img src="/img/icons/ig.svg"/>
                        </a>
                    </Link>
                    <Link href="https://line.me/ti/p/FwXuuM_qrV">
                        <a target="_blank">
                            <img src="/img/icons/line.svg"/>
                        </a>
                    </Link>
                    <Link href="https://wa.me/628988355006">
                        <a target="_blank">
                            <img src="/img/icons/wa.svg"/>
                        </a>
                    </Link>
                    <Link href="https://www.linkedin.com/in/r-bintang-bagus-putra-angkasa-41a6b1188">
                        <a target="_blank">
                            <img src="/img/icons/lkdn.svg"/>
                        </a>
                    </Link>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({open}) =>`
    width: 100%;
    height: ${open ? '110px' : 0};
    background: #181818;
    overflow: hidden;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .inner{
        height: 110px;
        min-height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .nav-links{
        min-height: 60px;
    }

    .sosmed{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-bottom: 12px;
        
        &:hover img{
            opacity: 0.1;
        }

        img{
            transition: 0.25s;
            width: 24px;
            height: 24px;
            pointer-events: none;
            margin: 0 6px;
            opacity: 0.3;
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
        }
    }

`)

export default DropperMobile