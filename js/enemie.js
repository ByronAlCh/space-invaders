class enemie {

    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        //this.bullets = [] para cuando metamos balas


        this.enemieSize = {
            w: 25,
            h: 25
        }

        this.enemiePos = {
            left: this.gameSize.w,
            top: Math.floor(Math.random() * this.gameSize.h)
            //base no creo que necesitemos
        }
        this.enemieVel = {
            left: 10,
            top: 10,
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
        this.enemieElement.style.backgroundColor = `pink`
        this.enemieElement.style.borderRadius = '50%'

        document.querySelector('#game-screen').appendChild(this.enemieElement)
    }
    move() {
        this.enemiePos.top += 0
        this.enemiePos.left -= this.enemieVel.left
        this.updatePosition()

    }
    updatePosition() {
        this.enemieElement.style.left = `${this.enemiePos.left}px`
        this.enemieElement.style.top = `${this.enemiePos.top}px`

    }

}

