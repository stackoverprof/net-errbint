import React, { useRef, useEffect } from 'react'
import Styled from '@emotion/styled'
import useResize from 'use-resizing'

const Canvas = ({setgameStatus}) => {
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
        let isRightPressed = false
        let isLeftPressed = false
        let isAttempted = false
        let food = {}

        const firstAttempt = () => {
            if(!isAttempted){
                setgameStatus('running')
                isAttempted = true
                colorbox = "#888888"
                colortrail0 = "rgba(200,200,200,1)"
                colortrail1 = "rgba(200,200,200,0)"        
                food = new Food()
                dude = new Dude(dude.Position.X, 30, 30)
            }
        }
        
        const controlling = (e) => {
            if (e.which == 65 || e.which == 37){
                isLeftPressed = true
                dude.Velocity = -5
                firstAttempt()
            } else if (e.which == 68 || e.which == 39){
                isRightPressed = true
                dude.Velocity = 5
                firstAttempt()
            } else if (e.which == 13 && isGameOver) {
                NewGame()
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

            this.LifeSpan = new Date().getTime()
            this.EatCount = 0
            
            this.Position = {
                X: posX, 
                Y: screenHeight-this.Height-60
            }

            this.checkCollisions = () => {
                for (let i in shapes){
                    if (
                        this.Position.X <= shapes[i].Position.X + shapes[i].Width &&
                        this.Position.X + this.Width >= shapes[i].Position.X &&
                        this.Position.Y + this.Height >= shapes[i].Position.Y &&
                        this.Position.Y <= shapes[i].Position.Y + shapes[i].Height 
                        ){
                            GameOver()
                        }
                }
            }

            this.checkEaten = function(){        
                if(dude.Position.X <= food.PosX + food.Width && dude.Position.X + dude.Width >= food.PosX){
                    this.EatCount++
                    food = new Food()
                }
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
                
                this.checkCollisions()
                this.checkEaten()
                this.Draw()
            }
        }
        

////////THE RAIN OBJECT
        let shapes = {}
        let shapeIndex = 0 
        let fallSpeed = 4
        let accel = 5
        let colortrail0 = "rgba(220,220,220,1)"
        let colortrail1 = "rgba(220,220,220,0)"
        let colorbox = "rgb(210,210,210)"

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
                this.Position.Y += this.Velocity
                this.Draw(0)
                this.Draw(1)
            }
        }


/////////THE FOOD OBJECT
        function Food(){
            this.Width = 20;
            this.Height = 20;
            this.Color = "#FF5B14";
            this.shadow = 'orange';
            this.blur = 25
            this.distance = 50
            
            let randomPos
            do randomPos = Math.random()*(screenWidth-this.Width)
            while (randomPos >= dude.Position.X - (this.Width + this.distance) && randomPos <= dude.Position.X + dude.Width + this.distance)
            
            this.PosX = randomPos
        
            this.Draw = function(){
                ctx.shadowColor = this.shadow;
                ctx.shadowBlur = this.blur;
                ctx.beginPath();
                ctx.rect(this.PosX, screenHeight-98, this.Width, this.Width);
                ctx.fillStyle = this.Color;
                ctx.fill();
            }
        
            this.Update = function(){
                this.Draw();
            }
            
        }

/////////GAME OVER HANDLER        
        const GameOver = () => {
            if(!isGameOver){
                dude.LifeSpan = new Date().getTime() - dude.LifeSpan
                isGameOver = true
                food = {}
                setgameStatus('over')
                console.log(dude.EatCount + " " + dude.LifeSpan)
            }
        }
        
        
/////////NEW GAME HANDLER
        const newGameBtn = document.getElementById('newgame-btn')
        
        const NewGame = () => {
            isGameOver = false
            setgameStatus('running')
            dude = new Dude(dude.Position.X, 30, 30)
            food = new Food()
            shapes = {}
        }
        newGameBtn.addEventListener('click', NewGame)


/////////RUNNING GAME
        const startingPosition = screenWidth/2

        let dude = new Dude(startingPosition)
        
        let isGameOver = false

        setgameStatus('initial')

        const Updater = setInterval(() => {
            ctx.clearRect(0, 0, screenWidth, screenHeight)
            for(let i in shapes){
                shapes[i].update()
            }
            dude.Update()
            if(!isGameOver && isAttempted) food.Update()
        }, 10)
        
        const GenerateRain = setInterval(() => {
            if (!isGameOver){
                let randomPos = Math.random()*screenWidth

                if (!isAttempted){
                    if (randomPos > dude.Position.X-40 && randomPos < dude.Position.X+60){
                        new Rain(0)
                    }else{
                        new Rain(randomPos)
                    }

                }else{
                    new Rain(randomPos)
                }
            }
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
        
            .nav-filler{
                height: 60px;
                width: 100%;
                background: black;
            }
        }
`)

export default Canvas
