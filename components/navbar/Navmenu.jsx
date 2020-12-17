import React from 'react'
import Styled from '@emotion/styled'

const Navmenu = ({showDrawer}) => {

    return (
        <Wrapper>
            <div className="hamburger"></div>
            <div className="text">
                <h2 className={`nav ${showDrawer ? 'hiding' : ''}`}>NAVIGATION</h2>
                <h2 className={`erb ${!showDrawer ? 'hiding' : ''}`}>ERRBINT</h2>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(() =>`
    width: 232px;
    height: 100%;
    background: #3A3A3A;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    transition: 0.1s;
    overflow-x: hidden;
    
    &:hover{
        background: #FF5B14;
    }

    .hamburger{
        height: 28px;
        width: 28px;
        background: #fff;
        margin-right: 12px;
    }

    .text{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;

        h2{
            position: absolute;
            font-family: 'Bahnschrift';
            color: white;
            padding-top: 4px;
            font-weight: 400;
            font-size: 20pt;
            transition: 2s;
            left: 0;
        }

        .hiding{
            left: 556px;
        }
        
    }
`)

export default Navmenu