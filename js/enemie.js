class enemie {

    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        //this.bullets = [] para cuando metamos balas


        this.enemieSize = {
            w: 100,
            h: 100
        }

        this.enemiePos = {
            left: this.gameSize.w,
            top: Math.floor(Math.random() * this.gameSize.h)
            //base no creo que necesitemos
        }
        this.enemieVel = {
            left: 5,
            top: 10,
        }

        this.enemieSprite = {
            backgroundPositionX: 0,
            totalFrames: 3,
            currentFrame: 1,
            frameSpeed: 10
        }
        this.init()

    }
    init() {
        this.enemieElement = document.createElement('div')

        this.enemieElement.style.position = 'absolute'
        this.enemieElement.style.width = `${this.enemieSize.w}px`
        this.enemieElement.style.height = `${this.enemieSize.h}px`
        this.enemieElement.style.left = `${this.enemiePos.left}px`
        this.enemieElement.style.top = `${this.enemiePos.top}px`


        this.enemieElement.style.backgroundImage = 'url(./img/bug1.png)'
        this.enemieElement.style.backgroundSize = '300px 100px'

        this.enemieElement.style.overflow = 'hidden'
        this.enemieElement.style.backgroundRepeat = 'no-repeat'
        this.enemieElement.style.backgroundPositionX = '0px'


        document.querySelector('#game-screen').appendChild(this.enemieElement)
    }
    move(framesCounter) {
        //que sume a la veloxidad actual
        this.animateSprite(framesCounter)


        this.enemiePos.top += 0
        this.enemiePos.left -= this.enemieVel.left
        this.updatePosition()

    }

    animateSprite(framesCounter) {
        if (framesCounter % this.enemieSprite.frameSpeed == 0) {
            this.enemieSprite.currentFrame++
        }
        if (this.enemieSprite.currentFrame >= this.enemieSprite.totalFrames) {
            this.enemieSprite.currentFrame = 0
        }
        this.enemieSprite.backgroundPositionX = -this.enemieSize.w * this.enemieSprite.currentFrame
        this.updateSprite()
    }
    updateSprite() {
        this.enemieElement.style.backgroundPositionX = `${this.enemieSprite.backgroundPositionX}px`
    }
    updatePosition() {
        this.enemieElement.style.left = `${this.enemiePos.left}px`
        this.enemieElement.style.top = `${this.enemiePos.top}px`

    }

}

