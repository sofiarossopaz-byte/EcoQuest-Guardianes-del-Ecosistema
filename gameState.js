
/* =========================================
   ECOQUEST - GAME STATE
   Administra los datos y las reglas del juego
========================================= */

const GameState = {

    // Configuración inicial
    initialLives: 3,
    pointsPerCorrectAnswer: 100,
    pointsPerMission: 200,
    totalMissions: 3,

    // Variables del juego
    score: 0,
    lives: 3,
    currentMission: 1,
    completedMissions: [],
    gameStarted: false,
    gameOver: false,
    gameWon: false,

    // Iniciar una nueva partida
    startGame() {
        this.score = 0;
        this.lives = this.initialLives;
        this.currentMission = 1;
        this.completedMissions = [];
        this.gameStarted = true;
        this.gameOver = false;
        this.gameWon = false;

        console.log("EcoQuest game started!");
    },

    // Añadir puntos
    addPoints(points = this.pointsPerCorrectAnswer) {
        if (!this.gameStarted || this.gameOver || this.gameWon) {
            return;
        }

        this.score += points;

        console.log("Points added:", points);
        console.log("Current score:", this.score);
    },

    // Perder una vida
    loseLife() {
        if (!this.gameStarted || this.gameOver || this.gameWon) {
            return;
        }

        if (this.lives > 0) {
            this.lives--;
        }

        console.log("Lives remaining:", this.lives);

        // Comprobar si terminó el juego
        if (this.lives === 0) {
            this.gameOver = true;
            this.gameStarted = false;

            console.log("Game Over!");
        }
    },

    // Completar una misión
    completeMission(missionNumber = this.currentMission) {
        if (!this.gameStarted || this.gameOver || this.gameWon) {
            return false;
        }

        // Validar que sea la misión actual
        if (missionNumber !== this.currentMission) {
            return false;
        }

        // Evitar completar una misión dos veces
        if (this.completedMissions.includes(missionNumber)) {
            return false;
        }

        // Registrar misión completada
        this.completedMissions.push(missionNumber);

        // Otorgar bonificación
        this.addPoints(this.pointsPerMission);

        console.log("Mission completed:", missionNumber);

        // Avanzar a la siguiente misión
        if (this.currentMission < this.totalMissions) {

            this.currentMission++;

            console.log("Next mission:", this.currentMission);

        } else {

            // Todas las misiones fueron completadas
            this.gameWon = true;
            this.gameStarted = false;

            console.log("Congratulations! You won EcoQuest!");
        }

        return true;
    },

    // Reiniciar la partida
    restartGame() {
        this.startGame();

        console.log("Game restarted!");
    },

    // Obtener el nivel actual
    getLevel() {
        return Math.min(
            this.completedMissions.length + 1,
            this.totalMissions
        );
    }

};

// Permitir que actions.js y la consola accedan al estado
window.GameState = GameState;
