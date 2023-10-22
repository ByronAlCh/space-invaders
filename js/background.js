class Background {

    constructor(gameScreen, gameSize) {

        this.gameScreen = gameScreen

        this.gameSize = gameSize
        this.backgroundSize = {
            w: gameSize.w,
            h: gameScreen.h
        }

        this.backgroundPosition = {
            left: 0,
            top: 0,

        }

        this.init()
    }

    init() {
        this.fondo1 = document.createElement('img')

        this.backgroundElement1.src = "https://png.pngtree.com/background/20210714/original/pngtree-pure-red-background-simple-picture-image_1204479.jpg"

        this.fondo1.style.position = 'absolute'
        this.fondo1.style.backgroundColor = 'red'
        this.fondo1.style.width = `${this.backgroundSize.w}px`
        this.fondo1.style.height = `${this.backgroundSize.h}px`
        this.fondo1.style.left = `${this.backgroundPosition.left}px`
        this.fondo1.style.top = `${this.backgroundPosition.top}px`
        this.gameScreen.appendChild(this.fondo)

    }
    move() {

    }
}