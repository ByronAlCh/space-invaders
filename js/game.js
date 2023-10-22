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

    // DE MOMENTO NO background: undefined,
    nave: undefined,

    enemies: [],
    jackie: undefined,

    //Densidad de los enemies
    enemiesDensity: 100,

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
                    this.nave.shoot()
                    break
            }

        }
    },

    start() {
        this.createElements()
        this.gameLoop()
    },

    createElements() {
        //this.background = new Background(this.gameScreen, this.gameSize) DE MOMENTO NO
        // this.player = new Player(this.gameScreen, this.gameSize)
        this.nave = new Nave(this.gameScreen, this.gameSize, this.liveNave)

        this.jackie = new Jackie(this.gameScreen, this.gameSize, this.nave.navePos)



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

        this.isCollision() && this.gameOver()
        /* if (this.counterLifes === 0) {
             this.gameOver()
         }*/

        window.requestAnimationFrame(() => this.gameLoop())

    },

    drawAll() {
        this.jackie.move()
        //this.background.move() de momento nada
        this.nave.move()
        //esto da problemas


        this.enemies.forEach(eachenemie => { eachenemie.move() })


    },

    generateEnemies() {
        if (this.framesCounter % this.enemiesDensity === 0) {
            this.enemies.push(new enemie(this.gameScreen, this.gameSize))
        }
    },
    //hacer funcion de generar enemigos= generate obstacles
    clearAll() {
        this.enemies.forEach((eachenemie, idx) => {
            if (eachenemie.enemiePos.left <= -20) {
                eachenemie.enemieElement.remove()
                this.enemies.splice(idx, 1)
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
                this.nave.navePos.top <= this.enemies[i].enemiePos.top - this.enemies[i].enemieSize.h
                //Mira si la parte superior de la nave toca con la parte inferior del enemigo

            ) {

                return true
            }
            // this.counter()
        }
    },



    gameOver() {

        console.log('finish')
    },

    /*counter() {

        if (this.isCollision()) {
            this.nave.liveNave--
            console.log(this.nave.liveNave)
        }

    }*/
}