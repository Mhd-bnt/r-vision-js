'use strict';
// Selecting elements :
// ---------------------
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

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

// ------------------------------
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
    player0.classList.contains('player--active')
      ? (current0El.textContent = currentScore)
      : (current1El.textContent = currentScore);
  } else {
    //Switch to next player
    if (player0.classList.contains('player--active')) {
      current0El.textContent = 0;
      currentScore = 0;
      player0.classList.remove('player--active');
      player1.classList.add('player--active');
    } else {
      current1El.textContent = 0;
      currentScore = 0;
      player0.classList.add('player--active');
      player1.classList.remove('player--active');
    }
  }
});

// ------------
// Hold button
// ------------
let count0 = 0;
let count1 = 0;
btnHold.addEventListener('click', () => {
  if (player0.classList.contains('player--active')) {
    count0 += currentScore;
    score0El.textContent = count0;
    current0El.textContent = 0;

    currentScore = 0;
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else {
    count1 += currentScore;
    score1El.textContent = count1;
    current1El.textContent = 0;

    currentScore = 0;
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
});
