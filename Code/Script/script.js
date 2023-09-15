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
const QUIZ1=[]
const question1 = new Question('What is the capital of France?', ['Paris', 'Berlin', 'London', 'Madrid']);
const question2 = new Question('What is the of France?', ['Pas', 'Bein', 'Loon', 'Maid']);
QUIZ1.push(question1,question2)

// Default values that can be manipulated later 
let scoreIncrement = 1;
let currentScore = 0;
let DefaultTimer=60

// Getting DOM Elements 
const failureDiv=document.querySelector('#failureDiv')
const questionDiv=document.querySelector('#questionDiv')
const questionUl = document.querySelector('#questionUl');
const time=document.querySelector('#Time')
const scored=document.querySelector('#Score')
const hint=document.querySelector('#Hint')

/* 
Score function:
- Allows the user to move on to the next question.
- Adds or subtracts score.
- Adds or subtracts time when you get something
*/

function score(Element) {
    scored.textContent = `Score : ${currentScore} point`

    Element.addEventListener('click', () => {
        if (Element.textContent === QUIZ1[index]._correct) {
            currentScore += scoreIncrement;
            // Increase the index for the next question
            index++;
            // Check if there are more questions left
            if (index < QUIZ1.length) {
                questionUl.innerHTML = '';
                appendToPage();
            } else {
                // Display the final score when all questions are answered
                scored.textContent = `Quiz Completed! Final Score: ${currentScore}`;
            }
        } else {
            if (currentScore === 0) {
                scored.textContent = `Quiz Failure! Final Score: ${currentScore}`;
                clearInterval(timerInterval)
                time.textContent=`Time Remaining : None`
                hint.textContent=`No Hint Can Help you Now`

            } else {
                scored.textContent = `Score : ${currentScore} point`;
                currentScore -= scoreIncrement;
            }
            DefaultTimer -= 10; // Decrease the timer by 10 seconds for a wrong answer
        }
    });
}


// Failure
function failure() {
    questionDiv.innerHTML = ''
    failureDiv.style.display = 'block'
}

// Timer
let timerInterval; // Declare a global variable to store the timer interval

function updateTimer() {

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (DefaultTimer <= 0) {
            clearInterval(timerInterval);
            time.textContent = 'Time is up';
            failure();
        } else {
            time.textContent = `Timer Remaining: ${DefaultTimer}`;
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
        score(li);
        questionUl.appendChild(li);
    });

    updateTimer();
}

appendToPage()