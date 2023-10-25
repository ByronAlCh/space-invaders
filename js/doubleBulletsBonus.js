class DoubleBulletsBonus {

    constructor(gameScreen, gameSize) {
        this.gameScreen = gameScreen
        this.gameSize = gameSize
        //this.bullets = [] para cuando metamos balas


        this.doubleBulletBonusSize = {
            w: 25,
            h: 25
        }

        this.doubleBulletBonusPos = {
            left: this.gameSize.w,
            top: Math.floor(Math.random() * this.gameSize.h)
            //base no creo que necesitemos
        }
        this.doubleBulletBonusVel = {
            left: 15,
            top: 15,
        }

        this.init()

    }
    init() {
        this.doubleBulletBonusElement = document.createElement('div')

        this.doubleBulletBonusElement.style.position = 'absolute'
        this.doubleBulletBonusElement.style.width = `${this.doubleBulletBonusSize.w}px`
        this.doubleBulletBonusElement.style.height = `${this.doubleBulletBonusSize.h}px`
        this.doubleBulletBonusElement.style.left = `${this.doubleBulletBonusPos.left}px`
        this.doubleBulletBonusElement.style.top = `${this.doubleBulletBonusPos.top}px`
        this.doubleBulletBonusElement.style.backgroundColor = `green`
        this.doubleBulletBonusElement.style.borderRadius = '50%'

        document.querySelector('#game-screen').appendChild(this.doubleBulletBonusElement)
    }
    move() {
        this.doubleBulletBonusPos.top += 0
        this.doubleBulletBonusPos.left -= this.doubleBulletBonusVel.left
        this.updatePosition()

    }
    updatePosition() {
        this.doubleBulletBonusElement.style.left = `${this.doubleBulletBonusPos.left}px`
        this.doubleBulletBonusElement.style.top = `${this.doubleBulletBonusPos.top}px`

    }

}
