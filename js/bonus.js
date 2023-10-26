class Bonus {

    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        //this.bullets = [] para cuando metamos balas


        this.bonusSize = {
            w: 25,
            h: 25
        }

        this.bonusPos = {
            left: this.gameSize.w,
            top: Math.floor(Math.random() * this.gameSize.h)
            //base no creo que necesitemos
        }
        this.bonusVel = {
            left: 15,
            top: 15,
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
        this.bonusElement.style.backgroundColor = `white`
        this.bonusElement.style.borderRadius = '50%'

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