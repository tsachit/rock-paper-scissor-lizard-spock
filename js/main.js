const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
}

// Play Game
const play = (e) => {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computers choice
const getComputerChoice = () => {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Get game winner
const getWinner = (p, c) => {
  if(p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

const showWinner = (winner, computerChoice) => {
  if(winner == 'player') {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.firstLetterUpperCaseInString()}</strong></p>
    `;
  } else if(winner == 'computer') {
    // Inc player score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.firstLetterUpperCaseInString()}</strong></p>
    `;
  } else {
    // Show modal result
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.firstLetterUpperCaseInString()}</strong></p>
    `;
  }
  // Update score
  updateScore();
  modal.style.display = 'block';
}

// extending string class in es6, to make first letter in string capital
Object.assign(String.prototype, {
  firstLetterUpperCaseInString() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }
});

// Restart game
const restartGame = () => {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  // Update score
  updateScore();
}

// Clear modal
const clearModal = (e) => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Update score on scoreboard
const updateScore  = () => {
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
  `;
}

// Event Listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);


