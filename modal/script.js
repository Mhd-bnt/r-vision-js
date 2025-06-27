'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');
// limitation of querySelector() with show-modal we have 3 buttons but only the first one is targeted thats how querySelector works only the first element will be targeted even if multiple elements have the same className, so we can use querySelectorAll
// const showModal = btn.addEventListener('click', () => {
//   modal.classList('show-modal');
// });

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden'); // we can remove multiple classes by separiting them by , , (!!! when we remove classname we don't need to add a dot !!!)
};

for (const btn of btnOpenModal) {
  btn.addEventListener('click', openModal);
}
btnCloseModal.addEventListener('click', closeModal); // No parenthesis  here !!! js would call the function immediatly if we do that !!!!

overlay.addEventListener('click', closeModal);

// Handling an ESC keypress event
// ------------------------------

document.addEventListener('keydown', e => {
  // event creates an object and we can look at that object when we pass a paremeter in the handler function

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}); //3 types of event for keys = key down  || key press   || key up

// keyup : lift finger up the keyboard
// keydown : press down a key
// keypress:keeps executing while finger presses a key
