"use strict";

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// ---------------------
// Coding Challenge #2
// ---------------------
// Let's continue with our football betting app! Keep using the 'game' variable from before.

// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
const scorer = Object.values(game.scored);
console.log(scorer);

for (const [goal, player] of scorer.entries()) {
  console.log(`Goal ${goal + 1} : ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
const oddsArr = Object.values(game.odds);
let avgOdds = 0;
for (const odd of oddsArr) {
  avgOdds += odd / oddsArr.length;
}
console.log(avgOdds);
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
//    Odd of victory Bayern Munich: 1.33
//    Odd of draw: 3.25
//    Odd of victory Borrussia Dortmund: 6.5
//    Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names😉
const odd = Object.entries(game.odds);
console.log(odd);
for (const [team, chance] of odd) {
  console.log(
    `Odd of ${((game?.[team] && `victory`) || game?.[team]) ?? `draw`} ${
      game?.[team] ?? ``
    } : ${chance}`
  );
}

// 4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//      {
//        Gnarby: 1,
//        Hummels: 1,
//        Lewandowski: 2
//      }
// GOOD LUCK😀

// -------------
console.log("--------Challenge #4 --------");
// Challenge 4 :
// -------------
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):

// Create element :
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

// Element variable :
const textarea = document.querySelector("textarea");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  let trimmedArr = [];
  const str = textarea.value;

  const strNormalized = str.toLowerCase();
  const strArr = strNormalized.split("\n");
  for (const words of strArr) {
    let [first, second] = words.split("_");

    trimmedArr.push(
      first.trim() + second.replace(second[0], second[0].toUpperCase())
    );
  }
  for (const [i, word] of trimmedArr.entries()) {
    console.log(`${word.padEnd(25, " ")}${"✅".repeat(i + 1)}`);
  }
});

// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// Should produce this output (5 separate console.log outputs):
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// Hints:
// § Remember which character defines a new line in the textarea 😉
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working 😉
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!

// Afterwards, test with your own test data!

// GOOD LUCK 😀

// CHALLENGE #2

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each). For
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.

// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ✅
// ('dogsJulia' and 'dogsKate'), and does the following things:✅

// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function✅
// parameters)

// 2. Create an array with both Julia's (corrected) and Kate's data✅

// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")

// 4. Run the function for both test datasets

// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 😉

// GOOD LUCK 😀

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopie = dogsJulia.slice(1, -2);

  const dogsJuliaKate = dogsJuliaCopie.concat(dogsKate);

  //A dog >= least 3 years old,  puppy if < 3 years old.
  dogsJuliaKate.forEach((age, key) => {
    if (age >= 3) {
      console.log(`Dog number ${key + 1} is an adult and is ${age} years old`);
    } else console.log(`Dog number ${key + 1} is still a puppy 🐶`);
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// ("Dog number 1 is an adult, and is 5 years old")

// or

//  ("Dog number 2 is still a puppy 🐶")
