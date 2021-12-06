//unordered list target
const lettersGuessed = document.querySelector(".guessed-letters");
//guess button
const guessButton = document.querySelector(".guess");
//input location where player guesses the letter
const inputGuess = document.querySelector(".letter");
//location where word in progress appears
const wordProgress = document.querySelector(".word-in-progress");
//location of paragraph where remaining guesses appears
const remainingGuesses = document.querySelector(".remaining");
//location of span highlighting the number of guesses remaining
const spanRemainingGuesses = document.querySelector(".remaining span");
//location of paragraph where message is shown when player guesses a letter
const guessedLetterMessage = document.querySelector(".message");
//button to appear to prompt user to play again
const playAgainButton = document.querySelector(".play-again");

//starting word to test game  
const word = "magnolia";
const guessedLetters = [];

const letterWordSymbol = function (word) {
   const letterWordSymbolIcon = [];
   for (const letter of word) {
      console.log(letter);
      letterWordSymbolIcon.push("●");
   }
   wordProgress.innerText = letterWordSymbolIcon.join("");
};

letterWordSymbol(word);

guessButton.addEventListener("click", function (e) {
   e.preventDefault();
   //Remove message
   guessedLetterMessage.innerText = "";
   //Pull what is entered in the inputGuess
   const guessLetter = inputGuess.value;
   //Check that it is a letter
   const rightGuess = validateInput(guessLetter);
   if (rightGuess) {
      makeGuess(guess);
   }
   inputGuess.value = "";
});

const validateInput = function (input) {
   const acceptedLetter = /[a-zA-Z]/;
   if (input.length === 0) {
      message.innerText = "Oops you need to enter a letter.";
   } else if (input.length > 1) {
      message.innerText = "Please enter one letter.";
   } else if (!input.match(acceptedLetter)) {
      message.innerText = "This field must be a letter.";
   } else {
      return input;
   }
};

const makeGuess = function (guess) {
   guess = guess.toUpperCase();
   if (guessedLetters.includes(guess)) {
      message.innerText = "You already guessed that letter, try again!";
   } else {
      guessedLetters.push(guess);
      console.log(guessedLetters);
   }
};

