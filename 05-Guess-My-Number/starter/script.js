'use strict';

// Selecting dom elements :
// -------------------------
// console.log(document.querySelector('.message').textContent); //selector like css so we need to target the class name
// document.querySelector('#message'); //selector like css so we need to target the class name like this if it's an id

// ----------------------------------------
// // What's the DOM and DOM Manipulation
// ----------------------------------------

// ------------------------------------
// Selecting and Manipulating Elements
// ------------------------------------

document.querySelector('.message').textContent = 'Correct Number 🎉!';

// Selecting secret number :
document.querySelector('.number').textContent = 13;
// selecting the score ;
document.querySelector('.score').textContent = 10;

// selecting input field :
document.querySelector('.guess').value = 23; // we can also set a value in the input field
console.log(document.querySelector('.guess').value); // to read the value of a input field : .value proprety is used

// -----------------------
// Handling Click Events
// -----------------------
// Making our code react white the dom by using event listener
// -> An event is somthing happening on the page
// Ex : Mouse click // Mouse mouving // Key press // etc

// Event Listener we can wait to a certain event to happen
// an than react to it

// In order to listen for events we first need to select the element where the event should happen

// ----------------------------
// Implementing the Game Logic
// ----------------------------
// Implemanting What happens if the guess is correct ?
// Implemanting What happens if the guess is to low ?
// Implemanting What happens if the guess is to heigh ?
// Create the guess number

// const secretNumber = Math.trunc(Math.random() * 20) + 1;
// We create the random number before the eventListener and not inside because if we put it inside we will recreate on each click a new random number and thats not what we want

// ---------------------------
// Manipulating CSS Styles
// ---------------------------

// //the style added with javaScript will be added as inline style //

// // ------------RESET BUTTON ----------

// ---------------------------------

// ---------------------------
// Implementing Highscores
// ---------------------------

// //the style added with javaScript will be added as inline style //

// // ------------RESET BUTTON ----------

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

//the style added with javaScript will be added as inline style //

// ------------RESET BUTTON ----------
