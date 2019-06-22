const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
}

// consider first key as player, and inner key as computer
const gameRules = {
  rock: {
    rock: {
      result: 'draw',
      message: 'Both chose Rock'
    },
    paper: {
      result: 'lose',
      message: 'Paper covers Rock'
    },
    scissors: {
      result: 'win',
      message: 'Rock crushes Scissors'
    },
    lizard: {
      result: 'win',
      message: 'Rock crushes Lizard'
    },
    spock: {
      result: 'lose',
      message: 'Spock vaorizes Rock'
    }
  },
  paper: {
    rock: {
      result: 'win',
      message: 'Paper covers Rock'
    },
    paper: {
      result: 'draw',
      message: 'Both chose Paper'
    },
    scissors: {
      result: 'lose',
      message: 'Scissors cuts Paper'
    },
    lizard: {
      result: 'lose',
      message: 'Lizard eats Paper'
    },
    spock: {
      result: 'win',
      message: 'Paper disproves Spock'
    }
  },
  scissors: {
    rock: {
      result: 'lose',
      message: 'Rock crushes Scissors'
    },
    paper: {
      result: 'win',
      message: 'Scissors cuts Paper'
    },
    scissors: {
      result: 'draw',
      message: 'Both chose Scissors'
    },
    lizard: {
      result: 'win',
      message: 'Scissors decapitates Lizard'
    },
    spock: {
      result: 'lose',
      message: 'Spock smashes Scissors'
    }
  },
  lizard: {
    rock: {
      result: 'lose',
      message: 'Rock crushes Lizard'
    },
    paper: {
      result: 'win',
      message: 'Lizard eats Paper'
    },
    scissors: {
      result: 'lose',
      message: 'Scissors decapitates Lizard'
    },
    lizard: {
      result: 'draw',
      message: 'Both chose Lizard'
    },
    spock: {
      result: 'win',
      message: 'Lizard poisons Spock'
    }
  },
  spock: {
    rock: {
      result: 'win',
      message: 'Spock vaorizes Rock'
    },
    paper: {
      result: 'lose',
      message: 'Paper disproves Spock'
    },
    scissors: {
      result: 'win',
      message: 'Spock smashes Scissors'
    },
    lizard: {
      result: 'lose',
      message: 'Lizard poisons Spock'
    },
    spock: {
      result: 'draw',
      message: 'Both chose Spock'
    }
  }
}

// Play Game
const play = (e) => {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  showWinner(playerChoice, computerChoice);
}

// Get computers choice
const getComputerChoice = () => {
  const rand = Math.random();
  if (rand < 0.20) {
    return 'rock';
  } else if (rand < 0.40) {
    return 'paper';
  } else if (rand < 0.60) {
    return 'scissors';
  } else if (rand < 0.80) {
    return 'lizard';
  } else {
    return 'spock';
  }
}

// Show game winner
const showWinner = (playerChoice, computerChoice) => {
  const rule = gameRules[playerChoice][computerChoice];
  if(rule.result == 'win') {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>You Chose <strong>${playerChoice.firstLetterUpperCaseInString()}</strong></p>
      <p>Computer Chose <strong>${computerChoice.firstLetterUpperCaseInString()}</strong></p>
      <p>${rule.message}</p>
    `;
  } else if (rule.result == 'lose') {
    // Inc player score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>You Chose <strong>${playerChoice.firstLetterUpperCaseInString()}</strong></p>
      <p>Computer Chose <strong>${computerChoice.firstLetterUpperCaseInString()}</strong></p>
      <p>${rule.message}</p>
    `;
  } else {
    // Show modal result
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>${rule.message}</p>
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


