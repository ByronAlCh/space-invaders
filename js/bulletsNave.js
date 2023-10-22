class BulletsNave {
    constructor(gameScreen, navePos, naveSize) {

        this.gameScreen = gameScreen
        this.navePos = navePos
        this.naveSize = naveSize

        this.bulletPos = {
            left: navePos.left + naveSize.w, // esto es para que salga del extremo derecho
            top: navePos.top + naveSize.h / 2 // esto es para que salga del medio de la nave
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
        this.bulletElement = document.createElement('div')

        this.bulletElement.style.position = 'absolute'
        this.bulletElement.style.width = `${this.bulletSize.w}px`
        this.bulletElement.style.height = `${this.bulletSize.h}px`
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`
        this.bulletElement.style.backgroundColor = 'blue'
        this.bulletElement.style.borderRadius = '50%'

        this.gameScreen.appendChild(this.bulletElement)
    }
    move() {
        this.bulletPos.left += this.bulletVel.left

        this.updatePosition()
    }

    updatePosition() {
        this.bulletElement.style.left = `${this.bulletPos.left}px`
        this.bulletElement.style.top = `${this.bulletPos.top}px`//no nos hace falta

    }





}