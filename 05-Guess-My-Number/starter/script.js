'use strict';

// console.log(document.querySelector('.message').textContent);

// ----------------------------------------
// // What's the DOM and DOM Manipulation
// ----------------------------------------

// ------------------------------------
// Selecting and Manipulating Elements
// ------------------------------------
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number 🎉';
// // Change the text content of the selected paragraph
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 2; // instead putting a value manually we putted in with javascript
// console.log(document.querySelector('.guess').value); //->reads the inputed data

// -----------------------
// Handling Click Events
// -----------------------
// Making our code react white the dom by using event listener
// -> An event is somthing happening on the page
// Ex : Mouse click // Mouse mouving // Key press // etc

// Event Listener we can wait to a certain event to happen
// an than react to it

// In order to listen for events we first need to select the element where the event should happen

// .addEventListener('event', function())
// for the addEventListener method we need 2 arguments :
// first the event it can be a 'click','mousehover' etc
// and Seconde we need a function to tell what to do when
// the event happen, that function is also called eventHandler
// the function or event handler get called once the event happen(in this example it happens when we click the guess button)
// const check = document.querySelector('.check'); // -> stored the check button in a variable

// check.addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value); // we store the inputed number from the input field element here. The probleme is that the input field returns a string but we need a number to compare it for our game, so we need to convert the string in to a number
// console.log(guess, typeof guess); //-> the result in the console will be 4 and number for the type

// first thing to verify in an input field is to see if there is a  value (if someone hits the button the returned value will be 0, who is a falsy value, when it gets evaluated in the logic of an if/else statement it will false, but we need a true value to execute our code so we use the !not operator to convert the false -> to true and then our if block will be executed)
//   if (!guess) {
//     document.querySelector('.message').textContent = 'No number 🚫';
//   }
// });

// ----------------------------
// Implementing the Game Logic
// ----------------------------
// Implemanting What happens if the guess is correct ?
// Implemanting What happens if the guess is to low ?
// Implemanting What happens if the guess is to heigh ?
// Create the guess number

// const secretNumber = Math.trunc(Math.random() * 20) + 1;
// We create the random number before the eventListener and not inside because if we put it inside we will recreate on each click a new random number and thats not what we want

// Math is an object givin by javascript we can use a lot of differents methods on it

// Event multiplied by 20 we will never really get 20 the maximum random number we will get is 19.99999 and with the trunc method it will be 19 we than add + 1 to make it 20

// document.querySelector('.number').textContent = secretNumber;
//here we just want to display my generrated number in the number html element
// let score = 20; //can be called state variable / its part of the application state
// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);
//   console.log(guess, typeof guess);
//   if (!guess) {
//     document.querySelector('.message').textContent = 'No number 🚫';
//   } else if (guess === secretNumber) {
//     document.querySelector('.message').textContent = 'Correct Number 🎉';
//   } else if (guess > secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too heigh 📈';
//       score = score - 1; // same as doing score --;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game !💥';
//       document.querySelector('.score').textContent = 0;
//     }
//   } else if (guess < secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too low 📉';
//       score = score - 1; // same as doing score --;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game !💥';
//       document.querySelector('.score').textContent = 0;
//     }
//   }
// });

// ---------------------------
// Manipulating CSS Styles
// ---------------------------

// The dom includes also css styling so with dom manipulatioin we can also change styles

// const secretNumber = Math.trunc(Math.random() * 20) + 1;
// let secretNumber = Math.trunc(Math.random() * 20) + 1;
// let score = 20;

// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);
//   console.log(guess, typeof guess);

//   //when there is no input
//   if (!guess) {
//     document.querySelector('.message').textContent = 'No number 🚫';

//     //When player win
//   } else if (guess === secretNumber) {
//     document.querySelector('.message').textContent = 'Correct Number 🎉';
//     document.querySelector('.number').textContent = secretNumber;
//     document.querySelector('body').style.backgroundColor = '#60b347';
//     // we dont put a dot here their only one body element
//     document.querySelector('.number').style.width = '30rem';
//     //when we manipulate a style we always need to specify a string even for width etc;

//     //when guess is to high
//   } else if (guess > secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too heigh 📈';
//       score = score - 1; // same as doing score --;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game !💥';
//       document.querySelector('.score').textContent = 0;
//     }

//     //when guess is too low
//   } else if (guess < secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too low 📉';
//       score = score - 1; // same as doing score --;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game !💥';
//       document.querySelector('.score').textContent = 0;
//     }
//   }
// });

// //the style added with javaScript will be added as inline style //

// // ------------RESET BUTTON ----------
// document.querySelector('.again').addEventListener('click', function () {
//   //Restored values
//   score = 20;
//   secretNumber = Math.trunc(Math.random() * 20) + 1;
//   //--- Styles ----
//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.number').style.width = '15rem';

//   //---Text content---
//   document.querySelector('.score').textContent = score;
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.message').textContent = 'Start guessing ...';
//   document.querySelector('.guess').value = '';
// });

// ---------------------------------

// ---------------------------
// Implementing Highscores
// ---------------------------

// let secretNumber = Math.trunc(Math.random() * 20) + 1;
// let score = 20;
// let highscore = 0;

// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);
//   console.log(guess, typeof guess);

//   //when there is no input
//   if (!guess) {
//     document.querySelector('.message').textContent = 'No number 🚫';

//     //When player win
//   } else if (guess === secretNumber) {
//     document.querySelector('.message').textContent = 'Correct Number 🎉';
//     document.querySelector('.number').textContent = secretNumber;
//     document.querySelector('body').style.backgroundColor = '#60b347';
//     // we dont put a dot here their only one body element
//     document.querySelector('.number').style.width = '30rem';
//     //when we manipulate a style we always need to specify a string even for width etc;

//     //Setting the heighscore
//     if (score > highscore) {
//       highscore = score;
//       document.querySelector('.highscore').textContent = score;
//     }
//     //when guess is to high
//   } else if (guess > secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too heigh 📈';
//       score = score - 1; // same as doing score --;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game !💥';
//       document.querySelector('.score').textContent = 0;
//     }

//     //when guess is too low
//   } else if (guess < secretNumber) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too low 📉';
//       score = score - 1; // same as doing score --;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game !💥';
//       document.querySelector('.score').textContent = 0;
//     }
//   }
// });

// //the style added with javaScript will be added as inline style //

// // ------------RESET BUTTON ----------
// document.querySelector('.again').addEventListener('click', function () {
//   //Restored values
//   score = 20;
//   secretNumber = Math.trunc(Math.random() * 20) + 1;
//   //--- Styles ----
//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.number').style.width = '15rem';

//   //---Text content---
//   document.querySelector('.score').textContent = score;
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.message').textContent = 'Start guessing ...';
//   document.querySelector('.guess').value = '';
// });

// ----------------------------------------
// Refactoring Our Code: The DRY Principle
// ----------------------------------------

//Remove some of our duplicate code
//More specifically in the scenario who the guess is to high or to low we have some repetetive code

// Why is it that bad to have some duplicate code ?
// - one of the reason is that if we want to change somthing in our code we have to change it in mutiple places

// When we first write our code it is not a big problem to have duplicate
//but as soon as we move on in the project we can use a technique called refactoring

// Refactoring = means restructure the code but without changing how it works, we improve the code and eliminate duplcates

// how to refactore ?

// - 1. identify duplicate code or almost duplicate code

// In our project example instead of having a block with the guess is to heigh or to low we will have a block where the guess is different

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Function for duplicates message
const displayMessage = function (message) {
  //parameter the message we want when calling the function
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //when there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = 'No number 🚫';
    displayMessage('No number 🚫'); //the argument that will be passed as parameter in the function call
    //When player win
  } else if (guess === secretNumber) {
    displayMessage('Correct Number 🎉');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    // we dont put a dot here their only one body element
    document.querySelector('.number').style.width = '30rem';
    //when we manipulate a style we always need to specify a string even for width etc;

    //Setting the heighscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = score;
    }
    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? 'Too heigh 📈' : 'Too low 📉');
      score = score - 1; // same as doing score --;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost the game !💥');
      document.querySelector('.score').textContent = 0;
    }
  }
});

//the style added with javaScript will be added as inline style //

// ------------RESET BUTTON ----------
document.querySelector('.again').addEventListener('click', function () {
  //Restored values
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  //--- Styles ----
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';

  //---Text content---
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing ...');
  document.querySelector('.guess').value = '';
});
