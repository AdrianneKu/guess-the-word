//unordered list target
const guessedLetters = document.querySelector(".guessed-letters");
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
   const guessLetter = inputGuess.value;
   console.log(guessLetter);
   inputGuess.value = "";
});

