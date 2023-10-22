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
            left: 30,
            top: 30,
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
        this.jackiePos.top = this.navePos.top
        this.updatePosition()


    }
    getNavePosition() {
        this.navePos.top = Game.nave.navePos.top
    }
    updatePosition() {
        this.jackieElement.style.top = `${this.navePos.top}px`
    }

}