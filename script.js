"use strict";
// const flights =
//   "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";
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

};

//  Looping Arrays: The for-of Loop
// ---------------------------------

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);
// the variable that we declare is always the currernt element in each iteration in this case the item variable
// Whats interesting in the for of loop is that we still have acces to the continue and break key word

// what if we want the current index like in a regular for loop (i)? We can get both just like this :
for (const [index, item] of menu.entries()) {
  console.log(`${index + 1} : ${item}`);
}

// menu.entries() will return an Array like this [0, 'Focaccia'], after that we use destructuring to store the index number and the menu name into two seperate variable, in this case we used the variable name inex and item

// ------------------------
// Enhanced Object Literals
// ------------------------

// The restaurant object that we have above is an object literal we can see that because we wrote 'literally' the object in our code using the curly braces syntax .

// since ES6 we have 3 ways which makes it easier to write object literals :

// const openingHours = {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// so we want to have the openingHours object inside th restaurant object
// before ES6 we would do it by writing inside the resaurant object openingHours:openingHours
// Tthe main issue with this way of doing is that the proprety name is the same as the variable name

// So with ES6 enhanced object literal we do it like this :

// const object = {
//   openingHours,
// };
// console.log(object);

// and with this javaScript will create a proprety with the name openingHours and put all the values inside of it

// the second enhancemand concern method, since ES6 we no longer need to put a proprety name and then set it to a function expression

// we can just do it like this :

const object = {
  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

// The third enhancemand is that we can compute proprety name instead of writting them manually and literally (compute means calculate )

// let's say that we have an array with all the week days :

// ----------------------
// Optional Chaining (?.)
// ----------------------

// Let's say we want to get the opening hours of our restaurant object for monday :

// console.log(restaurant.openingHours.mon.open); // outpu will be undefined because proprety mon doesn't exist and if we add .open we will get an error because undefined.open don't exist, so if we want to avoid this error we need to do it like this :

if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// with optional chaingin if a certain proprety does not exist than undefined is returned immediatly and so that then would avoid us that kind of error

// With optional chaining :
// ------------------------
console.log(restaurant.openingHours.mon?.open); // So only if the proprety that is before the question mark ? exist than the following proprety will be read. In this example we verify if the .mon proprety exist and only if it exist the .open proprety will be read, but if mon doesn't exist undefined will be immediatly be returned, and here exist means in a nulish concept so a proprety exist if it is not null or undefined so if it is 0 or empty string it will still be returned

// And of course we can have multiple optional chaining if we want :

console.log(restaurant.openingHours?.mon?.open);
// So here we are testing for .openingHours to see if this proprety exists

// So now let's see a more real world example of optional chaining:
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

// What we want to do here is to loop through the days array and log to the console whatever the restaurant is open or not

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "closed"; // 1*
  console.log(`On ${day}, we open at ${open}`);
}

// 1* we can not do this:  restaurant.openingHours.day -> because that is not an actual proprety name of the restaurant object so if we want to use a variable name like day here as proprety name we need to use the bracket notation

// Optional chaining on methods :
// -----------------------------

// Verify a method to see if it exists
console.log(restaurant.order?.(0, 1) ?? "Method does not exist"); // here we verify if the order method in the restaurant object exist before calling it, and we add the nullish coalascing operator in case the method does not exist

console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist"); // Trying again with a method that doesn't exist to see the result

// Quick explanation again : The optional chaingin here verify if restaurant.order exists in the first case it exists so it will be printed in the console

// Second example the optional chaining verify if restaurant.orderRisotto exists, if it doesn't exist undefined will immediatly be returned and with the nullish coalascing operator (??) if undefined or null are returned the second part of the code will be printed to the console, in this case 'Method does not exist'

// Optional chaining on arrays :
// ----------------------------

// Basically its there to check if an array is empty

const users = [{ name: "jonas", email: "hello@jonas.io" }];

console.log(users[0]?.name ?? "User array empty"); //2*

//2* what we trying to find out here is to verify if there is somthing at index 0 in the users array, if we have somthing only than take the name proprety, in addition to that if there is nothing at index 0 optional chaining returns 'undefined' what will then triggers the nullish coalescing operator and print to the console 'User array empty'

// Example without optional chaining :
// -----------------------------------

if (users.length > 0) console.log(users[0].name);
else console.log("User array empty");

// So get used to the optional chaining operator which almost always is used together with the nullish coalescing operator so that we can do somthing in case we don't get a result from the object or the array we are working with

// 118. Looping Objects: Object Keys, Values, and Entries
// ------------------------------------------------------

// So we can also loop through objects even if there are not iterables but in an inderect way
// So we have different option here, depending on what we want to loop over, do we want to loop over the proprety names ? loop over the values ? or both together ?

// Looping over proprety names :
// ----------------------------
// for (const day of Object.keys(openingHours)) {
//   console.log(day);
// }

// so first we need to put all our proprety names from our openingHours object in an array using Object.keys() method, once that is done we store our array into a variable, here the variable properties stores an array with all the keys
const properties = Object.keys(openingHours);
console.log(properties); // So basically what the Object.keys bascally does is to put all proprety names in an array so in that way we can loop though it

let openStr = `We are open on ${properties.length} days :`;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

// Looping over proprety Values :
// -----------------------------

const values = Object.values(openingHours);
console.log(values);

// So now if we really want to simulate looping over the entire object we actually need the entries and entries is (Name + Values) together

// We already di that before with array but with object its a little bit different because we don't call the method on the object like we did with the array
// Example :

// for arrays
// ----------
// menu.entries();

// for objects
// -----------

const entries = Object.entries(openingHours);

// and with that we will get an array with proprety name and values
console.log(entries);

// output of object.entries(openingHours) will be one big array with 3 arrays inside containing proprety name and value :
[
  ["thu", { open: 12, close: 22 }],
  ["fri", { open: 11, close: 23 }],
  ["sat", { open: 0, close: 24 }],
];

// So now with this we can loop over the entire object

for (const x of entries) {
  console.log(x);
}

// Now we want to print somthing like this
// `On ${key} we open at ${open} and close at ${close}`;

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
// ----
// Sets
// ----

// A set is basically a collection of unique values, so that means that a set never can never have any duplicates

const ordersSet = new Set(["pasta", "pizza", "pizza", "risotto", "pasta"]); //between the parenthesis we need to pass in an iterable and the most frequant one is an array

console.log(ordersSet); // in the output we will get 3 elements without any duplicates

// The biggest difference between sets and arrays are that in a set the position of the elements inside a set is irrelevant

// Strings are also iterables so that means that we can do this  :

console.log(new Set("Mehdi"));

// Different Set method :
// ----------------------
// .size :
console.log(ordersSet.size); // Show the number of elements inside the set

// .has() :
console.log(ordersSet.has("pizza")); // Checks if the given element is inside the set and returns a boolean (true // False)
console.log(ordersSet.has("bread"));

//.add()
console.log(ordersSet.add("Garlic bread")); // Adds a new element to the set

//.delete();
console.log(ordersSet.delete("risotto")); // Deletes an element in the set
console.log(ordersSet);

//.clear()
// console.log(ordersSet.clear()); // Deletes every element inside the set

// !!! We can not take elements out from a set because in sets we don't have any key like in objects or index like arrays !!!

// Sets are also iterable that means is that we can loop over them !

for (const order of ordersSet) console.log(order);

// Big use case in real world for Sets, in a normal code base the main use case for sets is actually to remove duplicates values in arrays
// Example :
const staff = ["Waiter", "Chef", "Manager", "Waiter", "Waiter", "Chef"];

// So now let's say that the only thing we want is to know how many different position we have in our staff
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// Other way around  if i juste need to know the number of different position in the staff is to do it like this :
console.log(
  new Set(["Waiter", "Chef", "Manager", "Waiter", "Waiter", "Chef"]).size
);

// And the same can be done with strings since their are iterables :

console.log(new Set("Mehdi").size);

// -----------------------------------
// New Methods Make Sets Useful!
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

// Let's say we have an app with the mexican and italian food inside and we want to know which ingrediant are the same in both cuisin :

// Intersectioin()
// ---------------
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log("Intersection:", commonFoods);
console.log([...commonFoods]); //If we want it to be an array
// Take one set and compare it to another set to see which element are in common, the result will be a new set with the elements that are in common to both sets

// Union() :
// --------
const italianMexicanFusion = italianFoods.union(mexicanFoods); //Will gives all element of both sets together but without the duplicates

console.log(italianMexicanFusion); // Set with all element of both sets together
console.log([...italianMexicanFusion]); //spreading the set to get an array with all individual elements together

//Difference()
// ----------

// This method will give us a new set which will contain all elements that are present in the first set but not ine the second set

const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);

console.log(uniqueItalianFoods); // Output will be a set containing all elements that are only present in itlalianFood set
console.log(uniqueMexicanFoods); // Output will be a set containing all elements that are only present in Mexican set

const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods); // This method will give us the elements that are not present in both sets so in this example the unique elements from mexicanFood and the unique elements from italianFood

console.log(uniqueItalianAndMexicanFoods);

// .isDisjointFrom
console.log(italianFoods.isDisjointFrom(mexicanFoods)); //returns a boolean wathever the sets are TOTALLY different -> output will be true but if one or more elements are in common false will be returned

// ------------------
// Maps: Fundamentals
// ------------------

// Maps are a data structure that we use to map values to keys just like object data is stored in key value pairs, the big difference between objects and maps is that in maps can have any type it can even be arrays or objcets or other maps

const rest = new Map(); // the easiest way to create a map is to create an empty map just like this, and then we can use the set method to fill it up

rest.set("name", "classico italiano"); // first we put the key name
rest.set(1, "firenze , Italy");
rest.set(2, "Lisbon, Portugal");

// And calling the set method like we are doing here does not only update the map thats called on but it also returns the map
// So that means that we also can chain the .set() Method just like this :

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "we are open")
  .set(false, "we are closed");

// so calling the set() Method returns updates the map !

// .get() Method
// ---------------
// To read the data inside a map we use the get() method and put the key name as a parameter :

console.log(rest.get("name"));
console.log(rest.get(true)); // important to notice that the data type of the key matters we can not put 'true' the string we will get an undefined

const time = 8;

console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// .has() Method
// -------------
// Method verify if a map contains a certain key

console.log(rest.has("categories")); // output will be a boolean ( True or False)

// .delete() Method
// ----------------
// Method to delete a certain element in the map based on the key

console.log(rest.delete(2)); // here we deleted the second locattion we had the lisbon, portugal one
console.log(rest);

// .size Proprety
// ----------------

// Maps also have the size method and give us the total numbers of elements (size proprety is 0 based)
console.log(rest.size); //output will be 7

// .clear() Method
// ---------------

// rest.clear(); Delete all elements inside the map
console.log(rest);

// Arrays and Objects as Map keys
// ------------------------------
const arrKey = [1, 2];
rest.set([1, 2], "Test");
console.log(rest.get([1, 2])); // will not work because in objects like arrays it's not the value that's used as the key but the reference in the memory heap

// How do we get the data from the map based on the key array ? So here we need to be carefull because the array key used in the map is a reference in the memory heap
// if we try to find it by passing [1,2] javascript consider this array a reference to another point in the memory heap, so we first need to store the array we want to use in a variable this variable will than hold the reference and than we can use this variable as key in our map

// Example
rest.set(arrKey, "Test");
console.log(rest.get(arrKey));

// We can also use DOM elements as key since their are nothing more than objects
// Example :

rest.set(document.querySelector("h1"), "heading");
console.log(rest);

// Maps: Iteration
// ---------------

const question = new Map([
  ["question", "What is the best programming language"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["Correct", 3],
  [true, "Correct !"],
  [false, "Try again !"],
]);

// Convert Objects to maps :
// -------------------------
// this map structure looks similar to Object.entries() and what that means is that there is an easy way to convert objects to maps !

const hoursMap = new Map(Object.entries(openingHours)); // thats how we transform an object into a map !
console.log(hoursMap);

// Iteration on map is possible since maps are iterables so the for loop is avaible for them

console.log(question.get("question"));
for (const [key, value] of question) {
  typeof key === "number" ? console.log(`Answer ${key}: ${value}`) : "";
}

// So the differenece with objects here is that we don't need objects.entries() thats because map are iterables but not objects, for objects we need first to put all the data into an array to loop over them

// get input from user:

// const answer = Number(prompt("Your answer"));

// console.log(question.get(answer === question.get("Correct")));

// Convert map to an array :
// -------------------------
// since maps are iterables we can use the power of the spread operator to unpack our map in an array just like here :
const questionArray = [...question];
console.log(questionArray);

// And we also have acces to some method like .entries() , .key() and .value():

console.log(question.entries());
console.log([...question.keys()]); // we get an array with all the keys
console.log([...question.values()]); // we get an array with all the values

// ---------------------------------------
// Summary: Which Data Structure to Use? :
// ---------------------------------------

// First where does the data come from ? :
// ---------------------------------------
// 1) From the program itself : Data written directly in source code
// 2)From the UI : Data input from the user or data written in DOM (EX: Tasks in todo app or a form)
// 3) From external sources: Data fetched for example from web API(E.G recipe objects)
// What is a web API ? Application Programming Interface : We can use web API's to get data from other web application, for example we can use web api to get the current weather, or data about movies etc

// So no matter where the data comes from what kind of data it is, we always have collection of data that we then store somwhere. And we store them in data structure.

// Do we just need a simple list of values ? :
// ------------------------------------------

// Than we gonna use Arrays or sets

// Do we need key/value pairs ?
// ----------------------------
// Then we gonna use an object or a map
// The big difference here is that we can use a key to describe the value by using the key

// Data that comes from a web api uses a special formating called JSON and JSON files uses objects to describe values and it also uses arrays

// When do we use them ?
// ---------------------

// PDF theory-lectures-v2.3.pdf Page 131

// -------------------------------
// Working With Strings - Part 1 :
// -------------------------------

const airlines = "TAP air Portugal";
const plane = "A320";

// we can just like arrays get the position of a letter :
// -----------------------------------------------------
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]); // Can also do it directly on the string

// We can also get the length of the string :
console.log(airlines.length);
console.log("B373".length); //Can also do it directly on the string

// String Methods :
// ----------------

// indexOf(); Give us the index of the number we passed as parameter
// ---------

console.log(airlines.indexOf("r")); //(Index is 0 based so first index starts at 0 and empty space is also couting)

console.log(airlines.indexOf("Portugal")); // We can also search for entire words the outpu will be where the words starts, in this case at index 8

// lastIndexOf():  give us the last occurence for a giving letter
// -------------

console.log(airlines.lastIndexOf("r")); // Will give us the index of the last index for a giving letter in this case "r"

// What can we do by knowing the indexes ? why are their usefull ?
// ----------------------------------------------------------------

// One use case is to extract parts of a string using the .slice() method, and the slice method needs indexes as arguments to work

// .slice() With begin parameter:
// -----------------------------

console.log(airlines.slice(4)); // the first value we put is the begin parameter so we start at index 4 so the extraction will start at index 4

// !! These methods do not mutate the original string !! Strings are primitives values son we can not mutate them, if we want to use the newly created string we need to store it in a variable or data structure !!

// .slice() With end parameter:
// -----------------------------

console.log(airlines.slice(4, 7)); // The end parameter stops extracting before reaching the specified index // Side note the length of the extracted string will always be end - beginning so in this case 3

// Extracting without knowing the indexe's:
// ---------------------------------------

console.log(airlines.slice(0, airlines.indexOf(" "))); // start at 0 and going to the first space so basically we extract the first word !

console.log(airlines.slice(airlines.lastIndexOf(" ") + 1)); // we don't need to specify the end parameter because it will extract until the end ! (We added the +1 to avoid taking the with space with the extraction )

// slice() with negatif begin parameter :
// --------------------------------------
console.log(airlines.slice(-2)); // With negatif values it will start extracting from the end

// slice() with negatif end parameter :
// --------------------------------------
console.log(airlines.slice(1, -1)); //start at index one and extracts until negatif 1 from the end

// Pratical Exercices for string Methods :
// --------------------------------------
// Create a function to verify if my seat is a middle seat ! Knowing that B and E are middle seats in airplanes

const checkMiddleSeat = (seat) => {
  seat.slice(-1) === "E" || seat.slice(-1) === "B"
    ? console.log("You got the middle seat ! :s")
    : console.log("You got lucky ! :D");
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");
// Theory: Strings are primitives so why do they have methods ? Shouldn't methods not only be avaible for objects ?
// So whenever we call a method on a string, javascript will automatically behind the scenes convert that string primitive to a string object
// by keeping the content and then it's on that object that we call the method and this process is called boxing because it takes our string and puts it in an object !

// This happens behing the scenes :
const str = "Mehdi"; // JavaScript call this function to put our string in an object and this is called boxing !
console.log(new String(str)); //

// -----------------------------
// Working With Strings - Part 2
// -----------------------------

// toLowerCase():
// --------------
console.log(airlines.toLowerCase()); // all the string goes to lower case
console.log("Mehdi".toLocaleLowerCase()); // We can call this method also directly on a string if we want

// toUpperCase():
// --------------
console.log(airlines.toUpperCase()); // all the string goes to upper case
console.log("Mehdi".toUpperCase()); // We can call this method also directly on a string if we want

// Pratical use case for this methods :
// ------------------------------------

// Fix capitalization in passanger name :
const passanger = "MeHDi"; // we need it to be more like this => 'Mehdi'

// So what we usually do is to pu everything in to lower case :

const passangerLower = passanger.toLowerCase();
const passangerCorrect =
  passangerLower[0].toUpperCase() + passangerLower.slice(1);

console.log(passangerCorrect);

// Practice exercies : Create a function to correct capitalization :
const correctName = (name) => {
  const nameLower = name.toLowerCase();
  const correctName = nameLower[0].toUpperCase() + nameLower.slice(1);
  console.log(correctName);
};

correctName("BenTOUrA");

// Comparing for email inputs :
// ---------------------------

const email = "hello@mehdi.io";
const loginEmail = "  Hello@Mehdi.Io \n"; //User input is kind of valid but we need to correct it to be exactly the same as email variable ( \n means enter (newline))

// first putting everything into lower case :

// const lowerEmail = loginEmail.toLowerCase();

// trim() : removes all white space and also enters (\n)
// ------------------------------------------------------

// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);

// but we can do it even faster :

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// Ex create a function to format an email and then compare it to the real email to see if it works   :
// --------------------------------------------------------------------------------------------------

const formatEmail = (email, trueEmail) => {
  const normalEmail = email.toLowerCase().trim();
  console.log(normalEmail === trueEmail);
};

formatEmail("  HeLlo@MEHdi.io  \n", email);

// .replace() :
// ------------

// We want to change the £ with $ and the , with the . for the US
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", "."); // first parameter the string we want to replace and the second the string that will replace the first parameter specified

console.log(priceUS);

// We can also replace entire strings !
// ----------------------------------

const annoucement =
  "All passengers come to boarding door 23. Boarding door 23!"; // we want to replace door by gate !

console.log(annoucement.replace("door", "gate")); // here only the first occurence is changed, and thats how the .replace() method works
// if we want all the occurences to be replaced we need to use the .replaceAll() method

// .replaceAll();
// --------------
// console.log(annoucement.replaceAll("door", "gate"));

// replace() is a new mehtod that was not avaible BeforeUnloadEvent, so before we used what we call regular expression

// Regular expression :
// --------------------
// .replace(/string/g,'gate'):

console.log(annoucement.replace(/door/g, "gate")); // using g flag, here g means global so we are telling javascript to target all the occurences for the givin word in ths example for door

// Methods that returns booleans :
// -------------------------------
const plane1 = "Airbus A320neo";
// .includes()
// -----------
console.log(plane1.includes("A320")); // includes() verify if somwhere in the string we will find the specified letters
console.log(plane1.includes("Boeing"));

// .startWith()
// ------------
console.log(plane1.startsWith("Air")); // Startswith() doesn't need to match the entire word the first letters we used will return true
// .endsWith()
// -----------

// Small exercices verifying if the plane1 is part of the neew airbus familly  :

if (plane1.startsWith("Airbus") && plane1.endsWith("neo")) {
  console.log("Part of the new airbus familly");
}

// Practice exercices  :
// We want to check if the bagage of a certain passanger is allowed to be checked-in (allowed to be in the plane):

const checkBaggage = (items) => {
  const baggage = items.toLowerCase();
  console.log(
    baggage.includes("knife") || baggage.includes("gun")
      ? "You are not allowed to check-in !"
      : "You are allowed to check-in :D"
  );
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

// -----------------------------
// Working With Strings - Part 3
// -----------------------------

// .split() Method : Allows us to split a string into multiple parts based on a divider string and stores the result in an array
// ---------------

console.log("a+very+nice+string".split("+")); // Divider string here is the + signe output will be : ['a', 'very', 'nice', 'string']
console.log("Mehdi Bentoura".split(" ")); // divider string here is the space output will be : ['Mehdi', 'Bentoura']

const [firstName, lastName] = "Mehdi Bentoura".split(" "); // And we can also use the power of destructuring to store the result into variables

console.log(firstName);
console.log(lastName);

// Small Exercices :

// Let's say we want to make the lastName uppercase and we also want to add a mister in the beginning

// .join() Method : Opposite of split method
// ----------------

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" "); //In the join method we can also specify a devider string

console.log(newName); // output will be : Mr. Mehdi BENTOURA

// Small Exercices : We want the first letter of each name too be uppercase :
// -------------------------------------------------------------------------

const capitalizeName = (name) => {
  const names = name.split(" ");
  const nameCorrect = [];

  for (const n of names) {
    // nameCorrect.push(n[0].toUpperCase() + n.slice(1));
    // other way of doing it
    nameCorrect.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(nameCorrect.join(" "));
};

capitalizeName("jessica ann smith davis");

capitalizeName("Izzoulah mehdi bentoura");

// .padStart() :
// -------------
const message = "Go to gate 23!";

console.log(message.padStart(25, "+")); // will add the specified caracteres at the beginning of the string // first parameter is the total length of the string, second parameter is the caractere we want to add

// .padEnd() :
// ------------

console.log(message.padStart(25, "+").padEnd(35, "+"));

// Real world example :
// --------------------
// Hiding credit card numbers :

const maskCreditCard = (number) => {
  const numberStr = String(number);
  const maskedCredit = numberStr.slice(-4).padStart(numberStr.length, "*");
  console.log(maskedCredit);
};

maskCreditCard(23545645489482214);

// .repeat() Method : Allows to repeat the same string multiple time
// ----------------

const message2 = "Bad weather ... All Departures Delayed...";

console.log(message2.repeat(3)); // Output will be 3 times message2

const planesInLines = (n) => {
  console.log(`There are ${n} planes in line ${"🛩️".repeat(n)}`);
};

planesInLines(5);
planesInLines(3);
planesInLines(12);

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.includes("Delayed") ? "🔴" : ""}${type.replaceAll(
    "_",
    " "
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ":",
    "h"
  )})`.padStart(50); //by default the padding is done with an empty space
  console.log(output);
}

// 134. How Passing Arguments Works: Value vs. Reference
// -------------------------------------------------------
