
/* =========================================
   ECOQUEST - MISSION 1
   IDENTIFY THE ORGANISMS
========================================= */

const OrganismChallenge = {

    questions: [
        {
            emoji: "🌻",
            organism: "Sunflower",
            description: "A plant that makes its own food using sunlight.",
            options: ["Producer", "Consumer", "Decomposer"],
            answer: "Producer",
            explanation: "Plants are producers because they make their own food through photosynthesis."
        },
        {
            emoji: "🐰",
            organism: "Rabbit",
            description: "An animal that eats grass and other plants.",
            options: ["Producer", "Consumer", "Decomposer"],
            answer: "Consumer",
            explanation: "Rabbits are consumers because they obtain energy by eating plants."
        },
        {
            emoji: "🍄",
            organism: "Mushroom",
            description: "An organism that breaks down dead organic matter.",
            options: ["Producer", "Consumer", "Decomposer"],
            answer: "Decomposer",
            explanation: "Mushrooms are decomposers because they break down dead organisms and recycle nutrients."
        },
        {
            emoji: "🦊",
            organism: "Fox",
            description: "An animal that hunts and eats other animals.",
            options: ["Producer", "Consumer", "Decomposer"],
            answer: "Consumer",
            explanation: "Foxes are consumers because they get energy by eating other organisms."
        },
        {
            emoji: "🌳",
            organism: "Oak Tree",
            description: "A tree that uses sunlight to produce its own food.",
            options: ["Producer", "Consumer", "Decomposer"],
            answer: "Producer",
            explanation: "Trees are producers because they make their own food through photosynthesis."
        }
    ],

    currentQuestion: 0,

    render(container) {
        this.currentQuestion = 0;
        this.showQuestion(container);
    },

    showQuestion(container) {

        if (this.currentQuestion >= this.questions.length) {
            window.EcoQuest.finishCurrentMission();
            return;
        }

        const question = this.questions[this.currentQuestion];

        container.innerHTML = `
            <div class="challenge-card">

                <span class="section-tag">MISSION 1</span>
                <h2>🌱 Identify the Organisms</h2>

                <div class="challenge-progress">
                    Question ${this.currentQuestion + 1} of ${this.questions.length}
                </div>

                <div class="organism-illustration">
                    <span>${question.emoji}</span>
                </div>

                <h3>${question.organism}</h3>
                <p>${question.description}</p>

                <h4>What is the role of this organism?</h4>

                <div class="answer-options">
                    ${question.options.map(option => `
                        <button class="answer-button" data-answer="${option}">
                            ${option}
                        </button>
                    `).join("")}
                </div>

                <div id="answer-feedback" class="answer-feedback" aria-live="polite"></div>

                <button id="continue-question" class="primary-button" hidden>
                    Continue →
                </button>

            </div>
        `;

        container.querySelectorAll(".answer-button").forEach(button => {

            button.addEventListener("click", () => {

                const selected = button.dataset.answer;
                const feedback = container.querySelector("#answer-feedback");
                const continueButton = container.querySelector("#continue-question");

                if (selected === question.answer) {

                    window.EcoQuest.correctAnswer();

                    feedback.textContent = "Correct! " + question.explanation;
                    feedback.className = "answer-feedback correct-feedback";

                    container.querySelectorAll(".answer-button").forEach(option => {
                        option.disabled = true;
                    });

                    continueButton.hidden = false;

                } else {

                    const gameContinues = window.EcoQuest.incorrectAnswer();

                    feedback.textContent = gameContinues
                        ? "Not quite! Try again. " + question.description
                        : "Game Over! You have lost all your lives.";

                    feedback.className = "answer-feedback incorrect-feedback";

                    if (!gameContinues) {
                        container.querySelectorAll(".answer-button").forEach(option => {
                            option.disabled = true;
                        });
                    }
                }
            });
        });

        container.querySelector("#continue-question").addEventListener("click", () => {
            this.currentQuestion++;
            this.showQuestion(container);
        });
    }
};

window.OrganismChallenge = OrganismChallenge;
