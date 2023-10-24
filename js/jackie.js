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
            w: 120,
            h: 120
        }

        this.jackiePos = {
            left: this.gameSize.w - 150,
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

        this.init()

    }
    init() {
        this.jackieElement = document.createElement('div')

        this.jackieElement.style.position = 'absolute'
        this.jackieElement.style.width = `${this.jackieSize.w}px`
        this.jackieElement.style.height = `${this.jackieSize.h}px`
        this.jackieElement.style.left = `${this.jackiePos.left}px`
        this.jackieElement.style.top = `${this.jackiePos.top}px`
        this.jackieElement.style.backgroundColor = 'red'
        this.jackieElement.style.borderRadius = '5%'

        document.querySelector('#game-screen').appendChild(this.jackieElement)


    }
    move() {

        this.getNavePosition()
        const diferenciaDeMovimiento = this.navePos.top - this.jackiePos.top
        this.jackiePos.top = this.jackiePos.top + (diferenciaDeMovimiento * this.jackieVel.left)
        this.updatePosition()

    }
    getNavePosition() {
        this.navePos.top = Game.nave.navePos.top
    }
    updatePosition() {
        this.jackieElement.style.top = `${this.jackiePos.top}px`
    }

}