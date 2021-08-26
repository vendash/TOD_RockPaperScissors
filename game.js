const debug = true;

function computerPlay() {
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

function playRound(playerSelection, computerSelection) {
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

function game() {
    

    let playerScore = 0;
    let computerScore = 0;
    const numOfGames = 5;

    for (let i = 1; i <= numOfGames; i++) {
        const playerSelection = prompt('What is your choice? / rock, paper, scissors');
        let result = playRound(playerSelection, computerPlay());
        if (result === 'win') {
            playerScore++;
        } else if (result === 'lose') {
            computerScore++;
        }
    }

    console.log(`Game ends. Player score: ${playerScore}, computer score: ${computerScore}`);
    if (playerScore > computerScore) {
        console.log('Player wins!');
    } else {
        console.log('Computer wins!');
    }

}


game();