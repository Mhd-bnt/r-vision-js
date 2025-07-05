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
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
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
const updateUI = currentAccount => {
  // display movements
  displayMovements(currentAccount.movements);
  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
};
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////////////////
// now we need to attach this html element to the movement container element :
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // a little bit similaire to .textContent \\ textContent returns the text itself
  //innerHtml returns every html elemnt
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${move} €</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html); //afterbegin // adds my new elements just at the beginning of the parent container
  });
};

// ParentElement.insertAdjacentHTML('where ? ','The element we want to insert');
// beforeend // ads the new html element at the end of the parent element
// beforeBegin // ads new element before the targeted 'container'
// afterend  // ads new element after (outside) the targeted 'container'
// -------------------------------------------------------------------
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`; // Math.abs() takes the absolut value and removes - sign

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(mov => mov >= 1) //bank adds new rule : if intereset is below 1EURO he will not be added to the    total calculation
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} €`;
};

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

const calcDisplayBalance = function (acc) {
  //calling with account object

  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// -------------------------------------------------------------------
// Event handler functions :
let currentAccount;
btnLogin.addEventListener('click', e => {
  //prevent forme from submtting because default behavior would make the page reload
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //added optionnal chaining (pin proprety will only be read if currentAcount exists) it avoid errors and we get an undifined if the account doesn't exist
    // Display ui and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    } `;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //assignement operator works from right to left

    inputLoginPin.blur(); //making the input field losing its focus
  }
  updateUI(currentAccount);
  // console.log(currentAccount);
});
// -------------------------------------------------------------------
btnTransfer.addEventListener('click', e => {
  e.preventDefault(); //prevent the form to relaod
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    console.log('Transfert valid');
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Updating ui
    updateUI(currentAccount);
  }
});

// -------------------------------------------------------------------
// closing account :
btnClose.addEventListener('click', e => {
  e.preventDefault();
  // console.log(e);
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // console.log('account will be closed');
    const index = accounts.findIndex(
      // it works like the find method expect that it returns the index of the element who satisfy the confition
      acc => acc.username === currentAccount.username
    );
    //deleteaccount
    accounts.splice(index, 1);
    //Hide UI
    containerApp.style.opacity = 0;
    console.log(accounts);
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
// indexof would not work here because it will only search for the elements inside the accounts array with findInex we can go deep into condition and even compare proprety inside the object
// -------------------------------------------------------------------
// Requesting a loan : using some method

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov >= (amount * 10) / 100)
  ) {
    // add Movement:
    currentAccount.movements.push(amount);
    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// -------------------------------------------------------------------
let sorted = false; // state variable everytime we click on the sort button the state changes to the opposite

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  // we will use a state variable to 'monitor' the sort variable i s set to true or false :
});
//
// -------------------------------------------------------------------
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
// console.log(deposits);

const depositsArr = [];
for (const mov of movements) {
  if (mov > 0) depositsArr.push(mov);
}
// console.log(depositsArr);

// Challenge : create an array wit the withdrawal :

const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// -----------------
// reduce() mehtod :
// ----------------
// console.log('----reduce() mehtod----');
// Reduce the elements of an array to a single value :

// const balance = movements.reduce(); //balance here will be a single value not an entire array

// the parameter we pass in are a little bit different from the map and filter method :

// map() and filter() method parameter are :  currentElement,currentIndex and the entire array
// for the reduce() method() it's : Accumulator, currentElement,currentIndex and the entire array

// const balance = movements.reduce((acc, current, i, array) => {
//   //acc stands for the accumulator
//   console.log(`Itteration number ${i}: ${acc} `); //to see the updated value of the accumulator after each itteration
//   return acc + current; // for eeach iteration we update the accumulator
// }, 0);

// console.log(balance);

// the Callback function is the first paramater of the reduce method but we can add a second paramater that will be the accumulators initiaal value

// const balance = movements.reduce((acc, current, i, array) => {}, 0); first parameter is the callback functioin and second the initial value of the acculator

// without reduce method with for of loop :

let balance1 = 0;
for (const move of movements) {
  balance1 += move;
}

// console.log(balance1);

// can also do other things with the reduce method :

// Want to get maximum value of the movements array:

const maxValue = movements.reduce(
  (acc, value) => (acc = acc > value ? acc : value),
  movements[0] // attention here if we wanted the smallest value i can not use 0 for the accumulator that cold alter the final result
  // i could use movements[0] fot the first accumulator value to be 100% sure
);

// console.log(maxValue);

// Want to get the minimum value of the movements array:

const minValue = movements.reduce(
  (acc, value) => (acc = acc < value ? acc : value),
  movements[0]
);
// console.log(minValue);

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

// const calcAverageHumanAge = function (ages) {
//   const humanAge = ages.map(
//     dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4) //returned array
//   );
//   console.log(humanAge); //converted into human age array

//   const majorityArr = humanAge.filter(dogAge => {
//     if (dogAge >= 18) return dogAge;
//   });
//   console.log(majorityArr); // only >= 18 humanAges in this array

//   const averageHumanAge = majorityArr.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );

//   console.log(averageHumanAge);
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// Chaining methods :
// ------------------
// taking deposits from movements array || than convert from eur ->dollar and add them all together;

const euroToUsd = 1.1;

const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0); //filter method returns an array so we can directly call the map method on it

// console.log(totalDepositUSD);

// Coding Challenge #3

// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// as an arrow function, and using chaining!
const calcAverageHumanAge = ages => {
  const humanAge = ages
    .map(
      dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4) //returned array
    )
    .filter(dogAge => {
      if (dogAge >= 18) return dogAge;
    })
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return humanAge;
};

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😀

// Find method :
// ------------
// Allows us to find an element from an array based on an condition

const firstwithdrawal = movements.find(mov => mov < 0); // just like the filter method the find method need a callback function that returns a boolean|| the differnece is that the find method don't return an array instead it returns the first element of the array that satifay the condition

// console.log(firstwithdrawal);

// with the find method we can find an object in the accounts array based on some proprety

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// console.log(account);

// find account but with the for of loop :

// for (const account of accounts) {
//   if (account.owner === 'Jessica Davis') account;
// }

// findLast() and findLastIndex() :

console.log(movements);

const lastWithdrawal = movements.findLast(mov => mov < 0); //finlast() starts looking from the end of the array and returns the element that correspond to the condition

// console.log(lastWithdrawal);
const latestLargeMovementIndex = movements.findLastIndex(
  mov => Math.abs(mov) > 1000 //return an index
);

console.log(
  `Your latest large movement was ${
    movements.length - latestLargeMovementIndex - 1
  } movements ago`
);

// More ways of creating arrays :
// ------------------------------
const arr = [1, 2, 3, 4, 5, 6, 7]; // before we did it like this or

// or by using the array constructor like this  :

console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// we can also generating array programmatically without specifiying all the elements manually

const x = new Array(7);
console.log(x); // output will be : [empty × 7]
// if we specify 1 paramater in the new Array constructor it will return an array with a length of 7 here but no elements inside
// we can not really use that x array

// fille() method :

// x.fill(4); // it will fill the x array with the parameter we passed in
x.fill(1, 3, 5); //we can also specify where we want to start to fill | first paramater is the element i want inside the array | second paramater is the index where the 'fill' will start it's like a begin parameter here we will start at index 3| 3 parameter is the end parameter it's when the fill should stop here. at index 5 but 5 is not included
console.log(x); // output will be  : [4, 4, 4, 4, 4, 4, 4]
// we can also use the fill method with other arrays

arr.fill(23, 4, 6); // we fill add 23 at index 4 until index 5 (6 not included) the fill method mutates the original array !!
console.log(arr);

// Imagin i wante to recreate this array programmatically [1, 2, 3, 4, 5, 6, 7] how can i do it ?

// with the Array.from method :

const y = Array.from({ length: 7 }, () => 1); //!! the from method here is not used on an array !! we used it on an constructor
// here the callback function returns 1 at each iterration

// first we pass in an object with the length proprety that will be the length of the futur array and second argument will be a mapping function and we don't need any parameters inside the call back function

console.log(y);

// Creating an array from 1 to 7 :

const z = Array.from({ length: 7 }, (_, i) => i + 1); //and like reduce / map and filter we got acces to the current element and the index

console.log(z);

// underscore inside the callback function paramater is a convention for ( throw away variable) it's a value that will not be used we added it because we can not skipped and go directyly to the current index (i)

// some use case :

// Challenge : creat an array with 100 random dice rolls for example

// const diceRolls = Array.from(
//   { length: 100 },
//   () => Math.trunc(Math.random() * 6) + 1
// );

// console.log(diceRolls);

// More real use case :
// --------------------

// Array.from() was intruduced to be able to create arrays from 'array like structures' (itterables) strings sets maps and they can be converted to real arrays using Array.from()

// other good exemple of array like structures is the result of using querySelectorAll => returns an nodeList it's like an array but not a real one it doesnt have acces to arrays method, so if i want to use an array method on a nodeList a would first need to convert it into an array

// Imagine ours movements are not stored into an array :

// const movementsUI = Array.from(document.querySelectorAll('.movements__value')); //and like in this example we can see that a callback function is not mandatory if i juste want the element ans put them into an array i can do it like this

labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    current => Number(current.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});

// click here doesn't really matter we added it because if we first load the page we have only 2 elements with the movements__value classe , we only got the other movement once we are loged

// calling the map method would not work here if i called it directly on the document.querySelectorAll, because th nodeList is not an array

// Array method practice :
// ------------------------
// 1:
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);

// 2: how many deposits with at least 1000$
// flatMap()method unpack the arrays inside an array to creat an array with all elements inside :
const overThousand = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(overThousand);

// other wat of doing it with reduce()

const overThousand1 = accounts
  .flatMap(el => el.movements)
  .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0); //prefixed ++ operator

console.log(overThousand1);

// Prefixed ++ operator:

let a = 10;
// console.log(a++); //will return the old value so 10
console.log(a); //know it will return 11
// if we want to avoid such behavior we need to use the prefixed ++ operator like this:

console.log(++a); // output will be 11

// 3 use reduce to get an object as output :

// create an object which contains the sum of the deposits and of the withdrawals

const { deposits: depot, withdrawals: retrait } = accounts // the returned value is an object so we can immediatly destructure it
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, current) => {
      current > 0 ? (sums.deposits += current) : (sums.withdrawals += current);
      return sums; // returning sum object containing deposits and withdrawal proprety
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(depot, retrait);

// 4:
// Create a function to convert any string to a title case

const convertToTitleCase = title => {
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(el =>
      exceptions.includes(el) ? el : el.replace(el[0], el[0].toUpperCase())
    )
    .join(' ');
  return titleCase;
};

console.log(convertToTitleCase('and Here is Another Title with an eXAMPLE'));

// Challenge #5 :

// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.

// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).

// Your tasks:

// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)✅

// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓 ✅

// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').✅

// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!" ✅

// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)✅

// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)

// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)

// Hints:

// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them 😉

// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.

// Test data:

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// GOOD LUCK 😀

// const n = dogs.map(el => {});

// Adding recommandedFood proprety in dog object :
dogs.forEach(el => {
  el.recommendedFood = Math.trunc(el.weight ** 0.75 * 28);
});

// Finding dogs owner
const findOwner = function (owners) {
  const owner = dogs.find(current => {
    if (current.owners.includes(`${owners}`)) return current;
  });
  const eatsEnough =
    owner.curFood > owner.recommendedFood
      ? `${owners}'s dog eats to much`
      : `${owners}'s dog don't eat enough`;
  return eatsEnough;
};
// console.log(dogs[0].owners.includes('Alice'));
console.log(findOwner('Bob'));
// console.log(dogs);

console.log(dogs);

// dogs.forEach(current => {
//   current.curFood > current.recommendedFood ?
// })

const ownersEatTooMuch = [];
const ownersEatTooLittle = [];
dogs.find(current => {
  current.curFood > current.recommendedFood
    ? ownersEatTooMuch.push(...current.owners)
    : ownersEatTooLittle.push(...current.owners);
});

console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

// 4:
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs are eating too much `);
console.log(`${ownersEatTooLittle.join(' and ')}'s are eating too little `);

let eatsRecommanded = dogs.forEach(dog =>
  console.log(dog.recommendedFood === dog.curFood)
);

console.log(
  dogs.every(
    current =>
      current.curFood > current.recommendedFood * 0.9 &&
      current.curFood < current.recommendedFood * 1.1
  )
);

let test = dogs.every(dog => console.log(dog));

// Some and Every method :
// -----------------------
console.log(movements);

console.log(movements.includes(-130)); //test for 'equality' returns true or false

// what if we want to test for a condition ? :

// some() :

// looking for any positive movements in the movements array :

const anyDeposits = movements.some(mov => mov > 0); //and we can specify any condition we want as parameter
console.log(anyDeposits); // returns true or false

// looking for any deposits above 5000 :

const aboveFive = movements.some(mov => mov >= 5000);

console.log(aboveFive);

// returns true or false

// Every() method :
// ----------------

// returns true ONLY if all element pass the condition that we set as parameter :

const n = movements.every(mov => mov > 0);

console.log(n); //returns false

const m = movements.every(mov => typeof mov === 'number');

console.log(m); // returns true

// flat and flatMap :

//  imagine having a nested array
const ar = [[1, 2, 3], [4, 5, 6], 7, 8];

// what if we want to take all elements ousite the sub arrays and put them all together inside one array :

console.log(ar.flat()); //no call back function just like this

// imagin havin a deep nested array :
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];

console.log(arrDeep.flat()); // outpu will be. : [Array(2), 3, 4, Array(2), 7, 8] flat only goes one level deep

// but we can actuelly specify a parameter to the flat method and this will change the 'deepness' of the flat by default it's one but we can set it to 2 if needed :
console.log(arrDeep.flat(2)); // output : [1, 2, 3, 4, 5, 6, 7, 8] and now we go into the 'second' level of nesting

console.log('-----All movements-----');
const allMovArr = accounts.flatMap(el => el.movements);

console.log(allMovArr);

const sumAllMov = allMovArr.reduce((acc, mov) => acc + mov, 0);

console.log(sumAllMov);

// with Chaining :

const sumAllMovements = accounts
  .flatMap(el => el.movements) // the differnce between normal flat is that flatmap only goes to one level of nesting and we can not change that so if i have 2 or 3 levels of nesting flat is sill the way to go
  .reduce((acc, mov) => acc + mov, 0);

console.log(sumAllMovements);

// Sorting method :
// ---------------
// with strings :

const owners = ['Jonas', 'Zak', 'Adam', 'Marta'];

console.log(owners.sort()); // !! Mutate the original array !!

console.log(owners); // output will be : ['Adam', 'Jonas', 'Marta', 'Zak']

// with numbers :

const numArr = [12, 25, 4, 62, 41, 18, 5];

// console.log(numArr);
// console.log(numArr.sort());

// with numbers the result is not what we expect and thats because the sort() method does the sorting based on strings :

// first the sort method converts everything to string and then does the sorting

// how to fix this behavior ? by passing a compare callback function into the sort mehtod :

numArr.sort((a, b) => {
  if (a > b) return 1; //change order
  if (b > a) return -1; //keep order
}); // called with 2 arguments a is the current valu and b is the next value

// the logic is :

// Ascendant order -> from smaller to bigger :
// less than 0 ? A before B
// greater than 0 ? B before A

// numArr.sort((a, b) => a - b);
// current element (12) - next element (25) will return negative value that means that be is greater than a so no changement
console.log(numArr);

console.log(movements.sort((a, b) => (a - b < 0 ? -1 : 1)));

// Array Grouping : Groupe values depending based on a condition condition :
// -------------------------------------------------------------------------

console.log('-----Grouping method--------');
console.log(movements);

// gouping deposits together and withdrawals together :

const groupedMovements = Object.groupBy(movements, mov =>
  mov > 0 ? 'deposits' : 'withdrawal'
); // accepts 2 parameters first is the array seconde is a callback function which will determine how we will group the values
console.log(groupedMovements);

// returns an object with 2 propreties : deposits and withdrawals who hold arrays as value

const groupedByActivity = Object.groupBy(accounts, account => {
  const movementCount = account.movements.length;
  if (movementCount >= 8) return 'very active';
  if (movementCount >= 5) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});

console.log(groupedByActivity);

// using groupBy on objects (main use cases) :

const groupedAccounts = Object.groupBy(accounts, account => account.type);

console.log(groupedAccounts);
