'use strict';

const btn = document.querySelector('.show-modal');
const modal = document.querySelector('.modal');
const showModal = btn.addEventListener('click', () => {
  modal.classList('show-modal');
});
