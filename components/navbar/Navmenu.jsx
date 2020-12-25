import React from 'react'
import Styled from '@emotion/styled'
import useResize from 'use-resizing'

const Navmenu = ({showDrawer, open, setopen}) => {
    const screen = useResize().width

    return (
        <Wrapper onClick={() => setopen(!open)} screen={screen} open={open}>
            <div className="background"></div>
            <div className="navmenu">
                <div className="three col">
                    <div className={`hamburger ${open ? 'is-active' : ''}`} id="hamburger-10">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
                {screen > 800 &&
                    <div className="text">
                        <h2 className={`nav ${showDrawer && open ? '' : showDrawer ? 'sidehide' : ''}`}>NAVIGATION</h2>
                        <h2 className={`erb ${!showDrawer || open ? 'sidehide' : ''}`}>ERRBINT</h2>
                    </div>
                }
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.div(({screen, open}) =>`
    position: relative;
    min-width: 64px;
    width: ${screen > 800 ? 232 : 64}px;
    height: 100%;
    transition: 0.1s;
    overflow-x: hidden;

    .navmenu{
        position: relative;
        height: 100%;
        display: flex;
        justify-content: ${screen > 800 ? 'space-between' : 'center'};
        align-items: center;
        padding-left: ${screen > 800 ? '22px' : '4px'};
    }

    .background{
        position: absolute;
        background: ${screen > 800 ? '#222' : '#2D2D2D'};
        height: 60px;
        width: ${open ? '0' : '100%'};
        transition: 1s;
        left:0;
    }
    
    &:hover .background{
        background: #111;
    }

    &:hover .three{
        transform: scaleX(1.15);
    }

    .col {
        display: block;
        float:left;
        margin: 1% 0 1% 1.6%;
    }
    
    .col:first-of-type {
      margin-left: 0;
    }
    
    .three{
        /* CLEARFIX */
        transition: 0.25s;

        .cf:before,
        .cf:after {
            content: " ";
            display: table;
        }
        
        .cf:after {
            clear: both;
        }
        
        .cf {
            *zoom: 1;
        }
        
        /* ALL */
        
        .row .three{
          padding: 80px 30px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          background-color: #2c3e50;
          color: #ecf0f1;
          text-align: center;
        }
        
        .hamburger .line{
          width: 28px;
          max-width: 28px;
          height: 4px;
          border-radius: 2px;
          background-color: #ecf0f1;
          display: block;
          margin: 6px auto;
          -webkit-transition: all 0.3s ease-in-out;
          -o-transition: all 0.3s ease-in-out;
          transition: all 0.3s ease-in-out;
        }
        
        
        #hamburger-10{
            -webkit-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
        }
        
        #hamburger-10.is-active{
            -webkit-transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -o-transform: rotate(90deg);
            transform: rotate(90deg);
        }
        
        #hamburger-10.is-active .line:nth-of-type(1){
            width: 7px
        }
        
        #hamburger-10.is-active .line:nth-of-type(2){
            width: 14px
        }
  
    }
        


    .text{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 172px;

        h2{
            position: absolute;
            font-family: 'Bahnschrift';
            color: white;
            padding-top: 4px;
            font-weight: 400;
            font-size: 20pt;
            transition: 2s;
            left: 0;
            text-align: center;
            width: 148px;
        }

        h2.nav{
            padding-left: 4px;
        }

        .sidehide{
            left: 556px;
        }
    }
`)

export default Navmenu