import React, { useRef, useEffect } from 'react'
import Styled from '@emotion/styled'
import useResize from 'use-resizing'

const Canvas = () => {
    const canvasRef = useRef(null)
    const screenUseHeight = useResize().height
    const screenUseWidth = useResize().width
    
/////////GAMESCRIPT START

useEffect(() => {
/////////CANVAS INITIALIZATION
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        
        let screenHeight = window.innerHeight
        let screenWidth = window.innerWidth
        
        canvas.width = screenWidth
        canvas.height = screenHeight-60
        
/////////SCREEN RESIZE HANDLER
        const reportWindowSize = () => {
            screenWidth = window.innerWidth
            screenHeight = window.innerHeight
            canvas.width = screenWidth
            canvas.height = screenHeight-60

            dude.Position.Y = screenHeight-dude.Height-60
        }
        window.addEventListener('resize', reportWindowSize)
        

/////////CONTROLLER - KEYBOARD EVENT HANDLER
        let isLeftPressed = false
        let isRightPressed = false
        
        const controlling = (e) => {
            if (e.which == 65 || e.which == 37){
                isLeftPressed = true
                dude.Velocity = -5
            } else if (e.which == 68 || e.which == 39){
                isRightPressed = true
                dude.Velocity = 5
            }
        }
        document.addEventListener('keydown', controlling)
        
        const uncontrolling = (e) => {
            if (e.which == 65 || e.which == 37){
                isLeftPressed = false
                dude.Velocity = isRightPressed ? 5 : 0                
            }else if (e.which == 68 || e.which == 39){
                isRightPressed = false
                dude.Velocity = isLeftPressed ? -5 : 0
            }
        }
        document.addEventListener('keyup', uncontrolling)


/////////THE DUDE (PLAYER) OBJECT 
        function Dude(posX){
            this.Color = "#FF5B14"
            this.Shadow = 'orange'
            this.Velocity = 0
            this.Height = 50
            this.Width = 50
            this.Blur = 25

            this.Position = {
                X: posX, 
                Y: screenHeight-this.Height-60
            }
            
            this.Draw = () => {
                ctx.shadowColor = this.Shadow
                ctx.shadowBlur = this.Blur
                ctx.fillStyle = this.Color
                ctx.beginPath()
                ctx.rect(this.Position.X, this.Position.Y, 50, 50)
                ctx.fill()
            }
            
            this.Update = () => {
                if (!(this.Position.X + this.Velocity < 0 || this.Position.X + this.Velocity > screenWidth - 50)){    
                    this.Position.X += this.Velocity
                }else if(this.Position.X > screenWidth - 50){
                    this.Position.X = screenWidth - 52
                }
                this.Draw()
            }
        }

////////THE RAIN OBJECT
        let shapes = {}
        let shapeIndex = 0 
        let fallSpeed = 4
        let accel = 5
        let colorbox = "rgb(210,210,210)"
        let colortrail0 = "rgba(220,220,220,1)"
        let colortrail1 = "rgba(220,220,220,0)"

        function Rain(posX) {
            this.Width = 30
            this.Height = 30
            this.Color = "#000000"
            this.gradient = ctx.createLinearGradient(0,400, 0,250)
            this.shadow = 'rgba(0,0,0,0)'
            this.blur = 0

            // Add color stops
            this.gradient.addColorStop(0, '#000000')
            this.gradient.addColorStop(.2, '#000000')
            this.gradient.addColorStop(.2, '#555555')
            this.gradient.addColorStop(.4, '#555555')
            this.gradient.addColorStop(.4, '#999999')
            this.gradient.addColorStop(.6, '#999999')
            this.gradient.addColorStop(.6, '#C7C7C7')
            this.gradient.addColorStop(.8, '#C7C7C7')
            this.gradient.addColorStop(.8, '#F5F5F5')
            this.gradient.addColorStop(1, '#F5F5F5')

            this.Position = {
                X: posX,
                Y: -this.Height
            }
            this.Velocity = Math.random() * fallSpeed + accel
            this.Index = shapeIndex
        
            shapes[shapeIndex] = this
            shapeIndex++
        
            // this.checkCollisions = function() {
            //   if(this.Position.Y >= screenHeight){
            //     delete shapes[this.Index]
            //   }
            // }
            this.Draw = function(num) {
                ctx.beginPath()
                switch(num) {
                    case 0:
                        ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height)
                        this.colorin = colorbox
                        this.blur = '3'
                        this.shadowBlur = '5'
                        this.shadow = 'gray'
                    break
                    case 1:
                        ctx.rect(this.Position.X, this.Position.Y-120, this.Width, this.Height*4)
                        this.grd = ctx.createLinearGradient(screenHeight/2, this.Position.Y, screenHeight/2, this.Position.Y-120 )
                        this.grd.addColorStop(0, colortrail0)
                        this.grd.addColorStop(1, colortrail1)
                        this.colorin = this.grd
                        this.blur = '0'
                        this.shadow = 'rgba(0,0,0,0)'
                    break
                    default:
                    this.colorin = '#000000'
                }
                ctx.shadowColor = this.shadow
                ctx.shadowBlur = this.blur
                ctx.fillStyle = this.colorin
                ctx.fill()
            }
            this.update = function(){
                // this.checkCollisions()
                
                this.Position.Y += this.Velocity
                this.Draw(0)
                this.Draw(1)
            }
        }
/////////RUNNING GAME
        const dude = new Dude(screenWidth/2)

        const Updater = setInterval(() => {
            ctx.clearRect(0, 0, screenWidth, screenHeight)
            for(let i in shapes){
                shapes[i].update()
            }
            dude.Update()
        }, 10)
        
        const GenerateRain = setInterval(() => {
            new Rain(Math.random()*screenWidth)
        }, 100)
        
        
/////////USE EFFECT CLEAN-UP
        return () => {
            clearInterval(Updater)
            clearInterval(GenerateRain)
            document.removeEventListener('keyup', uncontrolling)
            document.removeEventListener('keydown', controlling)
            window.removeEventListener('resize', reportWindowSize)
        }
/////////END USE-EFFECT        
}, [])
/////////END GAMESCRIPT

    return (
        <Wrapper screenUseHeight={screenUseHeight} screenUseWidth={screenUseWidth}> 
            <div className="game-container">
                <canvas ref={canvasRef} />
                <div className="nav-filler"></div>
            </div>
        </Wrapper>
    )
}


const Wrapper = Styled.div(({screenUseHeight, screenUseWidth}) =>`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .game-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: column;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        
        background: url('/img/bg3d.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        
            canvas{
                // height: 1px;
                // height: ${screenUseHeight-60}px;
                // display: none;
            }

            .nav-filler{
                height: 60px;
                width: 100%;
                background: black;
            }
        }
`)

export default Canvas
