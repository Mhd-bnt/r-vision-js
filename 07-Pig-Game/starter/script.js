'use strict';
// Selecting elements :
// ---------------------
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// Selecting button elements :
// ---------------------------
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Condition:
// -------------------
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
//Player current score :
let currentScore = 0;

// Rolling dice Functionnality :
// ------------------------------
btnRoll.addEventListener('click', () => {
  // 1. Generating random dice roll :
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Displaying dice roll :
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check if dice roll !== 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    current0El.textContent = currentScore;
  } else {
    //Switch to next player
  }
});
