
//Creating Variables
const containerEl =document.querySelector('.containerQuiz');
containerEl.setAttribute('class', 'question');
const questionEl = document.createElement('h2');
const ulEl = document.createElement('ul');
ulEl.setAttribute('class', 'options');
const hintEl=document.createElement('p')
hintEl.setAttribute('class','hint')
// create 4 li to represent the options for asking a qeustion 
const liArray=[]
for(let i=0;i<4;i++){
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liArray.push(liEl)

}


class Questions {
    constructor(question,correct, one, two, three,hint) {
        this._question = question;
        this._correct=correct
        this._one = one;
        this._two = two;
        this._three = three;
        this._hint=hint
        
    }
    
    append() {

        // Adding Content and Appeding to the dom
        questionEl.textContent = this._question; // content for the title of the question
        // content for the list items
        const options = [this._correct,this._one, this._two, this._three];
        for (let i = 0; i < options.length; i++) {
            ulEl.children[i].textContent = options[i]; // Set option content  
        }

        
        // add content to the hint
        hintEl.textContent=this._hint
        // condiitonal to make hint appear 
        // if longer than a certain amount of time or if you click on 2 wrong answers

        containerEl.appendChild(questionEl);
        containerEl.appendChild(ulEl);
        containerEl.appendChild(hintEl)
        document.body.appendChild(containerEl);  

    }
    // add another method to add if multiple options are correct
}

// Class instances

//HTML Questions 
const htmlArray=[]

const htmlQuiz1=new Questions('HTML stands for','Hyper Text Markup Language','Hyper Text Modul Language','Hyper Test Markup Language','Hyperlink Markup Language','What is the primary purpose of HTML')
htmlArray.push(htmlQuiz1)

const htmlQuiz2=new Questions('Which tag is used to create a hyperlink?','<a>','<img>','<dl>','<link>','Not as straight forward as you think')
htmlArray.push(htmlQuiz2)

const htmlQuiz3=new Questions('What is the HTML element used to display an image?','<image>','<picture>','<img>','<pic>','Shorthand is always better')
htmlArray.push(htmlQuiz3)

// CSS Questions
const cssArray=[];

const cssQuiz1= new Questions('What is the correct CSS syntax for making all the <span> elements bold?','span {text-size: bold}','span {font-weight: bold}','<span style=`font-size: bold`>','<span style=`text-size: bold`>','REMEMBER CSS SYNTAX!!!')
cssArray.push(cssQuiz1)

const cssQuiz2=new Questions('How do you add a comment in a CSS file?','/* this is a comment */','// this is a comment //','// this is a comment','<!-- this is a comment-->','CSS COMEMNTS')
cssArray.push(cssQuiz2)

const cssQuiz3=new Questions('What property is used to change the text color of an element?','fontcolor:','textcolor:','color:','font-color:',`Don't overthink it  `)
cssArray.push(cssQuiz3)
//JavaScript Questions
const jsArray=[];
const jsQuiz1 = new Questions('What is Javascript mostly used for?', 'Web Development', 'Databases', 'Artificial Intelligence', 'Hacking','commonly employed to add interactivity and functionality to websites. It is an essential tool for creating dynamic web applications and enhancing user experiences.');
jsArray.push(jsQuiz1)

const jsQuiz2 = new Questions('How do you create a function in javascript','function myFunction()','function=myFunction()','function:myFunction()','function[myFunction]',)
jsArray.push(jsQuiz2)

const jsQuiz3 = new Questions('Which of these is not a comparison operator?','=','<','>','!=','Think of asigning a variable')
jsArray.push(jsQuiz3)


// find out how to randomize the placement of the answers create the list items in the js and randomize then append

// Array that allows me to navigate all the quizes
const allQuizes=[]
allQuizes.push(htmlArray)
allQuizes.push(cssArray)
allQuizes.push(jsArray)

console.log(allQuizes)
 /* --------------------------------------------------------------------------------------------------*/

//FUNCTIONS
        //added event listener and right or wrong check system
        function select(element, array, currentIndex) {
            if (element.textContent === array[currentIndex]._correct) {
                 // add animation
                currentIndex++; 
                if (currentIndex < array.length) {
                    array[currentIndex].append();
                    currentQuestionIndex = currentIndex; 
                } else {
                    console.log('Quiz completed!');
                }
            } else {
                 // add animation
            }
            console.log(currentIndex);
        }

            let currentQuestionIndex = 0; // this how you get a random mode
            liArray.forEach(element => {
                
                element.addEventListener('click', () => {
                    select(element, htmlArray, currentQuestionIndex);
                });
            });

            
htmlArray[currentQuestionIndex].append()              

 /* ----------------------------------------------------------------------------------------------------*/
// IDEAS

// QUESTION 
// ANSWER 
// hint and read more section 
 // create an animation for right and wrong 
 // add in a a spot where you can type in an answer 
// inserrt a try system 3 tries 
// work with data atrributes somehow 







// // Handle Bars
// const  quizData = {
//     question: "we did it",
//     question2:'we did it again'
//   };
  
//   // Compile
//   const templateSource = document.querySelector("#question").innerHTML;
//   const template = Handlebars.compile(templateSource);
  
//   // Render
//   const renderedHtml = template(quizData)
//   const renderedHtml = template({ question: quizData[iterate] });
//   document.querySelector("#questionHandlebars").innerHTML = renderedHtml;
/* <script id="template" type="text/x-handlebars-template">
<h1>Hello, {{name}}!</h1>
<p>Today is {{day}}.</p>
</script> */

