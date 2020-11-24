import React from 'react'
import Styled from '@emotion/styled'
    
const Spinkit1 = ({isLoaded, removeDisplay}) => {

    return (
    <>
        {!removeDisplay && 
            <Wrapper isLoaded={isLoaded}>
                <div className="loading">
                    <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
                </div>
            </Wrapper>
        }
    </>
    )
}
    
const Wrapper = Styled.div(({isLoaded}) =>`
    z-index: 150;       
    
    .loading{
        opacity: ${isLoaded ? 0 : 1};
        transition: 1s;
        background-color: rgb(245,245,245);
        position: fixed;
        z-index: 50;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 10%;
    }
    .spinner {
        opacity: ${isLoaded ? 0 : 1};
        margin: 100px auto;
        height: 50px;
        text-align: center;
        font-size: 10px;
    }
    
    .spinner > div {
        background-color: #333;
        height: 100%;
        width: 6px;
        display: inline-block;
        margin-right: 2px;
        margin-left: 2px;
        
        -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
        animation: sk-stretchdelay 1.2s infinite ease-in-out;
    }
    
    .spinner .rect2 {
        background-color: #FF5B14;
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
    
    .spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }
    
    .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
    
    .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
    
    @-webkit-keyframes sk-stretchdelay {
        0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
        20% { -webkit-transform: scaleY(1.0) }
    }
    
    @keyframes sk-stretchdelay {
        0%, 40%, 100% { 
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
        }  20% { 
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
        }
    }
`)
    
export default Spinkit1