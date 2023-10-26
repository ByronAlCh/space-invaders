class BulletsJackie {
    constructor(gameScreen, gameSize, jackiePos, jackieSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        //this.naveSize = naveSize

        this.jackiePos = {
            top: jackiePos.top,
            left: jackiePos.left //por si aca
        }

        this.bulletPos = {
            left: jackiePos.left, // esto es para que salga del extremo derecho
            top: jackiePos.top + jackieSize.h / 2 // esto es para que salga del medio de la nave
        }

        this.bulletVel = {
            left: 15,
            //top y gravedad no necesitamos
        }

        this.bulletSize = {
            w: 40,
            h: 40
        }

        this.bulletsJackieSprite = {
            backgroundPositionX: 0,
            totalFrames: 3,
            currentFrame: 1,
            frameSpeed: 10
        }
        this.init()


    }
    init() {
        this.bulletElement = document.createElement('div')

        this.bulletElement.style.position = 'absolute'
        this.bulletElement.style.width = `${this.bulletSize.w}px`
        this.bulletElement.style.height = `${this.bulletSize.h}px`
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`


        this.bulletElement.style.backgroundImage = 'url(./img/biberon.png)'
        this.bulletElement.style.backgroundSize = '120px 40px'

        this.bulletElement.style.overflow = 'hidden'
        this.bulletElement.style.backgroundRepeat = 'no-repeat'
        this.bulletElement.style.backgroundPositionX = '0px'

        this.gameScreen.appendChild(this.bulletElement)
    }
    move(framesCounter) {
        this.animateSprite(framesCounter)
        this.bulletPos.left -= this.bulletVel.left

        this.updatePosition()
    }

    animateSprite(framesCounter) {
        if (framesCounter % this.bulletsJackieSprite.frameSpeed == 0) {
            this.bulletsJackieSprite.currentFrame++
        }
        if (this.bulletsJackieSprite.currentFrame >= this.bulletsJackieSprite.totalFrames) {
            this.bulletsJackieSprite.currentFrame = 0
        }

        this.bulletsJackieSprite.backgroundPositionX = -this.bulletSize.w * this.bulletsJackieSprite.currentFrame
        this.updateSprite()
    }

    getJackieposition() {
        this.navePos.top = Game.jackie.jackiePos.top
        this.navePos.left = Game.jackie.jackiePos.left
        this.naveSize.width = Game.jackie.jackiePos.w
        this.naveSize.height = Game.jackie.jackieSize.h


    }

    updateSprite() {
        this.bulletElement.style.backgroundPositionX = `${this.bulletsJackieSprite.backgroundPositionX}px`
    }

    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`//no nos hace falta

    }





}