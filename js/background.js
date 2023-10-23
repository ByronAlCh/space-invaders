class Background {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen

        this.gameSize = gameSize
        this.backgroundSize = {
            w: gameSize.w,
            h: gameScreen.h
        }

        this.backgroundPosition1 = {
            left: 0,
            top: 0,

        }
        this.backgroundSize2 = {
            w: gameSize.w,
            h: gameScreen.h
        }

        this.backgroundPosition2 = {
            left: gameSize.w,
            top: 0,

        }
        this.backgroundVel = {
            left: .5
        }


        this.init()
    }

    init() {
        this.fondo1 = document.createElement('img')

        this.fondo1.src = "./img/bg2.avif"

        this.fondo1.style.position = 'absolute'

        this.fondo1.style.width = `${this.backgroundSize.w}px`
        this.fondo1.style.height = `${this.backgroundSize.h}px`
        this.fondo1.style.left = `${this.backgroundPosition1.left}px`
        this.fondo1.style.top = `${this.backgroundPosition1.top}px`
        this.gameScreen.appendChild(this.fondo1)


        this.fondo2 = document.createElement('img')

        this.fondo2.src = "./img/bg2.avif"

        this.fondo2.style.position = 'absolute'
        this.fondo2.style.width = `${this.backgroundSize2.w}px`
        this.fondo2.style.height = `${this.backgroundSize2.h}px`
        this.fondo2.style.left = `${this.backgroundPosition2.left}px`
        this.fondo2.style.top = `${this.backgroundPosition2.top}px`
        this.gameScreen.appendChild(this.fondo2)



    }
    move() {
        if (this.backgroundPosition1.left <= -this.backgroundSize.w) {
            this.backgroundPosition1.left = 0
            this.backgroundPosition2.left = this.backgroundSize.w
        }

        this.backgroundPosition1.left -= this.backgroundVel.left
        this.backgroundPosition2.left -= this.backgroundVel.left
        this.updatePosition()

    }
    updatePosition() {
        this.fondo1.style.left = `${this.backgroundPosition1.left}px`
        this.fondo2.style.left = `${this.backgroundPosition2.left}px`
    }

}
