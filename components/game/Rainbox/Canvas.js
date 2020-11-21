import React, { useRef, useEffect, useState } from 'react'
import Styled from '@emotion/styled'

const Canvas = () => {
    const canvasRef = useRef(null)
    // const screenHeight = useResize().height
    // const screenWidth = useResize().width
    
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        
        const screenHeight = window.innerHeight
        const screenWidth = window.innerWidth

        canvas.width = screenWidth
        canvas.height = screenHeight-60
        //Our first draw
        ctx.fillStyle = '#ddd'
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        
        
        function Dude(posX){
            this.velocity = 0
            this.Width = 50
            this.Height = 50
            this.Color = "#FF5B14"
            this.blur = 25;
            this.shadow = 'orange';
            this.Position = {X: posX, Y: screenHeight-this.Height-60}
            
            this.Draw = function(){
                ctx.shadowColor = this.shadow;
                ctx.shadowBlur = this.blur;
                ctx.fillStyle = this.Color;
                ctx.beginPath();
                ctx.rect(this.Position.X, this.Position.Y, 50, 50);
                ctx.fill();
            }
            
            this.update = function(){
                if (!(this.Position.X + this.velocity < 0 || this.Position.X + this.velocity > screenWidth - 50)){    
                    this.Position.X += this.velocity
                }
                console.log(this.Position.X);
                this.Draw()
            }
        }

        var dude = new Dude(screenWidth/2);


        const Updater = () => {
            console.log('updating');
            ctx.clearRect(0, 0, screenWidth, screenHeight);
            dude.update();
        }

        let isLeftPressed = false
        let isRightPressed = false

        const controlling = (e) => {
            console.log('haha');
            console.log(e.which);
            if (e.which == 65 || e.which == 37){
                isLeftPressed = true
                dude.velocity = -5
            } else if (e.which == 68 || e.which == 39){
                isRightPressed = true
                dude.velocity = 5;
            }
        }
        
        const uncontrolling = (e) => {
            if (e.which == 65 || e.which == 37){
                isLeftPressed = false
                if(isRightPressed){
                    dude.velocity = 5
                }else{
                    dude.velocity = 0
                }                    
            } else if (e.which == 68 || e.which == 39){
                isRightPressed = false
                if(isLeftPressed){
                    dude.velocity = -5
                }else{
                    dude.velocity = 0
                }                    
            }
        }

        document.addEventListener('keydown', controlling)
        document.addEventListener('keyup', uncontrolling)
        
        
        const interval = setInterval(() => Updater(), 10);
        return () => {
            clearInterval(interval)
            document.removeEventListener('keyup', uncontrolling)
            document.removeEventListener('keydown', controlling)
        }
    }, [])

    return (
    <Wrapper>
        {/* <button onClick={() => handleVelocity(5)}>kanan</button>
        <button onClick={() => handleVelocity(-5)}>kiri</button> */}
        <canvas ref={canvasRef} />
    </Wrapper>
    )
}


const Wrapper = Styled.div(() =>`
    background: url('/img/bg3d.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    canvas{
        height: 100%;
    }
`)

export default Canvas;
