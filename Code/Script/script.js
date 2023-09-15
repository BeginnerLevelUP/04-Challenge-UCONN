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
const scoreIncrement = 1;
let currentScore = 0;

// Getting DOM Elements 
const questionUl = document.querySelector('#questionUl');


/* 
Score function:
- Allows the user to move on to the next question.
- Adds or subtracts score.
*/
function score(Element) {
    Element.addEventListener('click', () => {
        if (Element.textContent === QUIZ1[index]._correct) {
            console.log('correctAnswer');
            currentScore += scoreIncrement;
            console.log(currentScore);

            // Increase the index for the next question
            index++;

            // Check if there are more questions left
            if (index < QUIZ1.length) {
                questionUl.innerHTML = '';
                appendToPage();
            } else {
                // Display the final score when all questions are answered
                console.log('Quiz Completed! Final Score: ' + currentScore);
            }
        } else {
            console.log('wrongAnswer');
            currentScore -= scoreIncrement;
            console.log(currentScore);
        }
    });
}
let index=0
// Appends the Question to the page
function appendToPage() {
    QUIZ1[index]._choices.forEach(Element => {
        const li = document.createElement('li');
        li.textContent = Element;
        score(li);
        questionUl.appendChild(li);
    });
}


appendToPage()