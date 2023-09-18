//For Question
// Generating Question Object
class Question {
    constructor(question, [correct, option1, option2, option3]) {
        this._question = question;
        this._choices = [
            this._correct = correct,
            this._option1 = option1,
            this._option2 = option2,
            this._option3 = option3
        ];
    }
}

// Class Instance
const QUIZ1 = []
const question1 = new Question('What is the capital of France?', ['Paris', 'Berlin', 'London', 'Madrid']);
const question2 = new Question('What is the of France?', ['Pas', 'Bein', 'Loon', 'Maid']);
QUIZ1.push(question1, question2)

const QUIZ2 = []
const questionA = new Question('What is the capital of France?', ['Paris', 'Berlin', 'London', 'Madrid']);
const questionB = new Question('What is the of France?', ['Pas', 'Bein', 'Loon', 'Maid']);
QUIZ2.push(questionA, questionB)


// Default values that can be manipulated later 
let scoreIncrement = 1;
let currentScore = 0;
let DefaultTimer = 60

// Getting DOM Elements 
const sucessDiv = document.querySelector('#sucessDiv')
const failureDiv = document.querySelector('#failureDiv')
const questionDiv = document.querySelector('#questionDiv')
const questionUl = document.querySelector('#questionUl');
const time = document.querySelector('#Time')
const scored = document.querySelector('#Score')
const hint = document.querySelector('#Hint')
const begin=document.querySelector('#begin')
// Setting Text Content Outside of function calls
time.textContent = `Time Remaining : ${DefaultTimer}`;
scored.textContent = `Score : ${currentScore} point`
hint.textContent=`Hint : ` // update later 


/* 
Score function:
- Allows the user to move on to the next question.
- Adds or subtracts score.
- Adds or subtracts time when you get something
*/

function score(Element) {
    begin.style.display='none'
    updateTimer();
    if (Element.textContent === QUIZ1[index]._correct) {
        currentScore += scoreIncrement;
    } else {
        if (currentScore === 0) {
            clearInterval(timerInterval);
            scored.textContent = `Quiz Failure! Final Score: ${currentScore}`;
            time.textContent = `Time Remaining : None`;
            hint.textContent = `No Hint Can Help you Now`;
            failure()
        } else {
            currentScore -= scoreIncrement;
        }
        DefaultTimer -= 10; // Decrease the timer by 10 seconds for a wrong answer
    }

  

    // Update the score text after processing the answer
    scored.textContent = `Score : ${currentScore} point`;

    // Increase the index for the next question
    index++;
    // Check if there are more questions left
    if (index < QUIZ1.length) {
        questionUl.innerHTML = '';
        appendToPage();
    } else {
        // Display the final score when all questions are answered
        if (currentScore === 0) {
            clearInterval(timerInterval);
            scored.textContent = `Quiz Failure! Final Score: ${currentScore}`;
            time.textContent = `Time Remaining : None`;
            hint.textContent = `No Hint Can Help you Now`;
            failure()
        }else{
            clearInterval(timerInterval);
            hint.textContent = `No Need For Hint Champ`;
            scored.textContent = `Quiz Completed! Final Score: ${currentScore}`;
            sucess()
        }

    }
}

// Timer
let timerInterval; // Declare a global variable to store the timer interval

function updateTimer() {
// the timer haas a one second lag to start implete something like GO sign to make the it not so obivous 
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (DefaultTimer >= 0) {
            time.textContent = `Time Remaining : ${DefaultTimer}`;
            DefaultTimer--; // Decrement after checking if it's less than or equal to zero
        } 
    }, 1000); // Update every 1 second (1000 milliseconds)
}


// Appends the Question to the page
let index = 0 //used to next question
function appendToPage() {
    questionUl.innerHTML = ''; // Clear previous answer choices

    QUIZ1[index]._choices.forEach(Element => {
        const li = document.createElement('li');
        li.textContent = Element;
        questionUl.appendChild(li);

        // Remove previous event listeners
        li.removeEventListener('click', score);

        // Add a new event listener
        li.addEventListener('click', () => score(li));
    });


}
appendToPage()

// Failure
function failure() {
    questionDiv.style.display = 'none'
    failureDiv.style.display = 'block'

    const yesButton = document.querySelector('#yes');
    const noButton = document.querySelector('#no');

    yes.addEventListener('click', () => {
        // Reset quiz variables
        currentScore = 0;
        DefaultTimer = 60;
        index = 0;

        // Reset DOM elements
        scored.textContent = `Score : ${currentScore} point`;
        time.textContent = `Time Remaining : ${DefaultTimer}`;
        hint.textContent = `Hint : ` // update later 

        // Hide the failure div and show the question div
        failureDiv.style.display = 'none';
        questionDiv.style.display = '';

        // Reset the quiz questions and timer
        appendToPage();
        updateTimer();
    })

    noButton.addEventListener('click',()=>{
        // add function late
    })
}

//Sucess 
function sucess(){
    questionDiv.style.display = 'none'
    sucessDiv.style.display = 'block'
}

// Bugs so far
// the timer have a lag

// For Slides

//HandleBars
const allQuiz = [QUIZ1, QUIZ2]

// Get a reference to the template script element
const template = document.querySelector("#slideTemplate").innerHTML;

// Compile the Handlebars template
const compiledTemplate = Handlebars.compile(template);

// Define the data for the template
const data = { 
quizOrigin: 'yuh',
QuizName:'yay',
QuizDescription:'yus',
QuizImage: "./Images/js.png",
allQuiz: [QUIZ1, QUIZ2]
};

// Render the template with the data
const renderedHTML = compiledTemplate(data);

// Insert the rendered HTML into the 'content' div
document.querySelector("#carousel").innerHTML = renderedHTML;