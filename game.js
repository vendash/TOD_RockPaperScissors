const debug = true;

let playerScore = 0;
let computerScore = 0;

function chooseComputer() {
    let rnd = Math.floor(Math.random() * 3);
    let result = '';
    if (rnd === 0) {
        result = 'rock';
    } else if (rnd === 1) {
        result = 'paper';
    } else {
        result = 'scissors';
    }
    return result;
}

function getResult(playerSelection, computerSelection) {
    let gameResult = '';

    playerSelection = playerSelection.toLowerCase();

    if (debug) console.log(`Player: ${playerSelection}, Computer: ${computerSelection}`);

    if (playerSelection === computerSelection) {
        gameResult = 'tie';
    } else if (playerSelection === 'rock') {
        if (computerSelection === 'paper') {
            gameResult = 'lose';
        } else {
            gameResult = 'win';
        }
    } else if (playerSelection === 'paper') {
        if (computerSelection === 'scissors') {
            gameResult = 'lose';
        } else {
            gameResult = 'win';
        }
    } else if (playerSelection === 'scissors') {
        if (computerSelection === 'rock') {
            gameResult = 'lose';
        } else {
            gameResult = 'win';
        }
    }

    return gameResult;
}

function setScores(result) {
    if (result ==='win') {
        playerScore++;
    }
    if (result === 'lose') {
        computerScore++;
    }
};

function displayScores() {
    const playerScoreBox = document.querySelector('#playerScore');
    const computerScoreBox = document.querySelector('#computerScore');

    playerScoreBox.textContent = playerScore;
    computerScoreBox.textContent = computerScore;
};

function displayResult(result) {
    const resultTextLoc = document.querySelector('#result');
    let resultText = '';
    switch (result) {
        case "win":
            resultText = 'You win!'
            break;
        case "lose":
            resultText = 'You lose!'
            break;
        default:
            resultText = 'It\'s a tie!'
    }
    resultTextLoc.textContent = resultText;
};

function playGame(e) {
    const playerChoice = e.target.innerText;
    const computerChoice = chooseComputer();

    const result = getResult(playerChoice, computerChoice);
    displayResult(result);
    setScores(result);
    displayScores();


}

const buttons = document.querySelectorAll('.playerChoices');

buttons.forEach(function (e) {
    e.addEventListener("click", playGame);
});