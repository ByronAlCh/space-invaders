class Bonus {

    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        //this.bullets = [] para cuando metamos balas


        this.bonusSize = {
            w: 50,
            h: 50
        }

        this.bonusPos = {
            left: this.gameSize.w,
            top: Math.floor(Math.random() * this.gameSize.h)
            //base no creo que necesitemos
        }
        this.bonusVel = {
            left: 10,
            top: 10,
        }

        this.init()

    }
    init() {
        this.bonusElement = document.createElement('div')

        this.bonusElement.style.position = 'absolute'
        this.bonusElement.style.width = `${this.bonusSize.w}px`
        this.bonusElement.style.height = `${this.bonusSize.h}px`
        this.bonusElement.style.left = `${this.bonusPos.left}px`
        this.bonusElement.style.top = `${this.bonusPos.top}px`
        this.bonusElement.style.borderRadius = '50%'


        this.bonusElement.style.backgroundImage = 'url(./img/duff.png)'
        this.bonusElement.style.backgroundSize = '50px 50px'

        this.bonusElement.style.overflow = 'hidden'
        this.bonusElement.style.backgroundRepeat = 'no-repeat'
        this.bonusElement.style.backgroundPositionX = '0px'

        document.querySelector('#game-screen').appendChild(this.bonusElement)
    }
    move() {
        this.bonusPos.top += 0
        this.bonusPos.left -= this.bonusVel.left
        this.updatePosition()

    }
    updatePosition() {
        this.bonusElement.style.left = `${this.bonusPos.left}px`
        this.bonusElement.style.top = `${this.bonusPos.top}px`

    }

}