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
    enemiesDensity: 50,
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
        this.nave = new Nave(this.gameScreen, this.gameSize, this.liveNave, this.bulletsNave)

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

        this.drawAll()
        this.clearAll()

        this.generateEnemies()
        this.generateLives()

        //this.isCollision() && this.gameOver()
        if (this.isCollision() && this.nave.liveNave === 0) {
            this.gameOver()
        }

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
        this.bulletsNave.push(new BulletsNave(this.gameScreen, this.gameSize, this.nave.navePos, this.nave.naveSize,))
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

                console.log(this.nave.liveNave)
                return true
            }


            //  this.counter()
        }
    },


    /* isCollisionBugs() {
         for (let i = 0; i < this.enemies.length; i++) {
             if (
                 this.nave.bulletsNave[i].bulletPos.left + this.nave.bulletsNave[i].bulletSize.w
                 >= this.enemies[i].enemiePos.left) {
                 const enemieCollision = this.enemies[i].enemieElement
                 enemieCollision.remove()
                 this.enemies.splice(i, 1)
 
             }
 
         }
 
     },*/



    gameOver() {

        console.log('finish')

    },


}