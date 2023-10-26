class Nave {
    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.liveNave = 3
        this.bulletsNave = []

        this.naveSize = {
            w: 75,
            h: 75
        }

        this.navePos = {
            left: 50,
            top: this.gameSize.h / 2 - this.naveSize.h
            //base no creo que necesitemos
        }
        this.naveVel = {
            left: 5,
            top: 5,
        }

        this.limit = {
            top: 0,
            bottom: this.gameSize.h - this.naveSize.h

        }
        this.actions = {
            top: false,
            bottom: false
        }
        this.liveNave = 3


        this.naveSprite = {
            backgroundPositionX: 0,
            totalFrames: 3,
            currentFrame: 1,
            frameSpeed: 10
        }

        this.init()

    }
    init() {
        this.naveElement = document.createElement('div')

        this.naveElement.style.position = 'absolute'
        this.naveElement.style.width = `${this.naveSize.w}px`
        this.naveElement.style.height = `${this.naveSize.h}px`
        this.naveElement.style.left = `${this.navePos.left}px`
        this.naveElement.style.top = `${this.navePos.top}px`

        this.naveElement.style.borderRadius = '0%'

        this.naveElement.style.backgroundImage = 'url(./img/maggie1.png)'
        this.naveElement.style.backgroundSize = '225px 75px'

        this.naveElement.style.overflow = 'hidden'
        this.naveElement.style.backgroundRepeat = 'no-repeat'
        this.naveElement.style.backgroundPositionX = '0px'


        document.querySelector('#game-screen').appendChild(this.naveElement)



    }


    move(framesCounter) {
        this.animateSprite(framesCounter)
        this.moveTop()
        this.moveBottom()
        this.updatePosition()
        this.bulletsNave.forEach(eachBullet => {
            eachBullet.move()
            eachBullet.updatePosition()
        }) //esto invoca la función de movimiento para cada bala
        this.clearBullets()



    }
    animateSprite(framesCounter) {
        if (framesCounter % this.naveSprite.frameSpeed == 0) {
            this.naveSprite.currentFrame++
        }
        if (this.naveSprite.currentFrame >= this.naveSprite.totalFrames) {
            this.naveSprite.currentFrame = 0
        }

        this.naveSprite.backgroundPositionX = -this.naveSize.w * this.naveSprite.currentFrame
        this.updateSprite()
    }


    // stopNaveMove() {
    //     cancelAnimationFrame(this.animationFrame);
    // }

    /* shoot() { DE MOMENTO LO DEJAMOS AQUÍ --> VA A QUEDAR EN GAME
         this.bulletsNave.push(new BulletsNave(this.gameScreen, this.navePos, this.naveSize))
     } */
    moveTop() {
        if (this.actions.top && this.navePos.top > this.limit.top) {
            this.naveElement.style.top = `${this.navePos.top}px`;
            this.navePos.top -= this.naveVel.top
        }



    }
    moveBottom() {
        if (this.actions.bottom && this.navePos.top < this.limit.bottom) {
            this.naveElement.style.top = `${this.navePos.top}px`;
            this.navePos.top += this.naveVel.top
        }

    }

    updateSprite() {
        this.naveElement.style.backgroundPositionX = `${this.naveSprite.backgroundPositionX}px`
    }

    updatePosition() {
        this.naveElement.style.top = `${this.navePos.top}px`
        this.naveElement.style.bottom = `${this.navePos.bottom}px`

    }
    clearBullets() {
        this.bulletsNave.forEach((eachBullet, idx) => {
            if (eachBullet.bulletPos.left >= this.gameSize.w) {
                eachBullet.bulletElement.remove()
                this.bulletsNave.splice(idx, 1)
            }
        })
    }

}