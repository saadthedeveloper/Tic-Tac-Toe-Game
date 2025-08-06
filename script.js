let boxes = document.querySelectorAll(".boxes");
let resetButton = document.querySelector("#reset-button");
let winner = document.querySelector(".winner");
let themeButton = document.querySelector("#theme-mode");
let body = document.querySelector("body");

//GAME'S LOGIC BELOW

let turnX = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X"
            turnX = false;
        }
        else {
            box.innerText = "O"
            turnX = true;
        }
        box.disabled = true;

        winningPatternsIdentifier();
    })

})

const winningPatternsIdentifier = () => {
    for (let patterns of winPatterns) {

        let box1 = boxes[patterns[0]].innerText;
        let box2 = boxes[patterns[1]].innerText;
        let box3 = boxes[patterns[2]].innerText;

        if (box1 != "" && box2 != "" && box3 != "") {

            if (box1 === box2 && box2 === box3) {
                console.log("winner", box2);
                celebrateConfetti();
                boxes.forEach((box) => {
                     box.disabled = true;
                });

            }
        }
    }

};

resetButton.addEventListener("click", () => {
boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
}
)});


//CONFETTI LOGIC BELOW

const celebrateConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};

//THEME MODES LOGIC BELOW

let theme = "Light";

themeButton.addEventListener("click", () => {
    if (theme === "Dark") {
        body.classList.add("light-mode-background");
        body.classList.remove("dark-mode-background");
        body.transition = "background-color, 1.5s"

        boxes.forEach(box => {
            box.classList.add("light-mode-boxes");
            box.classList.remove("dark-mode-boxes");
        });

        themeButton.innerText = "Dark Mode";
        theme = "Light";
    } else {
        body.classList.remove("light-mode-background");
        body.classList.add("dark-mode-background");



        boxes.forEach(box => {
            box.classList.add("dark-mode-boxes");
            box.classList.remove("light-mode-boxes");

        });

        theme = "Dark";
        themeButton.innerText = "Light Mode";
    }
});
