//unordered list target
const lettersGuessed = document.querySelector(".guessed-letters");
//guess button
const guessButton = document.querySelector(".guess");
//input location where player guesses the letter
const inputGuess = document.querySelector(".letter");
//location where word in progress appears
const wordProgress = document.querySelector(".word-in-progress");
//location of paragraph where remaining guesses appears
const guessesLeft = document.querySelector(".remaining");
//location of span highlighting the number of guesses remaining
const spanRemainingGuesses = document.querySelector(".remaining span");
//location of paragraph where message is shown when player guesses a letter
const guessedLetterMessage = document.querySelector(".message");
//button to appear to prompt user to play again
const playAgainButton = document.querySelector(".play-again");

//global variables  
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//add async function
const getWord = async function () {
   const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
   const words = await response.text();
   const wordArray = words.split("\n");
   const randomIndex = Math.floor(Math.random() * wordArray.length);
   word = wordArray[randomIndex].trim();
   letterWordSymbol(word);
};

//start the game
getWord();

//symbols display as placeholders for letters chosen
const letterWordSymbol = function (word) {
   const letterWordSymbolIcon = [];
   for (const letter of word) {
      //console.log(letter);
      letterWordSymbolIcon.push("●");
   }
   wordProgress.innerText = letterWordSymbolIcon.join("");
};

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

//validate input - must be a letter,  at least 1 letter entered, field must be a letter
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

//message if letter guessed 2 or more times
const makeGuess = function (guess) {
   guess = guess.toUpperCase();
   if (guessedLetters.includes(guess)) {
      guessedLetterMessage.innerText = "You already guessed that letter, try again!";
   } else {
      guessedLetters.push(guess);
      //console.log(guessedLetters);
      acceptedGuess(guess);
      showGuessedLetters();
      updateWord(guessedLetters);
   }
};

//shows guessed letters list
const showGuessedLetters = function () {
   //Clear list
   lettersGuessed.innerHTML = "";
   for (const letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = letter;
      lettersGuessed.append(li);
   }
};

//show word in progress
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

//message if letter is wrong or right guess
const acceptedGuess = function (guess) {
   const wordGuessUpper = word.toUpperCase();
      if (!wordGuessUpper.includes(guess)) {
         guessedLetterMessage.innerText = `Keep trying! ${guess} is not in the word.`;
         remainingGuesses -= 1;
      } else {
         guessedLetterMessage.innerText = `Great job! ${guess} is in the word.`;
      }
   
      if (remainingGuesses === 0) {
         guessedLetterMessage.innerHTML = `Game over! Correct word was <span class="highlight">${word}</span>.`;

         //startOver if word is incorret
         startOver();
      } else if (remainingGuesses === 1) {
         spanRemainingGuesses.innerText = `${remainingGuesses} guess`;
      } else {
         spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
      }
};
//message for correct word guessed
   const wordMatches = function () {
      if (word.toUpperCase() === wordProgress.innerText) {
         guessedLetterMessage.classList.add("win");
         guessedLetterMessage.innerHTML = `<p class="highlight">You guessed the correct word. Congrats!</p>`;

         //startOver if word is correct
         startOver();
      }
   };

//after game remove guess button, # of guesses left, letters guessed, show play again button
const startOver = function () {
   guessButton.classList.add("hide");
   guessesLeft.classList.add("hide");
   lettersGuessed.classList.add("hide");
   playAgainButton.classList.remove("hide");
};

//click event for play again button
playAgainButton.addEventListener("click", function () {
   //reset to start game over
   guessedLetterMessage.classList.remove("win");
   guessedLetters = [];
   remainingGuesses = 8;
   spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
   lettersGuessed.innerHTML = "";
   guessedLetterMessage.innerText = "";

   //start a new word
   getWord();

   //add game elements back
   guessButton.classList.remove("hide");
   playAgainButton.classList.add("hide");
   guessesLeft.classList.remove("hide");
   lettersGuessed.classList.remove("hide");
});