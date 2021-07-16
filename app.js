/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;
// get Winning Number
function getRandomNum(min,max){
    return Math.floor((Math.random()*(max-min+1)+min));
}

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-value'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listner
game.addEventListener('mousedown',function(e){
    if(e.target.className==='play-again'){
        window.location.reload();
    }
});


// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum){
      gameOver(true,`${winningNum} is correct, YOU WIN!`);
    // // Disable input
    // guessInput.disabled = true;
    // // Change border color
    // guessInput.style.borderColor = 'green';
    // // Set message
    // setMessage(`${winningNum} is correct, YOU WIN!`, 'green');

  } else {
        //Wrong number
        guessesLeft -=1;
        if(guessesLeft === 0){
        //     //game over -lost
        //     guessInput.disabled = true;
        //     // Change border color
        //     guessInput.style.borderColor = 'red';
        //     // Set message
        //     setMessage(`Game Over, you lost , the correct numer was ${winningNum}`, 'red');
        gameOver(false,`Game Over, you lost , the correct numer was ${winningNum}`);
     }else{
            //game cntinues -answer wrong
            guessInput.style.borderColor = 'red';
            guessInput.value='';
            //tell user its wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);
        }
  }
});

function gameOver(won,msg){
    const color = (won===true)?'green':'red';
    // Disable input
    guessInput.disabled =true;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg,color);
    guessBtn.value='Play Again';
    guessBtn.className += 'play-again'; 
    guessBtn.style.borderColor = '#121212';
    guessBtn.style.color='#444444';
    guessBtn.style.backgroundColor ='white';
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

