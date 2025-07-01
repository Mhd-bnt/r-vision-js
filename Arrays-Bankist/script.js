'use strict';

// const { useCallback } = require('react');

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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////////
// now we need to attach this html element to the movement container element :
const displayMovements = function (movements) {};

containerMovements.innerHTML = ''; // a little bit similaire to .textContent \\ textContent returns the text itself
//innerHtml returnsevery html elemnt
movements.forEach((move, i) => {
  const type = move > 0 ? 'deposit' : 'withdrawal';
  const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
    i + 1
  } ${type}</div>
          <div class="movements__value">${move}</div>
        </div>`;

  containerMovements.insertAdjacentHTML('afterbegin', html); //afterbegin // adds my new elements just at the beginning of the parent container
});
// ParentElement.insertAdjacentHTML('where ? ','The element we want to insert');
// beforeend // ads the new html element at the end of the parent element
// beforeBegin // ads new element before the targeted 'container'
// afterend  // ads new element after (outside) the targeted 'container'
displayMovements(account1.movements);
// -------------------------------------------------------------------
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase() //returns strings
      .split(' ') // create an array with the strings
      .map(name => name[0]) // map() works on arrays and also return arrays
      .join(''); //we can immeditaly chain again with the join method who works on arrays
    // that's the way to think to be able to chain methods correctly
    console.log(acc.username);
  });
};

createUsernames(accounts); // don't return a value but create a side effect

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${balance} €`;
};
calcDisplayBalance(account1.movements);
// --------------
// map() method :
// --------------

//  loop over an array and returns a new array whith each element beign a result of appliying a callback function
// const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300]; // => transforming this array element into USD

// const eurToUsd = 1.1;

// // const usdArr = movements1.map(value => {
// //   return Math.trunc(value * eurToUsd);
// // });
// // console.log(usdArr);
// const usdArr = movements1.map(value => Math.trunc(value * eurToUsd));

// console.log(usdArr);

// // doing the same using for of :

// let usdArr2 = [];
// for (const value of movements1) {
//   usdArr2.push(Math.trunc(value * eurToUsd));
// }

// console.log(usdArr2);

// const moveDescription = movements1.map(
//   (
//     mov,
//     i,
//     arr // the 3 parameters here are the 3 basic value we got by using forEach and map() method
//   ) =>
//     `Mouvement number ${i} : You ${
//       mov > 0 ? `deposited ${mov}` : `withdrew ${Math.abs(mov)}`
//     }`
// );

// console.log(moveDescription);

// -----------------
// filter() method :
// -----------------

// movements.filter(callback function to decide the filter condition )
const deposits = movements.filter(mov => {
  //what we want here is to create an array with the deposit, only the values that pass the condition will be pushed into the new array
  return mov > 0;
});
// The filter method returns an array :
console.log(deposits);

const depositsArr = [];
for (const mov of movements) {
  if (mov > 0) depositsArr.push(mov);
}
console.log(depositsArr);

// Challenge : create an array wit the withdrawal :

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// -----------------
// reduce() mehtod :
// ----------------
console.log('----reduce() mehtod----');
// Reduce the elements of an array to a single value :

// const balance = movements.reduce(); //balance here will be a single value not an entire array

// the parameter we pass in are a little bit different from the map and filter method :

// map() and filter() method parameter are :  currentElement,currentIndex and the entire array
// for the reduce() method() it's : Accumulator, currentElement,currentIndex and the entire array

const balance = movements.reduce((acc, current, i, array) => {
  //acc stands for the accumulator
  console.log(`Itteration number ${i}: ${acc} `); //to see the updated value of the accumulator after each itteration
  return acc + current; // for eeach iteration we update the accumulator
}, 0);

console.log(balance);

// the Callback function is the first paramater of the reduce method but we can add a second paramater that will be the accumulators initiaal value

// const balance = movements.reduce((acc, current, i, array) => {}, 0); first parameter is the callback functioin and second the initial value of the acculator

// without reduce method with for of loop :

let balance1 = 0;
for (const move of movements) {
  balance1 += move;
}

console.log(balance1);

// can also do other things with the reduce method :

// Want to get maximum value of the movements array:

const maxValue = movements.reduce(
  (acc, value) => (acc = acc > value ? acc : value),
  movements[0] // attention here if we wanted the smallest value i can not use 0 for the accumulator that cold alter the final result
  // i could use movements[0] fot the first accumulator value to be 100% sure
);

console.log(maxValue);

// Want to get the minimum value of the movements array:

const minValue = movements.reduce(
  (acc, value) => (acc = acc < value ? acc : value),
  movements[0]
);
console.log(minValue);

// Coding Challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.

// Your tasks:

// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ✅
// ages ('ages'), and does the following things in order:

// 1. Calculate the dog age in human years using the following formula: if the dog is  //map() method
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4✅

// 2. Exclude all dogs that are less than 18 human years old (which is the same as   //filter() method
// keeping dogs that are at least 18 years old)✅

// 3. Calculate the average human age of all adult dogs (you should already know   // reduce() Method
// from other challenges how we calculate averages 😉)

// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(
    dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4) //returned array
  );
  console.log(humanAge); //converted into human age array

  const majorityArr = humanAge.filter(dogAge => {
    if (dogAge >= 18) return dogAge;
  });
  console.log(majorityArr); // only >= 18 humanAges in this array

  const averageHumanAge = majorityArr.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  console.log(averageHumanAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
