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
            w: 10,
            h: 10
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
        this.bulletElement.style.backgroundColor = 'red'
        this.bulletElement.style.borderRadius = '50%'

        this.gameScreen.appendChild(this.bulletElement)
    }
    move() {
        this.bulletPos.left -= this.bulletVel.left

        this.updatePosition()
    }
    getJackieposition() {
        this.navePos.top = Game.jackie.jackiePos.top
        this.navePos.left = Game.jackie.jackiePos.left
        this.naveSize.width = Game.jackie.jackiePos.w
        this.naveSize.height = Game.jackie.jackieSize.h


    }

    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`//no nos hace falta

    }





}