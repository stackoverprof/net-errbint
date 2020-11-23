import React, { useRef, useEffect } from 'react'
import Styled from '@emotion/styled'

const Canvas = ({setgameStatus, setscore, newGameBtnRef, briRef, nrRef, etRef}) => {
    const canvasRef = useRef()
    
    useEffect(() => {
    /////////GAMESCRIPT START
    
    /////////CANVAS INITIALIZATION 
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            const navbarOffset = 60
            
            let screenHeight = window.innerHeight
            let screenWidth = window.innerWidth
            
            canvas.width = screenWidth
            canvas.height = screenHeight - navbarOffset
            
    /////////SCREEN RESIZE HANDLER
            const reportWindowSize = () => {
                screenWidth = window.innerWidth
                screenHeight = window.innerHeight
                canvas.width = screenWidth
                canvas.height = screenHeight - navbarOffset

                dude.Position.Y = screenHeight - dude.Height - navbarOffset
            }
            window.addEventListener('resize', reportWindowSize)
            

    /////////FIRST ATTEMPT TO ENTER THE GAME
            let isAttempted = false

            const firstAttempt = () => { 
                if (!isAttempted){
                    
                isAttempted = true
                setgameStatus('running')
                
                RainConfig.colorbox = "#888888"
                RainConfig.colortrail0 = "rgba(200,200,200,1)"
                RainConfig.colortrail1 = "rgba(200,200,200,0)"

                food = new Food()
                dude.TimeStart = new Date().getTime()
                dude.TimeEnd = 'initial'
                dude.TimeSpan = new Date().getTime()
                
                // document.getElementById('game-container').requestFullscreen()
            }}

    /////////CONTROLLER - KEYBOARD EVENT HANDLER
            let isRightPressed = false
            let isLeftPressed = false

            const controlling = (e) => {
                if (e.which == 65 || e.which == 37){
                    //GO LEFT 
                    isLeftPressed = true
                    dude.Velocity = -5
                    firstAttempt()
                } else if (e.which == 68 || e.which == 39){
                    //GO RIGHT
                    isRightPressed = true
                    dude.Velocity = 5
                    firstAttempt()
                } else if (e.which == 13 && isGameOver) {
                    //PRESSING ENTER
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
                this.Height = 50
                this.Width = 50
                this.Shadow = 'orange'
                this.Color = "#FF5B14"
                this.Blur = 25
                this.Velocity = 0

                //Scoring things
                this.TimeStart = new Date().getTime()
                this.TimeEnd = 'initial'
                this.TimeSpan = new Date().getTime()
                this.EatCount = 0
                
                this.Position = {
                    X: posX, 
                    Y: screenHeight - this.Height - navbarOffset
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
                    GlimpseHandler(this.EatCount)
                    food = new Food()
                }}
                            
                this.Draw = () => {
                    ctx.shadowColor = this.Shadow
                    ctx.shadowBlur = this.Blur
                    ctx.fillStyle = this.Color
                    ctx.beginPath()
                    ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height)
                    ctx.fill()
                }
                
                this.Update = () => {
                    if (!(this.Position.X + this.Velocity < 0 || this.Position.X + this.Velocity > screenWidth - 50)){    
                        this.Position.X += this.Velocity
                    }else if (this.Position.X > screenWidth - this.Width){
                        this.Position.X = screenWidth - (this.Width+2)
                    }
                    
                    this.checkCollisions()
                    this.checkEaten()
                    this.Draw()
                }
            }
            

    ////////THE RAIN OBJECT
            const RainConfig = {
                colortrail0 : "rgba(220,220,220,1)",
                colortrail1 : "rgba(220,220,220,0)",
                colorbox : "rgb(210,210,210)",
                fallSpeed : 4,
                accel : 5,
                size : 30
            }

            function Rain(posX) {
                this.Height = RainConfig.size
                this.Width = RainConfig.size
                this.Velocity = Math.random() * RainConfig.fallSpeed + RainConfig.accel
                this.Index = shapeIndex
                this.Position = {
                    X: posX,
                    Y: -this.Height
                }
                
                shapes[shapeIndex++] = this
            
                this.DrawHead = function() {
                    ctx.beginPath()
                    ctx.rect(this.Position.X, this.Position.Y, this.Width, this.Height)
                    ctx.fillStyle = RainConfig.colorbox
                    ctx.shadowColor = 'gray'
                    ctx.shadowBlur = 3
                    ctx.fill()
                }

                this.DrawTrail = function() {
                    ctx.beginPath()
                    ctx.rect(this.Position.X, this.Position.Y-120, this.Width, this.Height*4)
                    this.TrailGradient = ctx.createLinearGradient(screenHeight/2, this.Position.Y, screenHeight/2, this.Position.Y-120 )
                    this.TrailGradient.addColorStop(0, RainConfig.colortrail0)
                    this.TrailGradient.addColorStop(1, RainConfig.colortrail1)
                    ctx.fillStyle = this.TrailGradient
                    ctx.shadowColor = 'rgba(0,0,0,0)'
                    ctx.shadowBlur = 0
                    ctx.fill()
                }

                this.Update = function(){
                    this.Position.Y += this.Velocity
                    this.DrawHead()
                    this.DrawTrail()
                }
            }


    /////////THE FOOD OBJECT
            function Food(){
                this.Width = 20
                this.Height = 20
                this.Color = "#FF5B14"
                this.Shadow = 'orange'
                this.Blur = 25
                this.distance = 50
                
                let randomPos
                do randomPos = Math.random()*(screenWidth-this.Width*3) + this.Width
                while (randomPos >= dude.Position.X - (this.Width + this.distance) && randomPos <= dude.Position.X + dude.Width + this.distance)
                
                this.PosX = randomPos
            
                this.Draw = function(){
                    ctx.beginPath()
                    ctx.rect(this.PosX, screenHeight- navbarOffset - this.Height*2, this.Width, this.Width)
                    ctx.shadowColor = this.shadow
                    ctx.shadowBlur = this.Blur
                    ctx.fillStyle = this.Color
                    ctx.fill()
                }
            
                this.Update = function(){
                    this.Draw()
                }            
            }


    /////////GAME OVER HANDLER        
            const GameOver = () => { 
                if (!isGameOver && isAttempted){

                dude.TimeSpan = new Date().getTime() - dude.TimeSpan
                dude.TimeEnd = new Date().getTime()
                dude.Shadow = 'black'
                dude.Color = 'black'

                setgameStatus('over')
                isGameOver = true
                food = {}
            }}
            
            
    /////////NEW GAME HANDLER
            const newGameBtn = newGameBtnRef.current
            
            const NewGame = () => {
                setgameStatus('running')
                isGameOver = false

                dude = new Dude(dude.Position.X)
                food = new Food()
                shapes = {}
            }
            newGameBtn.addEventListener('click', NewGame)


    /////////RUNNING GAME
            setgameStatus('initial')
            const startingPosition = screenWidth < 612 ? screenWidth/2-25 : screenWidth/2-306
            let dude = new Dude(startingPosition)
            let isGameOver = false
            let shapeIndex = 0 
            let shapes = {}
            let food = {}

            const calcTiming = () => {
                if (dude.TimeEnd != 'initial'){
                    return dude.TimeSpan
                }else{
                    return new Date().getTime() - dude.TimeStart 
                }
            }

            const Updater = setInterval(() => {
                setscore({
                    food: dude.EatCount, 
                    time: ((isAttempted ? calcTiming() : 0)/1000).toFixed(2)
                })

                //Reseting canvas
                ctx.clearRect(0, 0, screenWidth, screenHeight)

                //Then, redrawing objects
                if(!isGameOver && isAttempted) food.Update()
                for(let i in shapes) shapes[i].Update()
                dude.Update()
                
            }, 10)
            
            const GenerateRain = setInterval(() => {
                if (!isGameOver){
                let randomPos
                do randomPos = Math.random()*(screenWidth + RainConfig.size*2) - RainConfig.size
                while (!isAttempted && randomPos > dude.Position.X - RainConfig.size*2 && randomPos < dude.Position.X + RainConfig.size*2)
                new Rain(randomPos)
            }}, 100)
            
            
    /////////GLIMPSE HANDLER
            const animate = (element) => {
                element.style.opacity = 1

                setTimeout(() => {
                    element.style.opacity = 0
                }, 350)
            }

            const animateSpecial = (et, nr, bri) => {
                et.style.opacity = 1
                nr.style.opacity = 1
                bri.style.opacity = 1

                setTimeout(() => {
                    et.style.opacity = 0
                    nr.style.opacity = 0
                    bri.style.opacity = 0
                }, 350)
            }

            const glimpse = {
                bri: briRef.current,
                nr: nrRef.current,
                et: etRef.current
            }

            const GlimpseHandler = (score) => {
                const {et, nr, bri} = glimpse

                if(score % 10 == 0){
                    animateSpecial(et, nr, bri)
                    setTimeout(() => animateSpecial(et, nr, bri), 700)
                    setTimeout(() => animateSpecial(et, nr, bri), 1400)
                } else if (score % 5 == 0) {
                    animate(et)
                    setTimeout(() => animate(nr), 200)
                    setTimeout(() => animate(bri), 500)
                }
            } 


    /////////USE EFFECT CLEAN-UP
            return () => {
                window.removeEventListener('resize', reportWindowSize)
                document.removeEventListener('keyup', uncontrolling)
                document.removeEventListener('keydown', controlling)
                clearInterval(GenerateRain)
                clearInterval(Updater)
            }

    /////////END GAMESCRIPT
    }, []) /////////END USE-EFFECT  

    return (
        <Wrapper> 
            <canvas ref={canvasRef} />
        </Wrapper>
    )
}


const Wrapper = Styled.div(() =>`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
`)

export default Canvas
