
/* =========================================
   ECOQUEST - MAIN ACTIONS
========================================= */

// HTML elements
const welcomeScreen = document.getElementById("welcome-screen");
const gameStatus = document.getElementById("game-status");
const missionsScreen = document.getElementById("missions-screen");
const challengeScreen = document.getElementById("challenge-screen");
const endScreen = document.getElementById("end-screen");

const challengeContainer = document.getElementById("challenge-container");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const backButton = document.getElementById("back-button");
const playAgainButton = document.getElementById("play-again-button");

const scoreValue = document.getElementById("score-value");
const livesValue = document.getElementById("lives-value");
const levelValue = document.getElementById("level-value");
const missionCount = document.getElementById("mission-count");
const gameMessage = document.getElementById("game-message");

const missionCards = [
    document.getElementById("mission-1"),
    document.getElementById("mission-2"),
    document.getElementById("mission-3")
];

const missionStatuses = [
    document.getElementById("mission-1-status"),
    document.getElementById("mission-2-status"),
    document.getElementById("mission-3-status")
];


// =========================================
// SCREEN NAVIGATION
// =========================================

function showScreen(screen) {

    welcomeScreen.hidden = true;
    missionsScreen.hidden = true;
    challengeScreen.hidden = true;
    endScreen.hidden = true;

    screen.hidden = false;
}


// =========================================
// UPDATE GAME STATUS
// =========================================

function updateGameInterface() {

    scoreValue.textContent = GameState.score;

    const fullHearts = "❤️ ".repeat(GameState.lives);
    const emptyHearts = "🖤 ".repeat(
        GameState.initialLives - GameState.lives
    );

    livesValue.textContent = fullHearts + emptyHearts;

    levelValue.textContent = GameState.getLevel();

    missionCount.textContent =
        `${GameState.completedMissions.length}/${GameState.totalMissions} missions`;

    missionCards.forEach((card, index) => {

        const number = index + 1;
        const status = missionStatuses[index];
        const button = card.querySelector(".mission-button");

        card.classList.remove("completed", "current", "locked");

        if (GameState.completedMissions.includes(number)) {

            status.textContent = "✓ Completed";
            card.classList.add("completed");

            button.textContent = "Completed";
            button.disabled = true;

        } else if (GameState.isMissionUnlocked(number)) {

            status.textContent = "➜ Available";
            card.classList.add("current");

            button.textContent = "Start Mission";
            button.disabled = false;

        } else {

            status.textContent = "🔒 Locked";
            card.classList.add("locked");

            button.textContent = "Locked";
            button.disabled = true;
        }
    });

    if (GameState.gameOver) {
        showEndScreen(false);
    }

    if (GameState.gameWon) {
        showEndScreen(true);
    }
}


// =========================================
// START GAME
// =========================================

function startNewGame() {

    GameState.startGame();

    gameMessage.textContent =
        "Welcome, Guardian! Your adventure begins!";

    welcomeScreen.hidden = true;
    endScreen.hidden = true;
    gameStatus.hidden = false;

    showScreen(missionsScreen);
    updateGameInterface();
}


// =========================================
// OPEN A MISSION
// =========================================

function openMission(missionNumber) {

    if (!GameState.isMissionUnlocked(missionNumber)) return;

    challengeContainer.innerHTML = "";

    showScreen(challengeScreen);

    if (missionNumber === 1) {
        OrganismChallenge.render(challengeContainer);
    }

    if (missionNumber === 2) {
        FoodChainChallenge.render(challengeContainer);
    }

    if (missionNumber === 3) {
        EcosystemChallenge.render(challengeContainer);
    }
}


// =========================================
// BACK TO MISSION DASHBOARD
// =========================================

function showDashboard() {

    if (GameState.gameOver || GameState.gameWon) return;

    challengeContainer.innerHTML = "";

    showScreen(missionsScreen);

    gameMessage.textContent = "Choose your next mission, Guardian!";

    updateGameInterface();
}


// =========================================
// CORRECT ANSWER
// =========================================

function correctAnswer() {

    if (!GameState.gameStarted || GameState.gameOver) return false;

    GameState.addPoints();

    updateGameInterface();

    return true;
}


// =========================================
// INCORRECT ANSWER
// =========================================

function incorrectAnswer() {

    if (!GameState.gameStarted || GameState.gameOver) return false;

    GameState.loseLife();

    updateGameInterface();

    return !GameState.gameOver;
}


// =========================================
// COMPLETE CURRENT MISSION
// =========================================

function finishCurrentMission() {

    const completed = GameState.completeMission();

    if (!completed) return false;

    updateGameInterface();

    if (GameState.gameWon) {
        showEndScreen(true);
    } else {
        challengeContainer.innerHTML = `
            <div class="challenge-card mission-complete">
                <div class="end-icon">🎉</div>
                <h2>Mission Completed!</h2>
                <p>You earned 200 bonus points!</p>
                <p>Great work, Guardian. Your next mission is unlocked.</p>
                <button id="dashboard-button" class="primary-button">
                    Continue to Missions
                </button>
            </div>
        `;

        document.getElementById("dashboard-button")
            .addEventListener("click", showDashboard);
    }

    return true;
}


// =========================================
// END GAME
// =========================================

function showEndScreen(won) {

    showScreen(endScreen);

    document.getElementById("end-icon").textContent =
        won ? "🏆" : "💚";

    document.getElementById("end-title").textContent =
        won ? "Congratulations, Guardian!" : "Game Over!";

    document.getElementById("end-description").textContent =
        won
            ? "You completed all three missions and helped protect the ecosystem!"
            : "You have lost all your lives. You can try the adventure again!";

    document.getElementById("final-score").textContent =
        GameState.score;

    restartButton.hidden = false;
}


// =========================================
// RESTART GAME
// =========================================

function restartGame() {

    GameState.restartGame();

    challengeContainer.innerHTML = "";

    gameStatus.hidden = false;
    restartButton.hidden = false;

    gameMessage.textContent =
        "A new adventure begins! Good luck!";

    showScreen(missionsScreen);

    updateGameInterface();
}


// =========================================
// BUTTON EVENTS
// =========================================

startButton.addEventListener("click", startNewGame);

restartButton.addEventListener("click", restartGame);

playAgainButton.addEventListener("click", restartGame);

backButton.addEventListener("click", showDashboard);

document.querySelectorAll(".mission-button").forEach(button => {

    button.addEventListener("click", () => {

        const missionNumber = Number(button.dataset.mission);

        openMission(missionNumber);
    });
});


// =========================================
// PUBLIC GAME FUNCTIONS
// =========================================

window.EcoQuest = {
    correctAnswer,
    incorrectAnswer,
    finishCurrentMission,
    restartGame,
    showDashboard,
    openMission,
    updateGameInterface
};


// =========================================
// INITIAL SCREEN
// =========================================

welcomeScreen.hidden = false;
gameStatus.hidden = true;
missionsScreen.hidden = true;
challengeScreen.hidden = true;
endScreen.hidden = true;
restartButton.hidden = true;
