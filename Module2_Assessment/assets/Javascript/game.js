


   var randomWords = ["passion", "love", "education", "healthy"
,"coronavirus", "pandemic", "cheeky boy", "tokyo", "money-heist","depression",
"nature", "mother", "father", "United States", "responsible", "denver",
"Nepal", "God", "faith", "technology","books", "impartial", "hospitable",
"summer", "university", "work", "job", "ethics", "friendly", "important",
"rain", "storm", "artist", "bubble", "pain", "suffering", "distinct",
"strengthen", "experience","internship", "enchanting", "judicious",
"fierce", " processors", "sacrifice", "death", "heaven", "rapti",
"kathmandu", "multi-ethinic", "punctuation","outstanding", "sussex",
"rome", "singapore" ];


var maxGuess;
var guessedletters =[];
var guessingWord = [];
var usedGuessedWords = [];
var wordToMatch;
var wins = 0;





//  Wait for key press
document.onkeypress = function(event) {
    // Make sure key pressed is an alpha character
    if (isLetter(event.key)) {
      checkForLetter(event.key.toUpperCase());
    }
  };



// Check if key pressed is between A-Z or a-z
var isLetter = function(ch){
    return typeof ch === "string" && ch.length === 1
    && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
  };



  // Check if letter is in word
  function checkForLetter(letter) {
    var foundLetter = false;
    var loseSound =document.createElement("audio");
    loseSound.setAttribute("src", "assets/sounds/Looser.mp3");
     var winSound =  document.createElement("audio");
      winSound.setAttribute("src", "assets/sounds/Winner.mp3");
      var newGameSound =  document.createElement("audio");
      newGameSound.setAttribute("src", "assets/sounds/newGame.mp3");
    // Search string for letter
    for (var i=0; i < wordToMatch.length; i++) {
      if (letter === wordToMatch[i]) {
        guessingWord[i] = letter
        foundLetter = true
        winSound.play();
        // If guessing word matches random word
        if (guessingWord.join("") === wordToMatch) {
          // Increment # of wins and add word to usedGuessedWords
          wins++
          // Add word to usedGuessingWords array to not be repeated
          usedGuessedWords.push(wordToMatch)
          // console.log(usedGuessedWords)
          
          updateDisplay();
          setTimeout(resetGame, 4000);
     
        }
      }
    }
  
    if (foundLetter === false) {
      loseSound.play();
      // Check if inccorrect guess is already on the list
      if (guessedletters.includes(letter) === false) {
        // Add incorrect letter to guessed letter list
        guessedletters.push(letter)
        // Decrement the number of remaining guesses
        maxGuess--
      }
      if (maxGuess === 0) {
         
        // Add word to usedGuessedWords array to not be repeated
        usedGuessedWords.push(wordToMatch);
        newGameSound.play();
        guessingWord = wordToMatch.split(); 
        setTimeout(resetGame, 4000);
      
      }
    }
    updateDisplay();
  };

 





function begin(){
    //Get a new Word
wordToMatch = randomWords[Math.floor(Math.random()*randomWords.length)].toUpperCase();

// Setting number of maxGuess based on word length
if (wordToMatch.length <= 5) {
    maxGuess = 6;
}
else{
    maxGuess = 12;
}
// Get underscores for guessingWord from wordToMatch
for (var i=0; i < wordToMatch.length; i++){
    // Put a space instead of an underscore between multi-word options in possibleWords array
    if (wordToMatch[i] === " ") {
      guessingWord.push(" ")
    } 
    else {
      guessingWord.push("_");
    }
  }

//Updating Display
updateDisplay();
};





//Reset the Game

function resetGame(){
    // Get a new word
        // wordToMatch = randomWords[Math.floor(Math.random() * randomWords.length)].toUpperCase()
        // console.log(wordToMatch)
//  If new word has already been used randomly select another
     
   if (usedGuessedWords.length === randomWords.length) {
    newGameSound.play();
    usedGuessedWords = []
    wins = 0
    setTimeout(resetGame, 6000); 
} 
   else {
       // Get a new word
    wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
       if (usedGuessedWords.includes(wordToMatch) === true) {
       
    resetGame();
   }
    
   

//Reset word arrays
    guessedletters = [];
    guessingWord = [];

    // Reset the guessed word
    for (var i=0; i < wordToMatch.length; i++){
      // Putting a space instead of an underscore between multi-word options in possibleWords array
      if (wordToMatch[i] === " ") {
        guessingWord.push(" ")
      } 
      else {
        guessingWord.push("_");
      }
    }
    updateDisplay();
 }
};

function updateDisplay(){
    document.getElementById("totalWins").innerText = wins;
  document.getElementById("currentWord").innerText = guessingWord.join("");
  document.getElementById("remainingGuesses").innerText = maxGuess;
  document.getElementById("guessedletters").innerText =  guessedletters.join(" ");
};


begin();








