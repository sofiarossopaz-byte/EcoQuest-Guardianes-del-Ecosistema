
/* =========================================
   ECOQUEST - ACTIONS
   Controla las interacciones y la interfaz
========================================= */

// =========================================
// 1. SELECCIONAR ELEMENTOS HTML
// =========================================

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const scoreValue = document.getElementById("score-value");
const livesValue = document.getElementById("lives-value");
const levelValue = document.getElementById("level-value");
const missionCount = document.getElementById("mission-count");

const gameMessage = document.getElementById("game-message");

// Tarjetas de las misiones
const missionCards = [
    document.getElementById("mission-1"),
    document.getElementById("mission-2"),
    document.getElementById("mission-3")
];

// Indicadores de estado de las misiones
const missionStatuses = [
    document.getElementById("mission-1-status"),
    document.getElementById("mission-2-status"),
    document.getElementById("mission-3-status")
];


// =========================================
// 2. ACTUALIZAR LA INTERFAZ
// =========================================

function updateGameInterface() {

    // Actualizar puntuación
    scoreValue.textContent = GameState.score;

    // Actualizar vidas
    const hearts = "❤️ ".repeat(GameState.lives);
    const emptyHearts = "🖤 ".repeat(
        GameState.initialLives - GameState.lives
    );

    livesValue.textContent = hearts + emptyHearts;

    // Actualizar nivel
    levelValue.textContent = GameState.getLevel();

    // Actualizar progreso de misiones
    missionCount.textContent =
        `${GameState.completedMissions.length}/${GameState.totalMissions}`;

    // Actualizar tarjetas de las misiones
    missionCards.forEach((card, index) => {

        if (!card) return;

        const missionNumber = index + 1;
        const status = missionStatuses[index];

        card.style.border = "2px solid transparent";

        if (GameState.completedMissions.includes(missionNumber)) {

            if (status) status.textContent = "✓ Completed";
            card.style.border = "2px solid #72B95B";

        } else if (
            GameState.gameStarted &&
            missionNumber === GameState.currentMission
        ) {

            if (status) status.textContent = "➜ Current Mission";
            card.style.border = "2px solid #E9A64C";

        } else {

            if (status) status.textContent = "🔒 Locked";

        }
    });

    // Actualizar botones
    startButton.style.display =
        GameState.gameStarted ? "none" : "inline-block";

    restartButton.style.display =
        (GameState.gameOver || GameState.gameWon)
            ? "inline-block"
            : "none";

    // Actualizar mensajes
    if (GameState.gameOver) {

        gameMessage.textContent =
            "Game Over! You have lost all your lives. Try again!";

    } else if (GameState.gameWon) {

        gameMessage.textContent =
            "Congratulations! You completed all three missions!";

    }
}


// =========================================
// 3. INICIAR EL JUEGO
// =========================================

function startNewGame() {

    GameState.startGame();

    gameMessage.textContent =
        "Welcome, Guardian! Your EcoQuest adventure begins!";

    updateGameInterface();
}


// =========================================
// 4. RESPUESTA CORRECTA
// =========================================

function correctAnswer() {

    GameState.addPoints();

    gameMessage.textContent =
        "Correct answer! You earned 100 points!";

    updateGameInterface();
}


// =========================================
// 5. RESPUESTA INCORRECTA
// =========================================

function incorrectAnswer() {

    GameState.loseLife();

    if (GameState.gameOver) {

        gameMessage.textContent =
            "Game Over! You have lost all your lives.";

    } else {

        gameMessage.textContent =
            "Not quite right! You lost one life. Keep trying!";

    }

    updateGameInterface();
}


// =========================================
// 6. COMPLETAR LA MISIÓN ACTUAL
// =========================================

function finishCurrentMission() {

    const completed = GameState.completeMission();

    if (!completed) return;

    if (GameState.gameWon) {

        gameMessage.textContent =
            "Amazing! You are a true Guardian of the Ecosystem!";

    } else {

        gameMessage.textContent =
            "Mission completed! You earned 200 bonus points. Next mission unlocked!";

    }

    updateGameInterface();
}


// =========================================
// 7. REINICIAR EL JUEGO
// =========================================

function restartGame() {

    GameState.restartGame();

    gameMessage.textContent =
        "New game started! Good luck, Guardian!";

    updateGameInterface();
}


// =========================================
// 8. CONFIGURAR LOS EVENTOS
// =========================================

startButton.addEventListener("click", startNewGame);

restartButton.addEventListener("click", restartGame);


// =========================================
// 9. EXPONER FUNCIONES PARA LAS MISIONES
// =========================================

window.EcoQuest = {
    correctAnswer,
    incorrectAnswer,
    finishCurrentMission,
    restartGame,
    updateGameInterface
};


// =========================================
// 10. INICIALIZAR LA INTERFAZ
// =========================================

updateGameInterface();
