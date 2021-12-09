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

//symbols display as placeholders for letters chosen
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
   const guess = inputGuess.value;
   //Check that it is a letter
   const rightGuess = validateInput(guess);
   if (rightGuess) {
      makeGuess(guess);
   }
   inputGuess.value = "";
});

const validateInput = function (input) {
   const acceptedLetter = /[a-zA-Z]/;
   if (input.length === 0) {
      guessedLetterMessage.innerText = "Oops you need to enter a letter.";
   } else if (input.length > 1) {
      guessedLetterMessage.innerText = "Please enter one letter.";
   } else if (!input.match(acceptedLetter)) {
      guessedLetterMessage.innerText = "This field must be a letter.";
   } else {
      //a letter has been entered
      return input;
   }
};

const makeGuess = function (guess) {
   guess = guess.toUpperCase();
   if (guessedLetters.includes(guess)) {
      guessedLetterMessage.innerText = "You already guessed that letter, try again!";
   } else {
      guessedLetters.push(guess);
      //check this from #4 section 1
      showGuessedLetters();
      updateWord(guessedLetters);
   }
};

const showGuessedLetters = function () {
   //Clear list
   lettersGuessed.innerHTML = "";
   for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      lettersGuessed.append(li);
   }
};

const updateWord = function (guessedLetters) {
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");
   const lettersContained = [];
   for (const letter of wordArray) {
      if (guessedLetters.includes(letter)) {
         lettersContained.push(letter.toUpperCase());
      } else {
         lettersContained.push ("●")
      }
   }
   //console.log(lettersContained);
   wordProgress.innerText = lettersContained.join("");
   wordMatches();
};

const  wordMatches = function () {
   if (word.toUpperCase() === wordProgress.innerText) {
      guessedLetterMessage.classList.add("win");
      guessedLetterMessage.innerHTML = `<p class="highlight">You guessed the correct word. Congrats! `
   }
};

