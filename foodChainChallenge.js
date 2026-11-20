
/* =========================================
   ECOQUEST - MISSION 2
   BUILD THE FOOD CHAIN
========================================= */

const FoodChainChallenge = {

    questions: [
        {
            title: "Grassland Food Chain",
            organisms: ["🦅 Eagle", "🌿 Grass", "🐭 Mouse"],
            correctOrder: ["🌿 Grass", "🐭 Mouse", "🦅 Eagle"],
            explanation: "Grass is the producer, the mouse eats grass, and the eagle can eat the mouse."
        },
        {
            title: "Forest Food Chain",
            organisms: ["🐛 Caterpillar", "🍃 Leaves", "🐦 Bird"],
            correctOrder: ["🍃 Leaves", "🐛 Caterpillar", "🐦 Bird"],
            explanation: "Leaves provide energy to the caterpillar, which can be eaten by a bird."
        },
        {
            title: "Ocean Food Chain",
            organisms: ["🦈 Shark", "🐟 Small Fish", "🌿 Algae"],
            correctOrder: ["🌿 Algae", "🐟 Small Fish", "🦈 Shark"],
            explanation: "Algae are producers. Small fish can eat algae, and sharks can eat fish."
        },
        {
            title: "Garden Food Chain",
            organisms: ["🐸 Frog", "🌱 Plant", "🦗 Grasshopper"],
            correctOrder: ["🌱 Plant", "🦗 Grasshopper", "🐸 Frog"],
            explanation: "The grasshopper eats plants, and the frog can eat the grasshopper."
        }
    ],

    currentQuestion: 0,
    selectedOrganisms: [],

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
        this.selectedOrganisms = [];

        const shuffled = [...question.organisms].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="challenge-card">

                <span class="section-tag">MISSION 2</span>
                <h2>🐛 Build the Food Chain</h2>

                <div class="challenge-progress">
                    Challenge ${this.currentQuestion + 1} of ${this.questions.length}
                </div>

                <h3>${question.title}</h3>

                <p>
                    Select the organisms in the correct order,
                    starting with the producer.
                </p>

                <div class="food-chain-slots" id="food-chain-slots">
                    <span class="chain-placeholder">1. Producer</span>
                    <span class="chain-placeholder">2. Consumer</span>
                    <span class="chain-placeholder">3. Final Consumer</span>
                </div>

                <div class="answer-options">
                    ${shuffled.map(organism => `
                        <button class="answer-button organism-choice" data-organism="${organism}">
                            ${organism}
                        </button>
                    `).join("")}
                </div>

                <button id="check-chain" class="primary-button" disabled>
                    Check Food Chain
                </button>

                <button id="reset-chain" class="secondary-button">
                    Clear Selection
                </button>

                <div id="answer-feedback" class="answer-feedback" aria-live="polite"></div>

                <button id="continue-question" class="primary-button" hidden>
                    Continue →
                </button>

            </div>
        `;

        const slots = container.querySelector("#food-chain-slots");
        const checkButton = container.querySelector("#check-chain");
        const feedback = container.querySelector("#answer-feedback");
        const continueButton = container.querySelector("#continue-question");

        const choices = container.querySelectorAll(".organism-choice");

        choices.forEach(button => {

            button.addEventListener("click", () => {

                if (this.selectedOrganisms.length >= 3) return;

                const organism = button.dataset.organism;

                this.selectedOrganisms.push(organism);
                button.disabled = true;

                this.updateSlots(slots);

                checkButton.disabled = this.selectedOrganisms.length !== 3;
            });
        });

        container.querySelector("#reset-chain").addEventListener("click", () => {

            this.selectedOrganisms = [];

            choices.forEach(button => {
                button.disabled = false;
            });

            this.updateSlots(slots);
            checkButton.disabled = true;
            feedback.textContent = "";
        });

        checkButton.addEventListener("click", () => {

            const correct = this.selectedOrganisms.every(
                (organism, index) => organism === question.correctOrder[index]
            );

            if (correct) {

                window.EcoQuest.correctAnswer();

                feedback.textContent = "Excellent! " + question.explanation;
                feedback.className = "answer-feedback correct-feedback";

                choices.forEach(button => button.disabled = true);
                checkButton.disabled = true;
                continueButton.hidden = false;

            } else {

                const gameContinues = window.EcoQuest.incorrectAnswer();

                feedback.textContent = gameContinues
                    ? "That order is not correct. Try again! Start with the producer."
                    : "Game Over! You have lost all your lives.";

                feedback.className = "answer-feedback incorrect-feedback";

                if (!gameContinues) {
                    choices.forEach(button => button.disabled = true);
                    checkButton.disabled = true;
                }
            }
        });

        continueButton.addEventListener("click", () => {
            this.currentQuestion++;
            this.showQuestion(container);
        });
    },

    updateSlots(slots) {

        const labels = [
            "1. Producer",
            "2. Consumer",
            "3. Final Consumer"
        ];

        slots.innerHTML = labels.map((label, index) => {

            const organism = this.selectedOrganisms[index];

            return `
                <div class="chain-slot">
                    ${organism || label}
                </div>
            `;
        }).join("");
    }
};

window.FoodChainChallenge = FoodChainChallenge;
