const Game = {
    gameScreen: document.querySelector('#game-screen'),

    gameSize: {
        w: window.innerWidth,
        h: window.innerHeight
    },

    keys: {
        TOP: 'ArrowUp',
        BOTTOM: 'ArrowDown',
        SHOOT: ' '
    },

    framesCounter: 0,
    bugsKilledCounter: 0,

    background: undefined,
    nave: undefined,

    bulletsNave: [],
    doubleBullets: [],
    enemies: [],
    lives: [],
    bulletsJackie: [],
    jackie: null,
    bonus: [],


    //Densidad de los enemies,lives and bonus.
    enemiesDensity: 200,
    livesDensity: 200,
    bulletsJackieDensity: 100,
    bonusDensity: 200,

    // counterVel: 5,
    counterBonus: 0,

    init() {
        this.setDimensions()
        this.setEventListerners()
        this.start()
    },

    setDimensions() {
        this.gameScreen.style.width = `${this.gameSize.w}px`
        this.gameScreen.style.height = `${this.gameSize.h}px`

    },

    getKey(key, state) {
        switch (key) {

            case this.keys.TOP:
                this.nave.actions.top = state
                break
            case this.keys.BOTTOM:
                this.nave.actions.bottom = state
                break
            case this.keys.SHOOT:
                this.shootNave()
                break
        }


    },

    setEventListerners() {
        document.addEventListener('keydown', event => {
            this.getKey(event.key, true)
        })
        document.addEventListener('keyup', event => {
            this.getKey(event.key, false)
        })

    },


    start() {
        this.createElements()
        this.gameLoop()
    },

    createElements() {
        this.background = new Background(this.gameScreen, this.gameSize)
        // this.player = new Player(this.gameScreen, this.gameSize)
        this.nave = new Nave(this.gameScreen, this.gameSize, this.liveNave)


        this.bonus = []
        this.lives = []


        this.enemies = []
    },

    gameLoop() {
        window.requestAnimationFrame(() => this.gameLoop())
        //preguntar a profes si esto es asi
        if (this.framesCounter > 10000) {
            this.framesCounter = 0


        } else {
            this.framesCounter++



        }
        //console.log(this.framesCounter)

        if (this.framesCounter % 200 === 0) {
            this.enemiesDensity -= 10
            //console.log('enemigos:', this.enemiesDensity)
        } else if (this.enemiesDensity <= 25) {
            this.enemiesDensity = 25
        }


        if ((this.framesCounter > 1000 && this.framesCounter < 2000)) {
            this.enemies.forEach(eachEnemie => {
                eachEnemie.enemieVel.left = 9
                //console.log(eachEnemie.enemieVel.left)
            }
            )

        } else if ((this.framesCounter > 2000 && this.framesCounter < 3000)) {
            this.enemies.forEach(eachEnemie => {
                eachEnemie.enemieVel.left = 11
                //console.log(eachEnemie.enemieVel.left)
            }
            )

        } else if ((this.framesCounter > 3000 && this.framesCounter < 4000)) {
            this.enemies.forEach(eachEnemie => {
                eachEnemie.enemieVel.left = 13
                //console.log(eachEnemie.enemieVel.left)
            }
            )

        } else if ((this.framesCounter > 4000 && this.framesCounter < 5000)) {
            this.enemies.forEach(eachEnemie => {
                eachEnemie.enemieVel.left = 15
                //console.log(eachEnemie.enemieVel.left)
            }
            )

        }
        else if ((this.framesCounter > 5000)) {
            this.enemies.forEach(eachEnemie => {
                eachEnemie.enemieVel.left = 20
                this.enemiesDensity = 10
                //console.log(eachEnemie.enemieVel.left)
            }
            )
        }






        this.drawAll()
        this.clearAll()

        this.generateEnemies()
        this.generateLives()
        this.generateBonus()



        /// JACKIE COSAS



        this.isCollisionLives()
        this.isCollision()
        this.isCollisionBugs()
        this.isCollisionBonus()



        //this.isCollisionBullets()
        if (this.jackie) {
            this.shootJackie()
            this.isCollisionBulletsJackie()
            this.isCollisionBulletsNaveJackie()

        }



        this.createJackie()



    },


    createJackie() {
        if (this.bugsKilledCounter > 10 && this.jackie === null) {
            this.jackie = this.jackie = new Jackie(this.gameScreen, this.gameSize, this.nave.navePos)

        }
    },




    drawAll() {
        if (this.jackie) {
            this.jackie.move()

        }
        this.background.move()
        this.nave.move(this.framesCounter)
        //esto da problemas
        this.lives.forEach(eachlives => { eachlives.move() })
        this.bonus.forEach(eachbonus => { eachbonus.move() })

        this.bulletsNave.forEach(eachbullet => { eachbullet.move() })
        this.bulletsJackie.forEach(eachbullet => { eachbullet.move() })

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
    generateBonus() {
        if (this.framesCounter % this.bonusDensity === 0) {
            this.bonus.push(new Bonus(this.gameScreen, this.gameSize))
        }
    },



    shootNave() {




        this.bulletsNave.push(new BulletsNave(this.gameScreen, this.gameSize, this.nave.navePos, this.nave.naveSize))


    },
    shootJackie() {
        if (this.framesCounter % this.bulletsJackieDensity === 0) {
            if (this.counterBonus > 0) {
                this.doubleBullets.push(new DoubleBullets(this.gameScreen, this.gameSize, this.jackie.jackiePos, this.jackie.jackieSize))
            }
            else {
                this.bulletsJackie.push(new BulletsJackie(this.gameScreen, this.gameSize, this.jackie.jackiePos, this.jackie.jackieSize))
            }
        }
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
        //if la long del array es 
        if (this.bulletsNave.length > 0) {
            this.bulletsNave.forEach((eachBullet, idx) => {
                if (eachBullet.bulletPos.left <= -20) {
                    eachBullet.bulletElement.remove()
                    this.bulletsNave.splice(idx, 1)
                }

            })
        }

        if (this.bulletsJackie.length > 0) {
            this.bulletsJackie.forEach((eachBullet, idx) => {
                if (eachBullet.bulletPos.left <= -20) {
                    eachBullet.bulletElement.remove()
                    this.bulletsJackie.splice(idx, 1)
                }

            })
        }


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
                this.counterBonus--
                const enemieCollision = this.enemies[i].enemieElement
                enemieCollision.remove()
                this.enemies.splice(i, 1)
                if (this.nave.liveNave < 0) {
                    this.nave.liveNave = 0 //AQUI HABRÍA QUE INVOCAR GAME OVER
                }

                //console.log(this.nave.liveNave)
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
                    this.bulletsNave[i].bulletPos.top + this.bulletsNave[i].bulletSize.h >= this.enemies[j].enemiePos.top &&

                    this.bulletsNave[i].bulletPos.left <= this.enemies[j].enemiePos.left + this.enemies[j].enemieSize.w &&
                    this.bulletsNave[i].bulletPos.top <= this.enemies[j].enemiePos.top + this.enemies[j].enemieSize.h) {



                    // this.counterEnemiesKilled++
                    // console.log(this.counterEnemiesKilled)
                    const enemieCollision = this.enemies[j].enemieElement
                    enemieCollision.remove()
                    this.enemies.splice(j, 1)
                    this.bugsKilledCounter++
                    console.log(this.bugsKilledCounter)




                }


            }
        }



    },






    isCollisionBulletsJackie() {
        for (let i = 0; i < this.bulletsJackie.length; i++) {
            if (

                this.bulletsJackie[i].bulletPos.left + this.bulletsJackie[i].bulletSize.w >= this.nave.navePos.left &&
                // Mira si el borde derecho de la bala se toca con el izquierdo  de la nave.
                this.bulletsJackie[i].bulletPos.top + this.bulletsJackie[i].bulletSize.h >= this.nave.navePos.top &&
                // Mira si el borde inferior de la nave toca con el borde superior de la nave del enemigo.
                this.bulletsJackie[i].bulletPos.left <= this.nave.navePos.left + this.nave.naveSize.w &&
                // Mira si el borde izquierdo de la nave toca con el borde derecho de la nave del enemigo.
                this.bulletsJackie[i].bulletPos.top <= this.nave.navePos.top + this.nave.naveSize.h
                //Mira si la parte superior de la nave toca con la parte inferior del enemigo

            ) {
                console.log('hasta aqui funciono')
                this.nave.liveNave--
                this.counterBonus--
                const bulletCollision = this.bulletsJackie[i].bulletElement
                bulletCollision.remove()
                this.bulletsJackie.splice(i, 1)
                if (this.nave.liveNave < 0) {
                    this.nave.liveNave = 0
                }

                console.log(this.nave.liveNave)
                return true
            }

        }
    },

    isCollisionBulletsNaveJackie() {



        for (let i = 0; i < this.bulletsNave.length; i++) {
            if (

                this.bulletsNave[i].bulletPos.left + this.bulletsNave[i].bulletSize.w >= this.jackie.jackiePos.left &&
                // Mira si el borde derecho de la bala se toca con el izquierdo  de la nave.
                this.bulletsNave[i].bulletPos.top + this.bulletsNave[i].bulletSize.h >= this.jackie.jackiePos.top &&
                // Mira si el borde inferior de la nave toca con el borde superior de la nave del enemigo.
                this.bulletsNave[i].bulletPos.left <= this.jackie.jackiePos.left + this.jackie.jackieSize.w &&
                // Mira si el borde izquierdo de la nave toca con el borde derecho de la nave del enemigo.
                this.bulletsNave[i].bulletPos.top <= this.jackie.jackiePos.top + this.jackie.jackieSize.h
                //Mira si la parte superior de la nave toca con la parte inferior del enemigo

            ) {
                console.log('hasta aqui funciono')
                this.jackie.liveJackie--
                const bulletCollision = this.bulletsNave[i].bulletElement
                bulletCollision.remove()
                this.bulletsNave.splice(i, 1)
                if (this.jackie.liveJackie < 0) {
                    this.jackie.liveJackie = 0
                }
                console.log('VIDAS JACKIE', this.jackie.liveJackie)
                return true
            }
        }
    },


    isCollisionBonus() {


        for (let i = 0; i < this.bonus.length; i++) {
            if (

                this.nave.navePos.left + this.nave.naveSize.w >= this.bonus[i].bonusPos.left &&
                // Mira si el borde derecho de la nave se toca con el borde izquierdo del enemigo.
                this.nave.navePos.top + this.nave.naveSize.h >= this.bonus[i].bonusPos.top &&
                // Mira si el borde inferior de la nave toca con el borde superior de la nave del enemigo.
                this.nave.navePos.left <= this.bonus[i].bonusPos.left + this.bonus[i].bonusSize.w &&
                // Mira si el borde izquierdo de la nave toca con el borde derecho de la nave del enemigo.
                this.nave.navePos.top <= this.bonus[i].bonusPos.top + this.bonus[i].bonusSize.h
                //Mira si la parte superior de la nave toca con la parte inferior del elives
            ) {

                this.counterBonus++
                const bonusCollision = this.bonus[i].bonusElement
                bonusCollision.remove()
                this.bonus.splice(i, 1)
                if (this.counterBonus > 1) {
                    this.counterBonus = 1
                }
                console.log('soy los bonus', this.counterBonus)
                return true



            }


            //  this.counter()
        }
    },





    //     isCollisionDoubleBulletsBonus() {


    //     for(let i = 0; i< this.doubleBulletsBonus.length; i++) {
    //         if (

    //             this.nave.navePos.left + this.nave.naveSize.w >= this.doubleBulletsBonus[i].doubleBulletsBonusPos.left &&
    //             // Mira si el borde derecho de la nave se toca con el borde izquierdo del enemigo.
    //             this.nave.navePos.top + this.nave.naveSize.h >= this.doubleBulletsBonus[i].doubleBulletsBonusPos.top &&
    //             // Mira si el borde inferior de la nave toca con el borde superior de la nave del enemigo.
    //             this.nave.navePos.left <= this.doubleBulletsBonus[i].doubleBulletsBonusPos.left + this.doubleBulletsBonus[i].doubleBulletsBonusSize.w &&
    //             // Mira si el borde izquierdo de la nave toca con el borde derecho de la nave del enemigo.
    //             this.nave.navePos.top <= this.doubleBulletsBonus[i].doubleBulletsBonusPos.top + this.doubleBulletsBonus[i].//eBulletsBonusSize.h
    //             //Mira si la parte superior de la nave toca con la parte inferior del elives
    //         ) {

    //     this.counterBonus++
    //     if (this.counterBonus > 2) {
    //         this.counterBonus = 1
    //     }
    //     console.log('BONUUS', this.counterBonus)
    //     return true



    // }


    //  this.counter()
    //}
    // },




    gameOver() {

        console.log('finish')

    },


}