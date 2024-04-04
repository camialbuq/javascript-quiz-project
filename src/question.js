//task for day 01 - 03.04.24
// implement a class Question with the properties and methods listed in the sections below.

/*
should receive 4 arguments in the constructor (text, choices, answer, difficulty).
should have 4 properties: text, choices, answer, difficulty.
should receive text (string) as its 1st argument and assign it to text property.
should receive choices (array of strings) as its 2nd argument and assign it to choices property.
should receive answer (string) as its 3rd argument and assign it to answer property.
should receive difficulty (number) as its 3rd argument and assign it to difficulty property.

Note: The difficulty will be a number between 1 and 3, with 1 being the easiest and 3 being the hardest.
*/

// YOUR CODE HERE:
//
class Question {
  // 1. constructor (text, choices, answer, difficulty)
  constructor(text, choices, answer, difficulty) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    // The difficulty will be a number between 1 and 3, with 1 being the easiest and 3 being the hardest.
    this.difficulty = difficulty;
    //1 + Math.floor(3 * Math.random());
  }
  // 2. shuffleChoices()
  shuffleChoices() {
    for (let i = this.choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
      [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // Swap elements at i and j
    }
  }
}

// //shuffle example from dev.to
// //https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math

// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const shuffledArray = array.sort((a, b) => 0.5 - Math.random());

// //Fisher Yates algorithm

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
//       [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
//     }
//     return array;
//   }

//   // Test the function
//   const originalArray = [1, 2, 3, 4, 5];
//   console.log(shuffleArray(originalArray));

// //shuffle example from stackoverflow

// /* Randomize array in-place using Durstenfeld shuffle algorithm */

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }

// //example from freecodecamp using the Array.map() Function

// const shuffle = (array) => {
//     return array.map((a) => ({ sort: Math.random(), value: a }))
//         .sort((a, b) => a.sort - b.sort)
//         .map((a) => a.value);
// };

// // Usage
// // const myArray = ["apple", "banana", "cherry", "date","elderberry"];
// // const shuffledArray = shuffle(myArray);
// // console.log(shuffledArray);
