//For Question
// Generating Question Object
class Question {
    constructor(question,choices) {
        this._question = question;
        this._choices = choices
    }
}

// Class Instance
const QUIZ1 = []
const question1 = new Question('What is the capital of France?1', ['Paris1', 'Berlin', 'London', 'Madrid']);
const question2 = new Question('What is the of France?1', ['Pas1', 'Bein', 'Loon', 'Maid']);
QUIZ1.push(question1, question2)

const QUIZ2 = []
const questionA = new Question('What is the capital of France?2', ['Parisdsds2', 'Berlin', 'London', 'Madrid']);
const questionB = new Question('What is the of France?2', ['Pas2', 'Bein', 'Loon', 'Maid']);
QUIZ2.push(questionA, questionB)

const QUIZ3 = []
const questionC = new Question('What is the capital of France?3', ['Paris3', 'Berlin', 'London', 'Madrid']);
const questionD = new Question('What is the of France?4', ['Pas3', 'Bein', 'Loon', 'Maid']);
QUIZ3.push(questionC, questionD)

// Default values that can be manipulated later 
let scoreIncrement = 1;
let currentScore = 0;
let DefaultTimer = 60

// Getting DOM Elements 
const sucessDiv = document.querySelector('#sucessDiv')
const failureDiv = document.querySelector('#failureDiv')
const questionDiv = document.querySelector('#questionDiv')
const questionUl = document.querySelector('#questionUl');
const infoDiv=document.querySelector('#infoDiv')
const questionName=document.querySelector('#questionName')
const time = document.querySelector('#Time')
const scored = document.querySelector('#Score')
const hint = document.querySelector('#Hint')



// Setting The Deafaults
infoDiv.style.display='none'
time.textContent = `Time Remaining : ${DefaultTimer}`;
scored.textContent = `Score : ${currentScore} point`
hint.textContent=`Hint : ` // update later 



//Score
function score(Element,Quiz) {
    if (Element.textContent === Quiz[index]._choices[0]) {
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
    if (index < Quiz.length) {
        questionUl.innerHTML = '';
        appendToPage(QUIZ2);
    } else {
        // Display the final score when all questions are answered
        if (currentScore === 0 || DefaultTimer === 0) { // doenst work when the timer automatically runs out 
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
// !!! the timer haas a one second lag to start implete something like GO sign to make the it not so obivous 
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (DefaultTimer >= 0) {
            time.textContent = `Time Remaining : ${DefaultTimer}`;
            DefaultTimer--; // Decrement after checking if it's less than or equal to zero
        } else if (DefaultTimer === 0){
            clearInterval(timerInterval);
            scored.textContent = `Quiz Failure! Final Score: ${currentScore}`;
            time.textContent = `Time Remaining : None`;
            hint.textContent = `No Hint Can Help you Now`;
            failure()
        }      
    }, 1000); // Update every 1 second (1000 milliseconds)
}


// Appends the Question to the page
let index = 0 
function appendToPage(Quiz) {
    updateTimer();
    questionUl.innerHTML = ''; // Clear previous answer choices
    questionName.textContent = `Question : ${Quiz[index]._question}`;

    Quiz[index]._choices.forEach(Element => {
        const li = document.createElement('li');
        li.textContent = Element;
        questionUl.appendChild(li);

        // Remove previous event listeners
        li.removeEventListener('click', () => score(li, QUIZ2));

        // Add a new event listener
        li.addEventListener('click', () => score(li, Quiz));

        // add some element that apears for like 1/2 sec until the timer begins 
    });
}


// Failure
function failure() {

    questionDiv.style.display = 'none'
    failureDiv.style.display = 'block'
}

//Sucess 
function sucess(){

    questionDiv.style.display = 'none'
    sucessDiv.style.display = 'block'

}

// Bugs so far
// the timer have a lag

// For Slides


// Get DOM ELEMENTS
    const escButton=document.querySelector('#esc')
    const no =[... document.querySelectorAll(".no")]
//Setting Defaults
    escButton.style.display='none'
//HandleBars
const template = document.querySelector("#slideTemplate").innerHTML;
const compiledTemplate = Handlebars.compile(template);
    const allQuizSlides = {
        allQuiz: [
    {
    QuizOrigin: 'yuh',
    QuizName: 'yay',
    QuizDescription: 'yus',
    QuizImage: "./Images/js.png"
                },

    {
        QuizOrigin: 'abc',
    QuizName: 'def',
    QuizDescription: 'ghi',
    QuizImage: "./Images/html.png"
                },

            {
                QuizOrigin: 'abc',
                QuizName: 'def',
                QuizDescription: 'ghi',
                QuizImage: "./Images/css.jpeg"
            },



    ]
        };


//Function 
function goHome() {
    carouselDiv.style.display = ''
    escButton.style.display = 'none'
    infoDiv.style.display = 'none'
    questionDiv.style.display = 'none'

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
    sucessDiv.style.display = 'none';
    // questionDiv.style.display = '';

    // Reset the quiz questions and timer
    appendToPage();
    updateTimer();
}

escButton.addEventListener('click',()=>{
    goHome()
    // !!! save current data on escape
})



//Keep Render at immediate end
const renderedHTML = compiledTemplate(allQuizSlides);
document.querySelector("#carousel").innerHTML = renderedHTML;

// Keep this code at the end after the handle Bars has rendered 
const carouselDiv=document.querySelector('.carousel')
const carouselCell = [...document.querySelectorAll('.carousel-cell')];
const allQuizes = [QUIZ1, QUIZ2, QUIZ3]; 

carouselCell.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        // Check if the index is within the bounds of the array
        if (index >= 0 && index < allQuizes.length) {
            escButton.style.display = ''
            carouselDiv.style.display='none'
            infoDiv.style.display = ''
            questionDiv.style.display = ''
            
            const clickedQuiz = allQuizes[index];
            appendToPage(clickedQuiz);
        }
    });
});

no.forEach(Element=>{
    Element.addEventListener('click',()=>{
        goHome()
    })
})
// Connect Quiz with slide 
// use this later for when user can create quiz
// allQuizSlides.allQuiz.push({
//     QuizOrigin: 'abc',
//     QuizName: 'def',
//     QuizDescription: 'ghi',
//     QuizImage: "./Images/css.jpeg"
// });