
/* =========================================
   ECOQUEST - MISSION 3
   SAVE THE ECOSYSTEM
========================================= */

const EcosystemChallenge = {

    questions: [
        {
            title: "Fewer Bees",
            emoji: "🐝",
            situation: "The number of bees in a meadow decreases significantly.",
            question: "What could happen to many flowering plants?",
            options: [
                "Pollination may decrease.",
                "Plants will become animals.",
                "All plants will grow faster."
            ],
            answer: "Pollination may decrease.",
            explanation: "Bees help pollinate flowers. Fewer bees can mean less pollination and fewer seeds."
        },
        {
            title: "Forest Destruction",
            emoji: "🌳",
            situation: "A large area of forest is removed.",
            question: "What is a possible consequence for forest animals?",
            options: [
                "They gain unlimited food.",
                "They may lose their habitats.",
                "They no longer need water."
            ],
            answer: "They may lose their habitats.",
            explanation: "Forests provide food and shelter. Removing them can reduce available habitats."
        },
        {
            title: "Too Many Predators",
            emoji: "🦊",
            situation: "The number of predators in an ecosystem increases.",
            question: "What could happen to the prey population?",
            options: [
                "It may decrease.",
                "It will become a producer.",
                "It will always increase."
            ],
            answer: "It may decrease.",
            explanation: "More predators can increase the number of prey animals being eaten."
        },
        {
            title: "Water Pollution",
            emoji: "💧",
            situation: "A river becomes polluted and aquatic organisms are affected.",
            question: "Which action would best help the ecosystem?",
            options: [
                "Dump more waste into the river.",
                "Remove pollution and protect the water.",
                "Introduce more plastic objects."
            ],
            answer: "Remove pollution and protect the water.",
            explanation: "Reducing pollution helps protect aquatic organisms and their habitats."
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

                <span class="section-tag">MISSION 3</span>
                <h2>🌳 Save the Ecosystem</h2>

                <div class="challenge-progress">
                    Scenario ${this.currentQuestion + 1} of ${this.questions.length}
                </div>

                <div class="scenario-illustration">
                    <span>${question.emoji}</span>
                </div>

                <h3>${question.title}</h3>

                <div class="scenario-box">
                    <strong>What is happening?</strong>
                    <p>${question.situation}</p>
                </div>

                <h4>${question.question}</h4>

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

        const feedback = container.querySelector("#answer-feedback");
        const continueButton = container.querySelector("#continue-question");

        container.querySelectorAll(".answer-button").forEach(button => {

            button.addEventListener("click", () => {

                const selected = button.dataset.answer;

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
                        ? "Not quite! Think about how this change affects the ecosystem."
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

        continueButton.addEventListener("click", () => {
            this.currentQuestion++;
            this.showQuestion(container);
        });
    }
};

window.EcosystemChallenge = EcosystemChallenge;
