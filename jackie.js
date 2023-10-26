class Jackie {
    constructor(gameScreen, gameSize, navePos) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        //this.bullets = [] para cuando metamos balas
        this.navePos = {
            top: navePos.top,
            left: navePos.left //por si aca
        }



        this.jackieSize = {
            w: 200,
            h: 200
        }

        this.jackiePos = {
            left: this.gameSize.w - 200,
            top: this.navePos.top
            //base no creo que necesitemos
        }
        this.jackieVel = {
            left: 0.02,
            top: 0.02,
        }

        this.limit = {
            top: 0,
            bottom: this.gameSize.h - this.jackieSize.h

        }

        this.bossSprite = {
            backgroundPositionX: 0,
            totalFrames: 3,
            currentFrame: 1,
            frameSpeed: 5
        }

        this.init()
        this.liveJackie = 5


    }
    init() {
        this.jackieElement = document.createElement('div')

        //this.jackieElement.style.display = 'none'
        this.jackieElement.style.position = 'absolute'
        this.jackieElement.style.width = `${this.jackieSize.w}px`
        this.jackieElement.style.height = `${this.jackieSize.h}px`
        this.jackieElement.style.left = `${this.jackiePos.left}px`
        this.jackieElement.style.top = `${this.jackiePos.top}px`


        this.jackieElement.style.backgroundImage = 'url(./img/malo1.png)'
        this.jackieElement.style.backgroundSize = '600px 200px'

        this.jackieElement.style.overflow = 'hidden'
        this.jackieElement.style.backgroundRepeat = 'no-repeat'
        this.jackieElement.style.backgroundPositionX = '0px'

        document.querySelector('#game-screen').appendChild(this.jackieElement)


    }
    move(framesCounter) {
        this.animateSprite(framesCounter)
        this.getNavePosition()
        const diferenciaDeMovimiento = this.navePos.top - this.jackiePos.top
        this.jackiePos.top = this.jackiePos.top + (diferenciaDeMovimiento * this.jackieVel.left)
        this.updatePosition()

    }

    animateSprite(framesCounter) {
        if (framesCounter % this.bossSprite.frameSpeed == 0) {
            this.bossSprite.currentFrame++
        }
        if (this.bossSprite.currentFrame >= this.bossSprite.totalFrames) {
            this.bossSprite.currentFrame = 0
        }

        this.bossSprite.backgroundPositionX = -this.jackieSize.w * this.bossSprite.currentFrame
        this.updateSprite()
    }

    shootJackie() {
        const numeroDisparos = Math.floor(Math.random() * 20) + 1;


    }
    getNavePosition() {
        this.navePos.top = Game.nave.navePos.top
    }
    updateSprite() {
        this.jackieElement.style.backgroundPositionX = `${this.bossSprite.backgroundPositionX}px`
    }
    updatePosition() {
        this.jackieElement.style.top = `${this.jackiePos.top}px`
    }

}