document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  // //**extra, adding style to the answer button */
  // nextButton.addEventListener("mouseover", () => {
  //   nextButton.style.backgroundColor = "#61c7c9";
  // });

  // nextButton.addEventListener("click", () => {
  //   nextButton.style.backgroundColor = "#61c7c9";
  // });

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  //in the questions.js file you can see questions class
  //constructor(text, choices, answer, difficulty)
  const questions = [
    new Question(
      "What is Samwise Gangi's profession?",
      ["Barkeeper", "Gardener", "Ring Bearer", "Farmer"],
      "Gardener",
      1
    ),
    new Question(
      "What is Gimli's father's name?",
      ["Balin", "Dwalin", "Glóin", "Dori"],
      "Glóin",
      2
    ),
    new Question(
      "Who pushed Bran out of the window?",
      ["Tyrion", "Cersei", "Hodor", "Jaime"],
      "Jaime",
      1
    ),
    new Question(
      "How Many Children does Ned Stark have?",
      ["3", "4", "5", "6"],
      "5",
      2
    ),
    new Question(
      "What do the students call the Gryffindor ghost?",
      ["Bloody Baron", "No Head Nick", "Argus Filch", "Nearly Headless Nick"],
      "Nearly Headless Nick",
      1
    ),
    new Question(
      "Whao was Harry's second Defense Against the Dark Arts teacher?",
      [
        "Quirinus Quirrell",
        "Remus Lupin",
        "Gilderoy Lockhard",
        "Mad Eye Moody",
      ],
      "Gilderoy Lockhard",
      3
    ),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  //constructor(questions, timeLimit, timeRemaining)
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  //this will convert dividing by 60 seconds
  // pads the beginning of a string with the specified fill character. The character will be used to meet the overall length specified by the first argument given.
  // it starts in two minutes and counts below
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();

    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerHTML = question.text;

    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    // progressBar.style.width = `65%`; // This value is hardcoded as a placeholder
    const progressPercentage =
      //we take the currrent index number and divide by the total length
      //example (1/4)*100 = 20%
      (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    //now we edit the style of the progressBar variable which is const progressBar = document.querySelector("#progressBar");
    progressBar.style.width = `${progressPercentage}%`;

    // 3. Update the question count text
    // Update the question count (div#questionCount) show the current question out of total questions

    //currentQuestionIndex comes from Quiz file and we pushed the count there
    //starts in 0 and we we use moveToNextQuestion() then increases
    const questionCountText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;
    //index 0 but question 1
    questionCount.innerText = questionCountText;

    // questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder

    //DOESNT WORK
    // function questionsCount() {
    //   for (let i = 0; this.questions.length - 1; i++) {
    //     const j = this.question[i];
    //   }
    //   return (questionCount.innerText = `${j} / ${questions.length} `);
    // }
    // questionsCount();
    // //already have the parent defined above
    // //const questionCount = document.querySelector("#questionCount");
    // questionCount.appendChild(questionsCount());

    // shuffleChoices() {
    //   for (let i = this.choices.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
    //     [this.choices[i], this.choices[j]] = [this.choices[j], this.choices[i]]; // Swap elements at i and j
    //   }
    // }

    // 4. Create and display new radio input element with a label for each choice.
    // Loop through the current question `choices`.
    // For each choice create a new radio input with a label, and append it to the choice container.
    // Each choice should be displayed as a radio input element with a label:
    /* 
          <input type="radio" name="choice" value="CHOICE TEXT HERE">
          <label>CHOICE TEXT HERE</label>
        <br>
      */

    // WE WILL NOW DISPLAY THE CIRCLES RADIO INPUT FOR PEOPLE TO PICK THEIR ALTERNATIVE
    //similar as simply creating on html but doing directly on JS
    //  notice we are still inside of function showQuestion ()
    question.choices.forEach((choice) => {
      // Hint 1: You can use the `document.createElement()` method to create a new element.
      const radio = document.createElement("input");
      // Hint 2: You can use the `element.type`, `element.name`, and `element.value` properties to set the type, name, and value of an element.
      radio.type = "radio";
      radio.name = "choice";
      radio.value = choice;
      // Hint 3: You can use the `element.appendChild()` method to append an element to the choices container.
      //the choicesContainer was previously defined with query selector : const choiceContainer = document.querySelector("#choices");
      choiceContainer.appendChild(radio);

      // Hint 4: You can use the `element.innerText` property to set the inner text of an element.
      const radiolabel = document.createElement("label");
      //meaning we will take the variable "choice" and use it as the text from the radio label
      radiolabel.innerText = choice;
      choiceContainer.appendChild(radiolabel);

      //after the last alternative radio we add a <br> line
      const br = document.createElement("br");
      choiceContainer.appendChild(br);
    });
  }

  //this is for the button called "answer"
  function nextButtonHandler() {
    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.
    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    let selectedAnswer; // A variable to store the selected answer value
    const choices = document.querySelectorAll("input[name=choice]");

    //this checkes if one of the radio input was selected, then property choice = true
    choices.forEach((choice) => {
      if (choice.checked) {
        selectedAnswer = choice.value;
      }
    });
    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.

    //once user picks one choice then
    if (selectedAnswer) {
      //check if it is the same as correct answer
      quiz.checkAnswer(selectedAnswer);
      //move to next question index
      quiz.moveToNextQuestion();
      //call the showQuestion method initating all again with new question
      showQuestion();
    }
  }

  function showResults() {
    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  // resetButtonHandler()
  const resetButton = document.querySelector("#restartButton");
  // console.log(resetButton);
  resetButton.addEventListener("click", () => {
    endView.style.display = "none";
    quizView.style.display = "block";
    //once reseted go back to index 0
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();
    //go back to display a question
    showQuestion();
  });
});
