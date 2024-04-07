//instructions here:
//https://my.ironhack.com/cohorts/64f9d69f3689ad002ac79d79/lms/courses/course-v1:IRONHACK+WDFT+202403_BER/modules/ironhack-course-chapter_3/units/ironhack-course-chapter_3-sequential-vertical_7

class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  //it is common for the whole game to have questions, time limit and time remaining
  //we will create instances of those
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions; //this will contain questions object {}
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
  }

  //should have a 'correctAnswers' property initially set to 0
  correctAnswers = 0; //its not a variable, no need for let
  //should have a 'currentQuestionIndex' property initially set to 0
  currentQuestionIndex = 0;

  // 2. getQuestion()
  //should be a function and should shuffle items in questions array
  //this will have an index collecting a question from the questions array
  //and display this question[i] to user
  getQuestion() {
    return this.questions[this.currentQuestionIndex]; //return the question that is currently in the index
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++; //increment the index to move to next question
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ]; // Swap elements at i and j
    }
  }

  //how we did in the question.js file
  //   shuffleChoices() {
  //     for (let i = this.choices.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
  //       [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // Swap elements at i and j
  //     }

  // //shuffle solution provided with "temporary" item
  // shuffleQuestions() {
  //   if (!this.questions.length) {
  //     return undefined;
  //   }
  //   for (let i = 0; i < this.questions.length; i++) {
  //     const randomIndex = Math.floor(Math.random() * (i + 1));

  //     const temp = this.questions[i];
  //     this.questions[i] = this.questions[randomIndex];
  //     this.questions[randomIndex] = temp;
  //   }
  // }

  // 5. checkAnswer(answer)
  //user has made a selection and we will verify if true
  checkAnswer(answer) {
    if (answer === this.getQuestion().answer) {
      this.correctAnswers++;
    }
  }

  //** remember this is how a question is built */
  //   constructor(text, choices, answer, difficulty) {
  //     this.text = text;
  //     this.choices = choices;
  //     this.answer = answer;
  //     // The difficulty will be a number between 1 and 3, with 1 being the easiest and 3 being the hardest.
  //     this.difficulty = difficulty;
  //     //1 + Math.floor(3 * Math.random());
  //   }

  // 6. hasEnded()
  hasEnded() {
    // should return false when currentQuestionIndex is less than the questions array length
    //meaning there are still questions to display, game is not over
    if (this.currentQuestionIndex < this.questions.length) return false;
    // should return true when currentQuestionIndex is equal to the questions array length
    //there are no more questions in the questions array, game is over
    if (this.currentQuestionIndex === this.questions.length) return true;
  }

  //day 02 iteractions
  // filterquestions by difficulty

  // should receive 1 argument (difficulty)
  // should update the 'questions' array with the questions filtered by difficulty
  // should not change the 'questions' array if the 1st argument is not a number between 1 and 3

  filterQuestionsByDifficulty(difficulty) {
    if (difficulty > 1 && difficulty <= 3 && typeof difficulty === "number") {
      //for each question inside of the questions array
      //filter those which difficulty equals to the difficulty selected
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }

  //averageDifficulty
  //use the reduce() method to sum the difficulty of all the questions
  // and then divide the sum by the number of questions to get the average difficulty.
  averageDifficulty() {
    const totalDifficulties = this.questions.reduce((acc, curr) => {
      return acc + curr.difficulty;
    }, 0);
    const averageDifficulty = totalDifficulties / this.questions.length;
    return averageDifficulty;
  }
}
