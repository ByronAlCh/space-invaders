class Lives {

    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        //this.bullets = [] para cuando metamos balas


        this.livesSize = {
            w: 50,
            h: 50
        }

        this.livesPos = {
            left: this.gameSize.w,
            top: Math.floor(Math.random() * this.gameSize.h)
            //base no creo que necesitemos
        }
        this.livesVel = {
            left: 10,
            top: 10,
        }

        this.init()

    }
    init() {
        this.livesElement = document.createElement('div')

        this.livesElement.style.position = 'absolute'
        this.livesElement.style.width = `${this.livesSize.w}px`
        this.livesElement.style.height = `${this.livesSize.h}px`
        this.livesElement.style.left = `${this.livesPos.left}px`
        this.livesElement.style.top = `${this.livesPos.top}px`

        this.livesElement.style.backgroundImage = 'url(./img/rosquilla.png)'
        this.livesElement.style.backgroundSize = '50px 50px'

        this.livesElement.style.overflow = 'hidden'
        this.livesElement.style.backgroundRepeat = 'no-repeat'
        this.livesElement.style.backgroundPositionX = '0px'

        document.querySelector('#game-screen').appendChild(this.livesElement)
    }
    move() {
        this.livesPos.top += 0
        this.livesPos.left -= this.livesVel.left
        this.updatePosition()

    }
    updatePosition() {
        this.livesElement.style.left = `${this.livesPos.left}px`
        this.livesElement.style.top = `${this.livesPos.top}px`

    }

}
