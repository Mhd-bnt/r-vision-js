"use strict";
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";
// const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// const openingHours = {
//   [weekDays[3]]: {
//     open: 12,
//     close: 22,
//   },
//   [weekDays[4]]: {
//     open: 11,
//     close: 23,
//   },
//   [weekDays[5]]: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({ starterIndex, mainIndex, time, adress }) {
    console.log(
      `Order received ! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be deliverd to ${adress} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `here is your delicous pasta with ${ing1}, ${ing2} and ${ing3} !`
    );
  },
  orderPizza: function (mainIng, ...otherIng) {
    console.log(mainIng, otherIng);
  },
};

// Array destructuring :
// -------------------

// const arr = [2,3,4];

// const [a,b,c] = arr;

// console.log(a,b,c)

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// switch 2 values with destructuring :
// -----------------------------------

[secondary, main] = [main, secondary];

console.log(main, secondary);

// Receive 2 values from a function :
// ---------------------------------
const [first, second] = restaurant.order(2, 0);

console.log(first, second);

// Taking out values with nested array :
// ------------------------------------

const nested = [2, 4, [5, 6]];

// const [i,,j] = nested;

// console.log(i,j)

const [i, , [j, k]] = nested;

console.log(i, j, k); //=> output will be 2 5 6

//  Default values with destructuring :
// ------------------------------------

const [p = 0, q = 0, r = 0] = [8, 9]; // imagin we don't know the length off this array and try to take out à value that de not exist

console.log(p, q, r); // output will be 8 9 0

// Destructuring Objects
// ---------------------

// const {name,openingHours,categories} = restaurant;

// console.log(name,openingHours,categories)

// change variable names :

const { name: restName, openingHours: hours, categories: tags } = restaurant;

console.log(restName, hours, tags);

// Setting default values :

// const {menu = [],starterMenu : starters = []} = restaurant

// console.log(menu,starters);

// Mutating variables while destructuring in objects:

let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };

// {a,b} = obj; // -> will not work because when we start a line with {} js expects a code block, and since we cannot assign anything to a code block we got a syntax error
({ a, b } = obj); // -> the trick is to wrapp up everything between ()

console.log(a, b);

// Destructuring nested objects :

const {
  openingHours: {
    fri: { open: o, close: c },
  },
} = restaurant;

console.log(o, c);

const output = restaurant.orderDelivery({
  name: "mehdi",
  time: "22:30",
  adress: "Via del sol",
  mainIndex: 2,
  starterIndex: 2,
});

// The spread operator :
// ---------------------

const arr = [7, 8, 9];

const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// with spread operator :

const goodArr = [1, 2, ...arr];

console.log(goodArr);
console.log(...goodArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// creating shellow copie :
const mainMenuCopie = [...restaurant.mainMenu];

// merging 2 arrays together or more:

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// Create function accepting multiple parameters :

// const ingrediants = [prompt(`What ingrediants do you want ?`),prompt(`chose a second ingrediant ?`),prompt(`chose a thord ingrediant?`)];
// restaurant.orderPasta(...ingrediants);

// Spread operator with objects :
// ---------------------------------

const newRestaurant = { ...restaurant, founder: "Guiseppe", foundedIN: 1998 };

console.log(newRestaurant);

// Rest pattern and Rest parameter :
// ---------------------------------

// With arrays :

const [firstMenu, ...others] = restaurant.starterMenu;
console.log(firstMenu, others);

// with objetcs :

const { name, ...othersRest } = restaurant;

console.log(name);
console.log(othersRest);

// REST parameter :

// Passing multiple parameter at the same time :
const add = function (...number) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) sum += number[i];
  console.log(sum);
};

add(5, 6, 8, 1);
add(5, 3, 7, 2);
add(3, 6, 6, 1);
add(1, 6, 4, 1);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza("spinach", "tomato", "onions");

// Short circuiting (&& and ||) :
// ----------------------------

// can combine with logical operator : any data type , return any data type , and they do short-circuiting :
console.log("------- OR short-circuiting --------");

// Short-circuiting with or operator (||) :
// -------------------------------------

console.log(3 || "mehdi"); // => if first value is a truthy value it will be returned
console.log("" || "mehdi"); // -> returned value "mehdi"
console.log(true || 0); //returned value true
console.log(undefined || null); // both are falsy so the last one will be returned : null

console.log(undefined || 0 || "" || "hello" || 23 || null); // returned value will be 'hello'

// restaurant.numGuests = 23;
// const guests1 = restaurant.numGuests || 10; // verify if the proprety numGuests exist if false we will put a default value of 5

// console.log(guests1);

console.log("------- AND short-circuiting --------");
// short-circuiting with and operator (&&) :
// --------------------------------------

// works on the opposite way than the or operator, && operator short curcuits at the first falsy value

console.log(0 && "jonas"); // will return 0 because its falsy
console.log(7 && "Mehdi"); // returned value will be 'mehdi'

console.log("Hello" && 23 && null && "mehdi"); // returned value will be null

// Pratical exemple :

// instead of this :
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

// we can do this :

restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

// The Nullish Coalescing Operator (??) :
// --------------------------------------

// The probleme here is that 0 is a valid number but since it's a falsy value the default value will be returned so 10

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10; // verify if the proprety numGuests exist if false we will put a default value of 5

console.log(guests);

// so we can use the The Nullish Coalescing Operator (??) :

const guests1 = restaurant.numGuests ?? 10;

console.log(guests1);

// Nullish Coalescing Operator workds with the idea of nullish values instead of falsy values
// nulish values are : null and undifined (does not include 0 or '')

// Logical Assignment Operators:
// -----------------------------
console.log("------- Logical Assignment Operators: --------");

const rest1 = {
  name: "Capri",
  // numGuests: 20,
  numGuests: 0, //problem if we use 0
};
const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

// setting default value for number of guests :
// rest1.numGuests = rest1.numGuests || 10; //-> output 20
// rest2.numGuests = rest2.numGuests || 10; //-> output 10

// console.log(rest1, rest2);

// With or assignement operator :
// ------------------------------

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// console.log(rest1, rest2);

// nullish assignement operator :
// ----------------------------------------

rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// console.log(rest1, rest2);

// Logical and assignement operator :
// ----------------------------------
// let's say we want to anonymise the owners name
console.log("anonymous");
rest1.owner &&= "Anonymous";
rest2.owner &&= "Anonymous";
console.log(rest1, rest2);

// Looping Arrays: The for-of Loop :
// --------------------------------

const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu1) console.log(item); // with for of loops we can still access continue and break key words

// but what if we also want the current index with the current element ? :
// ----------------------------------------------------------------------

for (const [key, item] of menu.entries()) {
  console.log(`${key + 1} : ${item}`);
}
