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

// Enhanced Object Literals :
// --------------------------
// ES6 introduce 3 new ways to which makes it easier to writte objects litteral like the rest object below :

// 1) We can  'compute' proprety names :
const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]; //for exemple instead of writting manually the proprety name manually oin the object :

const openingHours = {
  [weekDays[3]]: {
    // exemple concret
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    // we want this openingHours object inside the rest object
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const rest = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // openingHours: openingHours, // before ES6 we would do it like this to add another object || the probleme is that the proprety name matches the variable name

  // 2) with ES6 we add another object juste by using the variable name like this :

  openingHours,
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
  // orderPizza: function (mainIng, ...otherIng) {
  //   console.log(mainIng, otherIng);
  // },

  //3)  writting methods in ES6 : we don't need anymore to create a proprety and set it as a function expression we can do it like this :
  // so we just remove the function keyword :
  orderPizza(mainIng, ...otherIng) {
    console.log(mainIng, otherIng);
  },
};

// Optional Chaining (?.) :
// ------------------------
console.log("------Optional Chaining (?.)------");
// imagin this restaurant objects cames from an api call and that we don't know if some proprety's exist :
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon);
// withtou optional chaining we would need logical operator / if statement to verify if a propety exist to avoid an error but with optional chaining it is much easier to verify if a certain proprety exists

// Optional chaining :

// console.log(restaurant.openingHours.mon?.open); //=> whats before the question mark in this case mon will be verified and if it doesnt exist undifiended will be returned

// console.log(restaurant.openingHours?.mon?.open);

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// Real world example :

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);
} // !!! if we want to use a variable name as proprety name like here we need the bracket notation !!!

// optional chaining by calling method :

// verifiying if a method exist before calling it

console.log(restaurant.order?.(0, 1) ?? "Method does not exist");

console.log(restaurant.orderBy?.() ?? "Method does not exist"); // trying with method ta do not exist combining with nullish operator

// Optional chaining with Array :

// to check if an array is empty :
const users = [
  {
    name: "mehdi",
    email: "medben@glmail.com",
  },
];
console.log(users[0]?.name ?? "User array empty");

// Looping Objects: Object Keys, Values, and Entries :
// --------------------------------------------------

// looping over proprety names with Object.key :

for (const day of Object.keys(restaurant.openingHours)) console.log(day);

// looping over values with Objects.values():

for (const value of Object.values(restaurant.openingHours)) console.log(value);

// using destructuring to get the exact opening and closed values :
for (const { open, close } of Object.values(restaurant.openingHours))
  console.log(open, close);

// Loop over key and values combined with Object.entries() :

const entries = Object.entries(restaurant.openingHours);

for (const [key, { open, close }] of entries)
  console.log(`On ${key} we open at ${open} and we close at ${close}`);

// Sets:
// -----

// Collection of unique values a set can not have duplicates :

const medSet = new Set(["js", "html", "figo", "figo", "foot", "foot"]); // as parameter we need to pass in a iterable  (array)

console.log(medSet);

// Getting size of a set : .size
console.log(medSet.size);

// Verifiying if a element is inside a set : has()
console.log(medSet.has("figo"));

// Add a new element to a set :  add()
console.log(medSet.add("chat"));

// we can delete element from a set : delete()

console.log(medSet.delete("chat"));
console.log(medSet);

// we can delete all elements inside a set : .clear()
// medSet.clear();
// console.log(medSet);
// how to retrieve data and take them out from a set  ? we have no way of doing it since in sets we have no index's,

// but what we could do is using the spread operator to transform a set into an array after removing all duplicates

// since set are iterable we can loop over them ! :

for (const item of medSet) console.log(item);

// Big use case for sets :

// Main use case for sets is to remove duplicate values from arrays

// Example

const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];

// We just want to know how many différent position they are

const staffUnique = [...new Set(staff)];

console.log(staffUnique);

// New Operations to Make Sets Useful :
// -----------------------------------

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);

// some new set methods :

// intersection() : finds values that are similar to 2 sets

const commonFoods = italianFoods.intersection(mexicanFoods);
console.log([...commonFoods]);

// commun task to verify if one or many elements are common between 2 arrays so with intersection method it's much easier

// union() : 'joins' two sets together to create one set with unique values and removing the duplicates

const mexItaUnion = italianFoods.union(mexicanFoods);

console.log(mexItaUnion);

// difference() : compare 2 sets and add shows the values that are différente from the first set compared to the set we put as parameter

const diffFood = mexicanFoods.difference(italianFoods);

console.log(diffFood);

// symmetricDifference():  Takes the values that are not present in both sets and creates a new set with it

const uniqueItalianAndMexican = italianFoods.symmetricDifference(mexicanFoods);

console.log(uniqueItalianAndMexican);

// isDisjointFrom():  verify if a set is totally different from another set (no value in common between 2 sets) -> return a boolean

const isDiff = mexicanFoods.isDisjointFrom(italianFoods);

console.log(isDiff);

// Maps : fundamentals

// maps  -> data structure used to map values to keys just like object data is stored in key/value pairs:

// the biggest difference between maps and objects : in maps Keys can have any data type

const restMap = new Map(); // easiest way of creating a new map : first empty map
restMap.set("name", "Classico Italiano"); //add new element

restMap.set(1, "Firenze,Italy"); //using number as key
restMap.set(2, "Lisbon,Portugal");

//Set method returns the updated map important to know because it allows us to  'chain' the set methods
// example :

restMap
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "we are open")
  .set(false, "We are closed");
console.log(restMap);

// To read data from a map we use the get method :

// console.log(restMap.get(true)); // -> use key as parameter to get the value

const time = 21;

console.log(
  restMap.get(time > restMap.get("open") && time < restMap.get("close"))
);

//has() :  Searching for a certain key in a map returned value will be a boolean

console.log(restMap.has("open")); // parameter to pass in the function is the key

// delete(): delete an element by passing the key as paremeter
restMap.delete(false);
console.log(restMap);

// size proprety
console.log(restMap.size); // -> output will be 7

// clear() : remove all elements inside a map
restMap.clear();

// Array as key :
// -------------
restMap.set([1, 2], "Test");

console.log(restMap.get([1, 2])); // Returned value will be undefined the array key used and the array that i passed as parameter are not pointing to the same adress in the heap so for javascript i try to acces a proprety that doesn't exist so it returns undefined

// Here we could face a problem if we try to find the value juste by passing an array [1,2] because de key thats used in the map is not the same as the one we use with the .get([1,2]) they point in a different location in the memory heap, so if i xant to use an array as key it's better to store the array in a variable and then use the variable as key :

const testMap = new Map();

const arrKey = [1, 2];
testMap.set(arrKey, "Test");

console.log(testMap.get(arrKey));

// having keys with any data types can be usefull for dom element who are also objects :

testMap.set(document.querySelector("h1"), "test");

console.log(testMap);

// Maps: Iteration :
// -----------------

// Other way to add new elements to a map without using the set method  :

const question = new Map([
  ["question", "What's the best programming language in the world ?"],
  [1, "C"],
  [2, "java"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "Correct answer ! :D"],
  [false, "Wrong answer... Try again !"],
]);

// Convert objects to maps :

const openingHoursMap = new Map(Object.entries(openingHours));

console.log(openingHoursMap);

// Loop over maps :
// -----------------

// Quizz app :
console.log(question.get("question"));
// Ex : only print an element if the key is a number :
for (const [key, value] of question) {
  console.log(typeof key === "number" ? `Answer ${key} : ${value}` : "");
}

// const answer = Number(prompt("Enter answer 1, 2 or 3"));

// console.log(
//   Number(answer) === question.get("correct")
//     ? question.get(true)
//     : question.get(false)
// );

// console.log(question.get(answer === question.get("correct")));

// sometime we need to convert a map back into an array :

// convert map to array :

console.log([...question]);

// Working With Strings - Part 1 :
// --------------------------------
console.log("--- Working With Strings---");
const airline = "TAP Air Portugal";

const plane = "A320";

console.log(airline.length);
console.log("B737".length);

// String methods :

// indexOf() : gives the position of the letter i pass as paremeter in the string

console.log(airline.indexOf("r")); //=> give first occurence
console.log(airline.lastIndexOf("r")); //=> give last occurence
console.log(airline.indexOf("Portugal")); //we can look for entire words (give the index where the word starts) !! Case sensetive !!

// What can we do with this indexes and why are they usefull ? 1 use case extracting parts with slice() method :

// slice() : extracting parts of a string (slice method need index as arguments)

console.log(airline.slice(8)); // -> output will be portugal

// the first parameter we use in the slice method is the begin parameter the extraction starts at index 8 in this example, but can add an end parameter :

console.log(airline.slice(8, 11)); // output will be Por the end parameter is not inculed like the begin parameter !!!
// side note : the length of th extracted substring will be end parameter - begin parameter

// the extracted part is called a substring

console.log(airline.slice(0, airline.indexOf(" ")));

// Extracting the last word exercices :

console.log(airline.slice(airline.lastIndexOf(" ") + 1));

// negative begin parameter will start extracting from the end :

console.log(airline.slice(-1)); //=> output will be l
console.log(airline.slice(1, -1)); //=> output will be  = AP Air Portuga

const checkMiddleSeat = (seat) => {
  // B and E are middle seat
  const isMiddleSeat = seat.slice(-1);
  console.log(
    isMiddleSeat === "E" || isMiddleSeat === "B"
      ? "You have a middle seat !"
      : "You don't have a middle seat"
  );
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

// ----------------------------------------------------------------------------------------------------------------------------
// How does it work ?  String are just primitive values why do they have methods ? mehtods are only avaible on objects

// Js engine turns the string primitive into a string objects  ( process is called boxing)

// what javascript does is to call the new String() method on a string to turn them into a string object :

// when the operation is done string object is turned back to string primitive

// -----------------------------------------------------------------------------------------------------------------------------

console.log(new String("Mehdi"));
console.log(typeof new String("Mehdi")); // ouput will be : object

// Working With Strings - Part 2 :

// toLowerCase():

console.log(airline.toLowerCase());

// toUpperCase():

console.log(airline.toUpperCase());

// Fix capitalization in name :

const passenger = "MehDI";

const nameLower =
  passenger.slice(0, 1).toUpperCase() + passenger.slice(1).toLowerCase();

console.log(nameLower);

// comparing email :
const email = "hello@jonas.io";

const loginEmail = "  Hello@Jonas.Io  \n";

const loginEmailCorrect = loginEmail.toLowerCase().trim();
console.log(loginEmailCorrect);
console.log(email === loginEmailCorrect);

// replace part of string  :

const priceUS = "288,97$";

const priceEU = priceUS.replace("$", "€").replace(",", ".");

console.log(priceEU);

const annoucement =
  "All passengers come to boarding door 23.Boarding door 23! ";

// replace door -> gate

console.log(annoucement.replaceAll("door", "gate"));
console.log(annoucement.replace(/door/g, "gate")); // -> using regular expression to target all occurence for door

// 3 string methods that return booleans :
// ---------------------------------------

// includes():
const plane1 = "Airbus A320neo";

console.log(plane1.includes("A320")); // output will be true
console.log(plane1.includes("Boeing")); // output will be false
// startsWith( :
console.log(plane1.startsWith("Air"));
// endsWith():

if (plane1.startsWith("Airbus") && plane1.endsWith("neo")) {
  console.log("Part of the new airbus familly ");
}

const checkBaggage = (items) => {
  const itemLower = items.toLowerCase();
  itemLower.includes("knife") || itemLower.includes("gun")
    ? console.log("You are not allowed in 🚫")
    : console.log(`You are welcome ✅ `);
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

// String methods part 3 :

// split() : split a string into multiple parts based on a divider string

console.log("a+very+nice+string".split("+")); // return an array : ['a', 'very', 'nice', 'string']
console.log("Figo Luis".split(" "));

const [firstName, lastName] = "Figo Luis".split(" "); // combining destructuring with split

console.log(firstName, lastName);

// join() : opposite of split() bring element of an array together

console.log(["Mrs", firstName, lastName].join(" ")); // output will be  : Mrs Figo Luis

const passenger0 = "jada ann smith davies";

const capName = (name) => {
  const nameArr = name.split(" ");
  let arrName = [];
  for (const nameEl of nameArr) {
    arrName.push(nameEl[0].toUpperCase() + nameEl.slice(1));
  }
  console.log(arrName.join(" "));
};

capName(passenger0);

// padEnd() and padStart() : Adds a number of caracters until it has a desired length

const message = "Go to gate 23";

console.log(message.padStart(18, "-").padEnd(23, "-")); //first argument the total length || second argument the element we want to add to get to the total desired length

// first argument expects an length

const maskCreditCard = (cardNumber) => {
  const lastNum = cardNumber.slice(-4);
  const masked = lastNum.padStart(cardNumber.length, "*");
  console.log(masked);
};

maskCreditCard("07071993");

// repeat() method : Allows to repeat a sting multiple times :

const message2 = "Bad weather... All departures Delayed... \n";

console.log(message2.repeat(5)); // repeats the string 5 times

const planesInLine = (n) => {
  console.log(`There are ${n} planes waiting in line ${"✈️".repeat(n)}`);
};

planesInLine(3);
planesInLine(4);
planesInLine(5);

// Bankist app :

// let arr = ["a", "b", "c", "d", "e"];

// // New array methods for array :

// // slice(): extract part of an array without modifiying initial array :

// console.log(arr.slice(2)); // returns new arr but don't mutate the original array
// console.log(arr.slice(2, 4)); // we can also define end parameter (end parameter like strings is not incuded)
// console.log(arr.slice(-2)); // will start extracting from the end with negative begin parameter
// console.log(arr.slice(1, -2)); // extract at index 1 and then from the end at -2 is included
// console.log(arr.slice(0, -1)); // extract at index 1 and then from the end at -1 is included

// // can use slice() to create shallow copy :

// console.log(arr.slice()); //it can be more interesting to use slice to create shloow copy's since we can chain method compared to the spread operator

// // SPLICE(): Works like the slice method but the ≠ is that splice mutates the original array (Mutate original array)

// // console.log(arr.splice(2)); // we extracted ['c', 'd', 'e']
// // console.log(arr); // but the original array was mutated and returns ['a', 'b']

// arr.splice(-1); //start extraction from the end like slice
// console.log(arr); // returns ['a', 'b', 'c', 'd'];

// // REVERSE : for reversing an array (Mutate original array)

// arr = ["a", "b", "c", "d"];
// let arr2 = ["a", "b", "c", "d", "e", "f"];

// console.log(arr2.reverse()); // output will be ['f', 'e', 'd', 'c', 'b', 'a'] !! the reverse() method mutates the original array

// console.log(arr2);

// // CONCAT method : !! Don't mutate the existing array

// const letters = arr.concat(arr2);
// console.log(letters); // 'fusion' betwen 2 arrays:

// // Join() mehtod:

// console.log(letters.join("-")); // joins an array with the divider string specified as parameter output : a-b-c-d-f-e-d-c-b-a

// // At() method ;
// // ------------

// const arr1 = [23, 11, 64];

// console.log(arr1[0]); // traditional way to find an element in an array

// console.log(arr1.at(0)); // will give the same output of 23

// // Imagine we want the last element of an array without knowing it length :
// // we would do it like this :

// console.log(arr1[arr1.length - 1]);
// // or
// console.log(arr1.slice(-1)[0]);

// // other way of doing it with at() :

// console.log(arr1.at(-1));

// // Looping with forEach() :

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // Loping with for of loop :

// // for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`${i}: You deposited  ${movement}`);
//   } else console.log(`${i}:  You withdrew ${Math.abs(movement)}`); //math.abs() method removes the - sign
// }

// // with forEach():

// movements.forEach((movement, i, array) => {
//   if (movement > 0) {
//     console.log(`Mouvement number ${i} : You deposited ${movement}`);
//   } else
//     console.log(`Mouvement number ${i} : You withdrew ${Math.abs(movement)}`);
// }); //(forEach needs a callback function) \\ Higher order function -- its the forEach method that    will can the callback function

// // forEach passes in the current element the index and the entire array we are looping :
// // we can specify them with the name we want it doesn't matter but whats matter is the order !

// // first the Element
// // second the index
// // third the entire array

// // main difference between the 2 is that we can not break free from an forEach loop and the continue statement doesn't work too

// // ---------------------------
// // ForEach with maps and sets :
// // ---------------------------

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach((value, key, map) => {
//   console.log(key, value);
// });

// const currenciesSet = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// console.log(currenciesSet);

// currenciesSet.entries().forEach((value, key) => {
//   //set doesn't have keys and no index either
//   console.log(`${key} : ${value[0]}`);
// });
