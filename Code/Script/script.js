import { shuffleArray } from "./usefullCode.js";
$("#draggable").draggable();

//Creating Variables
const containerEl = document.querySelector('.containerQuiz');
containerEl.style.display = 'none';

const questionEl = document.querySelector('.questionTitle')

const ulEl = document.querySelector('.options');

const infoArt = document.querySelector('.infoArt');

const hintEl = document.querySelector('.hint')
infoArt.appendChild(hintEl);


// create 4 li to represent the options for asking a qeustion 
const liArray = []
for (let i = 0; i < 4; i++) {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liArray.push(liEl)
}

const carouselItems = document.querySelector('.click')
const modal = document.querySelector('#complete')

class Questions {
    constructor(question, correct, one, two, three, hint) {
        this._question = question;
        this._correct = correct
        this._one = one;
        this._two = two;
        this._three = three;
        this._hint = hint

    }

    append() {

        hintEl.textContent = 'Hint';
        hintEl.setAttribute('style', 'text-decoration: underline;');

        const hint = () => {
            hintEl.textContent = `${hintEl.textContent} - ${this._hint}`;
            hintEl.removeAttribute('style');

            // Remove the event listener after it's been clicked once
            hintEl.removeEventListener('click', hint);
        };

        hintEl.addEventListener('click', hint);


        // Adding Content and Appeding to the dom
        questionEl.textContent = this._question; // content for the title of the question



        // content for the list items
        const options = [this._correct, this._one, this._two, this._three];
        shuffleArray(options);
        for (let i = 0; i < options.length; i++) {
            ulEl.children[i].textContent = options[i]; // Set option content  
        }



        // condiitonal to make hint appear 
        // if longer than a certain amount of time or if you click on 2 wrong answers

        containerEl.appendChild(questionEl);
        containerEl.appendChild(ulEl);
        document.body.appendChild(containerEl);

    }

    // add another method to add if multiple options are correct
}

// Class instances

//HTML Questions 
const htmlArray = []

const htmlQuiz1 = new Questions('HTML stands for', 'Hyper Text Markup Language', 'Hyper Text Modul Language', 'Hyper Test Markup Language', 'Hyperlink Markup Language', 'What is the primary purpose of HTML')
htmlArray.push(htmlQuiz1)

const htmlQuiz2 = new Questions('Which tag is used to create a hyperlink?', '<a>', '<img>', '<dl>', '<link>', 'Not as straight forward as you think')
htmlArray.push(htmlQuiz2)

const htmlQuiz3 = new Questions('What is the HTML element used to display an image?', '<img>', '<picture>', '<image>', '<pic>', 'Shorthand is always better')
htmlArray.push(htmlQuiz3)

// CSS Questions
const cssArray = [];

const cssQuiz1 = new Questions('What is the correct CSS syntax for making all the <span> elements bold?', 'span {text-size: bold}', 'span {font-weight: bold}', '<span style=`font-size: bold`>', '<span style=`text-size: bold`>', 'REMEMBER CSS SYNTAX!!!')
cssArray.push(cssQuiz1)

const cssQuiz2 = new Questions('How do you add a comment in a CSS file?', '/* this is a comment */', '// this is a comment //', '// this is a comment', '<!-- this is a comment-->', 'CSS COMEMNTS')
cssArray.push(cssQuiz2)

const cssQuiz3 = new Questions('What property is used to change the text color of an element?', 'fontcolor:', 'textcolor:', 'color:', 'font-color:', `Don't overthink it  `)
cssArray.push(cssQuiz3)
//JavaScript Questions
const jsArray = [];
const jsQuiz1 = new Questions('What is Javascript mostly used for?', 'Web Development', 'Databases', 'Artificial Intelligence', 'Hacking', 'commonly employed to add interactivity and functionality to websites. It is an essential tool for creating dynamic web applications and enhancing user experiences.');
jsArray.push(jsQuiz1)

const jsQuiz2 = new Questions('How do you create a function in javascript', 'function myFunction()', 'function=myFunction()', 'function:myFunction()', 'function[myFunction]',)
jsArray.push(jsQuiz2)

const jsQuiz3 = new Questions('Which of these is not a comparison operator?', '=', '<', '>', '!=', 'Think of asigning a variable')
jsArray.push(jsQuiz3)


// find out how to randomize the placement of the answers create the list items in the js and randomize then append

// Array that allows me to navigate all the quizes
const allQuizes = []
allQuizes.push(htmlArray)
allQuizes.push(cssArray)
allQuizes.push(jsArray)


/* --------------------------------------------------------------------------------------------------*/

//FUNCTIONS

let timer;
let timeRemaining = 60;

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        const timeRemainingElement = document.querySelector('.time');
        timeRemainingElement.textContent = `Time Left: ${timeRemaining} seconds `;

        if (timeRemaining === 0) {
            clearInterval(timer);
        }
    }, 1000); // Update every second (1000 milliseconds)
}


//added event listener and right or wrong check system
let scoreCount = 0;
let currentQuizIndex = 0
let currentQuestionIndex = 0;
function select(element, array, currentIndex) {

    if (element.textContent === array[currentIndex]._correct) {
        element.setAttribute('class', 'right');
        scoreCount++; // Increment the score if the answer is correct
        const score = document.querySelector('.score')
        score.textContent = `Score: ${scoreCount}`;
        if (currentIndex < array.length - 1) {
            array[currentIndex + 1].append();
            currentQuestionIndex = currentIndex + 1;
        } else {
            console.log('Final Score:', score); // Log the final score when the quiz is completed
        }
    } else {
        console.log('Wrong answer');
    }
}


// Navigatation system for indivdual questions
function navIn() {
    startTimer()
    liArray.forEach(element => {
        element.addEventListener('click', () => {
            // select all quizes
            allQuizes.forEach(quizArray => {
                select(element, quizArray, currentQuestionIndex);
            });


        });
    });
}

// Navigation for different quizes
function navCarousel() {
    for (let i = 0; i < carouselItems.children.length; i++) {
        carouselItems.children[i].addEventListener('click', () => {
            containerEl.style.display = '';
            navIn()
            currentQuizIndex = i;
            allQuizes[currentQuizIndex][currentQuestionIndex].append();
            carouselItems.style.display = 'none';
            document.querySelector('.categories').style.display = 'none'
            document.querySelector('header').style.display = 'none'
            document.querySelector('footer').style.display = 'none'
            document.querySelector('.features').style.display = 'none'
        });
    }
}
navCarousel()

const quizNameInput = document.getElementById('quizName');
const quizDescriptionInput = document.getElementById('quizDescription');
const quizImageInput = document.getElementById('quizImage');
const quizQuestionInput = document.getElementById('quizQuestion');
const quizAnswerInput = document.getElementById('quizAnswer');
const quizHintInput = document.getElementById('quizHint');
const quizLength = document.getElementById('quizLength')
const save = document.getElementById('saveButton')
const quizStart = document.getElementById('createQuiz')

const userDataButtonTemplate = {
    slideTo: 2,
    slideNum: 3
}
class UserQuestions {
    constructor(questionName, description, image, questionLength) {
        this._questionName = questionName;
        this._description = description;
        this._image = image;
        this._questionLength = questionLength;
    }
    appendToCarousel() {

        const Carousel = {
            imgSrc: this._image,
            imgAlt: `User's Image`,
            Title: this._questionName,
            Description: this._description
        }
        const carouselTemplate = document.querySelector("#userQuiz-template");
        carouselTemplate.innerHTML += `
            <div class="carousel-item click">
                <img src='${Carousel.imgSrc}' class="d-block w-100" alt='${Carousel.imgAlt}'>
                <div class="carousel-caption d-none d-md-block">
                    <h5>${Carousel.Title}</h5>
                    <p>${Carousel.Description}</p>
                </div>
            </div>
        `;

        // Compile and render the Handlebars template for userQuiz
        const source = carouselTemplate.innerHTML; // Use the updated content
        const template = Handlebars.compile(source);
        const renderedHtml = template(Carousel);
        document.querySelector("#user-Item").innerHTML = renderedHtml;

        // Append the new button template to the userQuizButton-template
        const buttonTemplate = document.querySelector("#userQuizButton-template");
        buttonTemplate.innerHTML += `
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${userDataButtonTemplate.slideTo}" aria-label="${userDataButtonTemplate.slideNum}"></button>
        `;
        // Compile and render the Handlebars template for userQuizButton
        const source1 = buttonTemplate.innerHTML; // Use the updated content
        const template1 = Handlebars.compile(source1);
        const renderedHtml1 = template1(userDataButtonTemplate);
        document.querySelector("#userButton").innerHTML = renderedHtml1;



    }
}
const allUserCreatedQuizes = []
save.addEventListener('click', () => {

    userDataButtonTemplate.slideTo++;
    userDataButtonTemplate.slideNum++;
    console.log(userDataButtonTemplate.slideTo);
    console.log(userDataButtonTemplate.slideNum);

    const userCreatedQuiz = new UserQuestions(
        quizNameInput.value,
        quizDescriptionInput.value,
        quizImageInput.value,
        quizLength.value,
        quizQuestionInput.value,
        quizAnswerInput.value,
        'one',
        'two',
        'three',
        quizHintInput.value
    );
    userCreatedQuiz.appendToCarousel()
    console.log(userCreatedQuiz);

    const newUserQuestion = new Questions(quizNameInput.value, quizAnswerInput.value, 'yeah1', 'yeah2', 'yeah3', quizHintInput.value)
    const newUserQuestion2 = new Questions(quizNameInput.value, quizAnswerInput.value, 'yead', 'yeahfdsvfd2', 'yeah3', quizHintInput.value)

    allUserCreatedQuizes.push(newUserQuestion)
    allUserCreatedQuizes.push(newUserQuestion2)
    allQuizes.push(allUserCreatedQuizes)

    console.log(allUserCreatedQuizes)
    console.log(allQuizes)

    quizNameInput.value = "";
    quizDescriptionInput.value = "";
    quizImageInput.value = "";
    quizLength.value = "";
    quizQuestionInput.value = "";
    quizAnswerInput.value = "";
    quizHintInput.value = "";

});

/* ----------------------------------------------------------------------------------------------------*/
// allow user to change timer
 // switch quizz question to slide
 // create function slides





