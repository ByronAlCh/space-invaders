class BulletsNave {
    constructor(gameScreen, gameSize, navePos, naveSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        //this.naveSize = naveSize

        this.navePos = {
            top: navePos.top,
            left: navePos.left //por si aca
        }

        this.bulletPos = {
            left: navePos.left + naveSize.w, // esto es para que salga del extremo derecho
            top: navePos.top + naveSize.h / 2 // esto es para que salga del medio de la nave
        }

        this.bulletVel = {
            left: 10,
            //top y gravedad no necesitamos
        }

        this.bulletSize = {
            w: 40,
            h: 40
        }
        this.bulletsSprite = {
            backgroundPositionX: 0,
            totalFrames: 4,
            currentFrame: 1,
            frameSpeed: 40
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



        this.bulletElement.style.backgroundImage = 'url(./img/chupete2.png)'
        this.bulletElement.style.backgroundSize = '160px 40px'

        this.bulletElement.style.overflow = 'hidden'
        this.bulletElement.style.backgroundRepeat = 'no-repeat'
        this.bulletElement.style.backgroundPositionX = '0px'

        this.gameScreen.appendChild(this.bulletElement)
    }
    move(framesCounter) {
        this.animateSprite(framesCounter)
        this.bulletPos.left += this.bulletVel.left

        this.updatePosition()
    }

    animateSprite(framesCounter) {
        if (framesCounter % this.bulletsSprite.frameSpeed == 0) {
            this.bulletsSprite.currentFrame++
        }
        if (this.bulletsSprite.currentFrame >= this.bulletsSprite.totalFrames) {
            this.bulletsSprite.currentFrame = 0
        }

        this.bulletsSprite.backgroundPositionX = -this.bulletSize.w * this.bulletsSprite.currentFrame
        this.updateSprite()
    }

    getNavePosition() {
        this.navePos.top = Game.nave.navePos.top
        this.navePos.left = Game.nave.navePos.left
        this.naveSize.width = Game.nave.naveSize.w
        this.naveSize.height = Game.nave.naveSize.h


    }

    updateSprite() {
        this.bulletElement.style.backgroundPositionX = `${this.bulletsSprite.backgroundPositionX}px`
    }

    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`//no nos hace falta

    }





}