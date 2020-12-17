import React from 'react'
import Link from 'next/link'
import Styled from '@emotion/styled'
import Navmenu from './Navmenu'

const Navbar = ({showDrawer}) => {

    return (
        <Wrapper>
            <div className="contain-size">
                <Navmenu showDrawer={showDrawer}/>
                <div className="nav-links">
                    <Link href="/profile">Profile</Link>
                    <Link href="/abilities">Abilities</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/experiences">Experiences</Link>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(() =>`
    height: 60px;
    width: 100%;
    background: black;

    position: sticky;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;

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

        a{
            font-family: 'Bahnschrift';
            font-style: normal;
            font-weight: normal;
            font-size: 20px;
            line-height: 24px;
            text-align: center;
            margin: 0 10px;
            color: #FFFFFF;
        }
    }
`)

export default Navbar