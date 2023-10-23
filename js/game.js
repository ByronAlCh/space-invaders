const Game = {
    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    keys: {
        TOP: 'ArrowUp',
        BOTTOM: 'ArrowDown',
        SHOOT: 'Space'
    },

    framesCounter: 0,

    // background: undefined,
    nave: undefined,

    bulletsNave: [],
    enemies: [],
    lives: [],

    jackie: undefined,

    //Densidad de los enemies
    enemiesDensity: 200,
    livesDensity: 200,

    init() {
        this.setDimensions()
        this.setEventListerners()
        this.start()
    },

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`

    },

    setEventListerners() {
        document.onkeydown = event => {
            const { code } = event

            switch (code) {
                case this.keys.TOP:
                    this.nave.moveTop()
                    break
                case this.keys.BOTTOM:
                    this.nave.moveBotton()
                    break
                case this.keys.SHOOT:
                    this.shootNave()
                    break
            }

        }
    },

    start() {
        this.createElements()
        this.gameLoop()
    },

    createElements() {
        //   this.background = new Background(this.gameScreen, this.gameSize)
        // this.player = new Player(this.gameScreen, this.gameSize)
        this.nave = new Nave(this.gameScreen, this.gameSize, this.liveNave,)

        this.jackie = new Jackie(this.gameScreen, this.gameSize, this.nave.navePos)

        this.lives = []


        this.enemies = []
    },

    gameLoop() {

        //preguntar a profes si esto es asi
        if (this.framesCounter > 5000) {
            this.framesCounter = 0
        } else {
            this.framesCounter++
        }

        if (this.framesCounter % 100 === 0 && this.enemiesDensity > 20) {
            this.enemies.forEach(eachenemie => {
                eachenemie.enemieVel.left++
                console.log(eachenemie.enemieVel.left++)
            })
            this.enemiesDensity -= 10


        }


        /* if (this.framesCounter < 300) {
             this.enemiesDensity = 120
             this.enemies.forEach(eachenemie => { eachenemie.enemieVel.left = 2 })
         } else if (this.framesCounter > 300 && this.framesCounter < 400) {
             this.enemiesDensity = 110
             this.enemies.forEach(eachenemie => { eachenemie.enemieVel.left = 3})
         } else if (this.framesCounter > 400 && this.framesCounter < 500) {
             this.enemiesDensity = 120
             this.enemies.forEach(eachenemie => { eachenemie.enemieVel.left = 4 })
         } else if (this.framesCounter > 300 && this.framesCounter < 400) {
             this.enemiesDensity = 110
             this.enemies.forEach(eachenemie => { eachenemie.enemieVel.left = 3 })
         }*/

        this.drawAll()
        this.clearAll()

        this.generateEnemies()
        this.generateLives()

        this.isCollisionLives()
        this.isCollision()
        this.isCollisionBugs()

        //this.isCollision() && this.gameOver()
        /* if (this.isCollision() && this.nave.liveNave === 0) {
             this.gameOver()
         }*/

        //this.isCollisionBugs()

        window.requestAnimationFrame(() => this.gameLoop())

    },

    drawAll() {
        this.jackie.move()
        //   this.background.move()
        this.nave.move()
        //esto da problemas
        this.lives.forEach(eachlives => { eachlives.move() })
        this.bulletsNave.forEach(eachbullet => { eachbullet.move() })

        this.enemies.forEach(eachenemie => { eachenemie.move() })


    },

    generateEnemies() {
        if (this.framesCounter % this.enemiesDensity === 0) {
            this.enemies.push(new enemie(this.gameScreen, this.gameSize))
        }
    },
    generateLives() {
        if (this.framesCounter % this.livesDensity === 0) {
            this.lives.push(new Lives(this.gameScreen, this.gameSize))
        }
    },

    shootNave() {
        this.bulletsNave.push(new BulletsNave(this.gameScreen, this.gameSize, this.nave.navePos, this.nave.naveSize, this.bulletPos, this.bulletSize))
    },


    //hacer funcion de generar enemigos= generate obstacles
    clearAll() {
        //limpiar enemigos
        this.enemies.forEach((eachenemie, idx) => {
            if (eachenemie.enemiePos.left <= -20) {
                eachenemie.enemieElement.remove()
                this.enemies.splice(idx, 1)
            }
        })
        //limpiar vidas
        this.lives.forEach((eachlive, idx) => {
            if (eachlive.livesPos.left <= -20) {
                eachlive.livesElement.remove()
                this.lives.splice(idx, 1)
            }
        })
        //limpiar balas
        this.bulletsNave.forEach((eachBullet, idx) => {
            if (eachBullet.bulletPos.left <= -20) {
                eachBullet.bulletElement.remove()
                this.bulletsNave.splice(idx, 1)
            }
        })


    },
    isCollision() {


        for (let i = 0; i < this.enemies.length; i++) {
            if (

                this.nave.navePos.left + this.nave.naveSize.w >= this.enemies[i].enemiePos.left &&
                // Mira si el borde derecho de la nave se toca con el borde izquierdo del enemigo.
                this.nave.navePos.top + this.nave.naveSize.h >= this.enemies[i].enemiePos.top &&
                // Mira si el borde inferior de la nave toca con el borde superior de la nave del enemigo.
                this.nave.navePos.left <= this.enemies[i].enemiePos.left + this.enemies[i].enemieSize.w &&
                // Mira si el borde izquierdo de la nave toca con el borde derecho de la nave del enemigo.
                this.nave.navePos.top <= this.enemies[i].enemiePos.top + this.enemies[i].enemieSize.h
                //Mira si la parte superior de la nave toca con la parte inferior del enemigo

            ) {
                this.nave.liveNave--
                const enemieCollision = this.enemies[i].enemieElement
                enemieCollision.remove()
                this.enemies.splice(i, 1)
                if (this.nave.liveNave < 0) {
                    this.nave.liveNave = 0 //AQUI HABRÍA QUE INVOCAR GAME OVER
                }

                console.log(this.nave.liveNave)
                return true
            }


            //  this.counter()
        }
    },



    isCollisionLives() {


        for (let i = 0; i < this.lives.length; i++) {
            if (

                this.nave.navePos.left + this.nave.naveSize.w >= this.lives[i].livesPos.left &&
                // Mira si el borde derecho de la nave se toca con el borde izquierdo del enemigo.
                this.nave.navePos.top + this.nave.naveSize.h >= this.lives[i].livesPos.top &&
                // Mira si el borde inferior de la nave toca con el borde superior de la nave del enemigo.
                this.nave.navePos.left <= this.lives[i].livesPos.left + this.lives[i].livesSize.w &&
                // Mira si el borde izquierdo de la nave toca con el borde derecho de la nave del enemigo.
                this.nave.navePos.top <= this.lives[i].livesPos.top + this.lives[i].livesSize.h
                //Mira si la parte superior de la nave toca con la parte inferior del elives
            ) {

                this.nave.liveNave++
                const livesCollision = this.lives[i].livesElement
                livesCollision.remove()
                this.lives.splice(i, 1)
                if (this.nave.liveNave > 6) {
                    this.nave.liveNave = 6
                }
                console.log(this.nave.liveNave)
                return true



            }


            //  this.counter()
        }
    },





    isCollisionBugs() {


        for (let i = 0; i < this.bulletsNave.length; i++) {


            for (let j = 0; j < this.enemies.length; j++) {

                if (this.bulletsNave[i].bulletPos.left + this.bulletsNave[i].bulletSize.w >= this.enemies[j].enemiePos.left &&

                    this.bulletsNave[i].bulletPos.top + this.bulletsNave[i].bulletSize.h >= this.enemies[j].enemiePos.top)

                //this.bulletsNave[i].left <= this.enemies[j].enemiePos.left + this.enemies[j].enemieSize.w)

                //this.bulletsNave[i].top <= this.enemies[j].enemiePos.top + this.enemies[j].enemieSize.h)
                {

                    const enemieCollision = this.enemies[j].enemieElement
                    enemieCollision.remove()
                    this.enemies.splice(j, 1)
                    const bulletCollision = this.bulletsNave[i].bulletElement
                    bulletCollision.remove()
                    this.bulletsNave.splice(i, 1)

                }

            }
        }



    },



    gameOver() {

        console.log('finish')

    },


}