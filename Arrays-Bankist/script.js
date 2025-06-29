'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// New array methods for array :

// slice(): extract part of an array without modifiying initial array :

console.log(arr.slice(2)); // returns new arr but don't mutate the original array
console.log(arr.slice(2, 4)); // we can also define end parameter (end parameter like strings is not incuded)
console.log(arr.slice(-2)); // will start extracting from the end with negative begin parameter
console.log(arr.slice(1, -2)); // extract at index 1 and then from the end at -2 is included
console.log(arr.slice(0, -1)); // extract at index 1 and then from the end at -1 is included

// can use slice() to create shallow copy :

console.log(arr.slice()); //it can be more interesting to use slice to create shloow copy's since we can chain method compared to the spread operator

// SPLICE(): Works like the slice method but the ≠ is that splice mutates the original array (Mutate original array)

// console.log(arr.splice(2)); // we extracted ['c', 'd', 'e']
// console.log(arr); // but the original array was mutated and returns ['a', 'b']

arr.splice(-1); //start extraction from the end like slice
console.log(arr); // returns ['a', 'b', 'c', 'd'];

// REVERSE : for reversing an array (Mutate original array)

arr = ['a', 'b', 'c', 'd'];
let arr2 = ['a', 'b', 'c', 'd', 'e', 'f'];

console.log(arr2.reverse()); // output will be ['f', 'e', 'd', 'c', 'b', 'a'] !! the reverse() method mutates the original array

console.log(arr2);

// CONCAT method : !! Don't mutate the existing array

const letters = arr.concat(arr2);
console.log(letters); // 'fusion' betwen 2 arrays:

// Join() mehtod:

console.log(letters.join('-')); // joins an array with the divider string specified as parameter output : a-b-c-d-f-e-d-c-b-a

// At() method ;
// ------------

const arr1 = [23, 11, 64];

console.log(arr1[0]); // traditional way to find an element in an array

console.log(arr1.at(0)); // will give the same output of 23

// Imagine we want the last element of an array without knowing it length :
// we would do it like this :

console.log(arr1[arr1.length - 1]);
// or
console.log(arr1.slice(-1)[0]);

// other way of doing it with at() :

console.log(arr1.at(-1));

// Looping with forEach() :

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// Loping with for of loop :

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`${i}: You deposited  ${movement}`);
  } else console.log(`${i}:  You withdrew ${Math.abs(movement)}`); //math.abs() method removes the - sign
}

// with forEach():

movements.forEach((movement, i, array) => {
  if (movement > 0) {
    console.log(`Mouvement number ${i} : You deposited ${movement}`);
  } else
    console.log(`Mouvement number ${i} : You withdrew ${Math.abs(movement)}`);
}); //(forEach needs a callback function) \\ Higher order function -- its the forEach method that    will can the callback function

// forEach passes in the current element the index and the entire array we are looping :
// we can specify them with the name we want it doesn't matter but whats matter is the order !

// first the Element
// second the index
// third the entire array

// main difference between the 2 is that we can not break free from an forEach loop and the continue statement doesn't work too
