class DoubleBullets {
    constructor(gameScreen, gameSize, navePos, naveSize) {

        this.gameScreen = gameScreen
        this.gameSize = gameSize

        //this.naveSize = naveSize

        this.navePos = {
            top: navePos.top,
            left: navePos.left //por si aca
        }

        this.bulletPos1 = {
            left: navePos.left + naveSize.w + 70, // esto es para que salga del extremo derecho
            top: (navePos.top + naveSize.h / 2 + ((naveSize.h / 2) / 2)) + 10// esto es para que salga del medio de la nave
        }
        this.bulletPos2 = {
            left: navePos.left + naveSize.w, // esto es para que salga del extremo derecho
            top: navePos.top + naveSize.h / 2 - ((naveSize.h / 2) / 2) - 10// esto es para que salga del medio de la nave
        }

        this.bulletVel = {
            left: 10,
            //top y gravedad no necesitamos
        }

        this.bulletSize = {
            w: 10,
            h: 10
        }
        this.init()


    }
    init() {
        this.bulletElement1 = document.createElement('div')

        this.bulletElement1.style.position = 'absolute'
        this.bulletElement1.style.width = `${this.bulletSize.w}px`
        this.bulletElement1.style.height = `${this.bulletSize.h}px`
        this.bulletElement1.style.left = `${this.bulletPos1.left}px`
        this.bulletElement1.style.top = `${this.bulletPos1.top}px`
        this.bulletElement1.style.backgroundColor = 'blue'
        this.bulletElement1.style.borderRadius = '50%'

        this.gameScreen.appendChild(this.bulletElement1)

        this.bulletElement2 = document.createElement('div')

        this.bulletElement2.style.position = 'absolute'
        this.bulletElement2.style.width = `${this.bulletSize.w}px`
        this.bulletElement2.style.height = `${this.bulletSize.h}px`
        this.bulletElement2.style.left = `${this.bulletPos2.left}px`
        this.bulletElement2.style.top = `${this.bulletPos2.top}px`
        this.bulletElement2.style.backgroundColor = 'blue'
        this.bulletElement2.style.borderRadius = '50%'

        this.gameScreen.appendChild(this.bulletElement2)
    }
    move() {
        this.bulletPos1.left += this.bulletVel.left
        this.bulletPos2.left += this.bulletVel.left


        this.updatePosition()
    }
    getNavePosition() {
        this.navePos.top = Game.nave.navePos.top
        this.navePos.left = Game.nave.navePos.left
        this.naveSize.width = Game.nave.naveSize.w
        this.naveSize.height = Game.nave.naveSize.h


    }

    updatePosition() {
        this.bulletElement1.style.left = `${this.bulletPos1.left}px`
        this.bulletElement1.style.top = `${this.bulletPos1.top}px`//no nos hace falta


        this.bulletElement2.style.left = `${this.bulletPos2.left}px`
        this.bulletElement2.style.top = `${this.bulletPos2.top}px`//no nos hace falta


    }





}