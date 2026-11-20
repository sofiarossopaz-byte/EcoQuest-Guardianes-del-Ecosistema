
/* =========================================
   ECOQUEST - GAME STATE
========================================= */

const GameState = {

    initialLives: 3,
    pointsPerCorrectAnswer: 100,
    pointsPerMission: 200,
    totalMissions: 3,

    score: 0,
    lives: 3,
    currentMission: 1,
    completedMissions: [],
    gameStarted: false,
    gameOver: false,
    gameWon: false,

    startGame() {
        this.score = 0;
        this.lives = this.initialLives;
        this.currentMission = 1;
        this.completedMissions = [];
        this.gameStarted = true;
        this.gameOver = false;
        this.gameWon = false;
    },

    addPoints(points = this.pointsPerCorrectAnswer) {
        if (!this.gameStarted || this.gameOver || this.gameWon) return;

        this.score += points;
    },

    loseLife() {
        if (!this.gameStarted || this.gameOver || this.gameWon) return;

        this.lives--;

        if (this.lives <= 0) {
            this.lives = 0;
            this.gameOver = true;
            this.gameStarted = false;
        }
    },

    completeMission(missionNumber = this.currentMission) {

        if (!this.gameStarted || this.gameOver || this.gameWon) {
            return false;
        }

        if (missionNumber !== this.currentMission) return false;

        if (this.completedMissions.includes(missionNumber)) {
            return false;
        }

        this.completedMissions.push(missionNumber);
        this.score += this.pointsPerMission;

        if (this.currentMission < this.totalMissions) {
            this.currentMission++;
        } else {
            this.gameWon = true;
            this.gameStarted = false;
        }

        return true;
    },

    restartGame() {
        this.startGame();
    },

    getLevel() {
        return Math.min(
            this.completedMissions.length + 1,
            this.totalMissions
        );
    },

    isMissionUnlocked(missionNumber) {
        return (
            this.gameStarted &&
            missionNumber <= this.currentMission
        );
    }
};

window.GameState = GameState;
