class Nave {
    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        this.liveNave = 3
        this.bulletsNave = []

        this.naveSize = {
            w: 75,
            h: 75
        }

        this.navePos = {
            left: 50,
            top: this.gameSize.h / 2 - this.naveSize.h
            //base no creo que necesitemos
        }
        this.naveVel = {
            left: 30,
            top: 30,
        }

        this.limit = {
            top: 0,
            bottom: this.gameSize.h - this.naveSize.h

        }



        this.init()

    }
    init() {
        this.naveElement = document.createElement('div')

        this.naveElement.style.position = 'absolute'
        this.naveElement.style.width = `${this.naveSize.w}px`
        this.naveElement.style.height = `${this.naveSize.h}px`
        this.naveElement.style.left = `${this.navePos.left}px`
        this.naveElement.style.top = `${this.navePos.top}px`
        this.naveElement.style.backgroundColor = `black`
        this.naveElement.style.borderRadius = '100%'


        document.querySelector('#game-screen').appendChild(this.naveElement)



    }
    move() {
        this.updatePosition()
        this.bulletsNave.forEach(eachBullet => eachBullet.move()) //esto invoca la función de movimiento para cada bala
        this.clearBullets()



    }

    shoot() {
        this.bulletsNave.push(new BulletsNave(this.gameScreen, this.navePos, this.naveSize))
    }
    moveTop() {
        if (this.navePos.top > this.limit.top) {
            this.naveElement.style.top = `${this.navePos.top}px`;
            this.navePos.top -= this.naveVel.top
        }


    }
    moveBotton() {
        if (this.navePos.top < this.limit.bottom) {
            this.naveElement.style.top = `${this.navePos.top}px`;
            this.navePos.top += this.naveVel.top
        }

    }
    updatePosition() {
        this.naveElement.style.top = `${this.navePos.top}px`
        this.naveElement.style.bottom = `${this.navePos.bottom}px`

    }
    clearBullets() {
        this.bulletsNave.forEach((eachBullet, idx) => {
            if (eachBullet.bulletPos.left >= this.gameSize.w) {
                eachBullet.bulletElement.remove()
                this.bulletsNave.splice(idx, 1)
            }
        })
    }

}