"use strict";
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";
const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

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
  order: function(starterIndex,mainIndex){
    return [this.starterMenu[starterIndex] ,this.mainMenu[mainIndex]]
  }

};

// Array destructuring :  
// -------------------

const arr = [2,3,4];

const [a,b,c] = arr;

console.log(a,b,c)

let [main,,secondary] = restaurant.categories;
console.log(main,secondary);

// switch 2 values with destructuring : 
// -----------------------------------

[secondary,main] = [main,secondary];

console.log(main,secondary);


// Receive 2 values from a function :
// ---------------------------------
const [first,second] = restaurant.order(2,0)

console.log(first,second);

// Taking out values with nested array :
// ------------------------------------

const nested = [2,4,[5,6]];


// const [i,,j] = nested;

// console.log(i,j)


const [i,,[j,k]] = nested;

 console.log(i,j,k) //=> output will be 2 5 6 

//  Default values with destructuring :
// ------------------------------------

const [p = 0,q = 0,r = 0] = [8,9] // imagin we don't know the length off this array and try to take out à value that de not exist

console.log(p,q,r) // output will be 8 9 0 