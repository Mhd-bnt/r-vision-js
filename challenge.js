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
