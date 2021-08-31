const debug = true;

let playerScore = 0;
let computerScore = 0;
const scoreToWin = 5;

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
    if (result === 'win') {
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


function showComputerChoice(choice) {
    const computerChoiceImg = document.querySelector('#computerChoice');
    const playerBorder = document.querySelector('#computer');
    playerBorder.classList.add('computerBorderColor');
    computerChoiceImg.classList.add('fadeOut');
    switch (choice) {
        case "rock":
            computerChoiceImg.src = "assets/rock.png"
            break;
        case "paper":
            computerChoiceImg.src = "assets/paper.png"
            break;
        default:
            computerChoiceImg.src = "assets/scissors.png"
    }
}

function hideComputerChoice() {
    const computerChoiceImg = document.querySelector('#computerChoice');
    computerChoiceImg.src = "";
    const playerBorder = document.querySelector('#computer');
    playerBorder.classList.remove('computerBorderColor');
}

function hidePlayerIcons() {
    const buttons = document.querySelectorAll('.playerChoices');

    buttons.forEach(function (e) {
        e.style.display = 'none';
    });
}

function showPlayerIcons() {
    const buttons = document.querySelectorAll('.playerChoices');

    buttons.forEach(function (e) {
        e.style.display = 'inline';
    });
}

function showPlayerChoice(choice) {
    const playerChoiceLoc = document.querySelector('#player');
    const playerChoiceImg = document.createElement('img');
    const playerBorder = document.querySelector('#player');
    playerBorder.classList.add('playerBorderColor');
    playerChoiceImg.classList.add('iconBig');
    playerChoiceImg.setAttribute('id', 'playerChoice');
    switch (choice) {
        case "rock":
            playerChoiceImg.src = "assets/rock.png"
            break;
        case "paper":
            playerChoiceImg.src = "assets/paper.png"
            break;
        default:
            playerChoiceImg.src = "assets/scissors.png"
    }
    playerChoiceImg.addEventListener('click', newRound);
    playerChoiceLoc.appendChild(playerChoiceImg);
}

function hidePlayerChoice() {
    const playerChoiceImg = document.querySelector('#playerChoice');
    playerChoiceImg.remove();
    const playerBorder = document.querySelector('#player');
    playerBorder.classList.remove('playerBorderColor');
}

function newRound() {
    if (debug) console.log('newRound clicked');
    hideComputerChoice();
    hidePlayerChoice();
    showPlayerIcons();
}

function isWinner() {
    return playerScore === scoreToWin || computerScore === scoreToWin;
}

function playGame(e) {
    if (debug) console.dir(e.target.dataset.value);

    const playerChoice = e.target.dataset.value;
    const computerChoice = chooseComputer();
    hidePlayerIcons();

    showPlayerChoice(playerChoice);
    showComputerChoice(computerChoice);

    const result = getResult(playerChoice, computerChoice);
    displayResult(result);
    setScores(result);
    displayScores();

    if (isWinner()) {
        const resultTextLoc = document.querySelector('#result');
        if (playerScore > computerScore) {
            resultTextLoc.textContent = "You have won the game!"
        } else {
            resultTextLoc.textContent = "You have lost the game!"
        }
        resultTextLoc.textContent = resultTextLoc.textContent + " Press F5 to play again";
        const player = document.querySelector('#player');
        player.style.display = 'none';
        const computer = document.querySelector('#computer');
        computer.style.display = 'none';
    };    

}

const buttons = document.querySelectorAll('.playerChoices');

buttons.forEach(function (e) {
    e.addEventListener("click", playGame);
});