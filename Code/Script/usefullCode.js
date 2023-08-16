//Change innerHtml of phone number and email when you click
const footerFunction=()=>{
 const phoneNum=document.getElementById('phoneNum');
  const email=document.getElementById('email')

  phoneNum.addEventListener('click',function(){
    phoneNum.innerHTML='718-724-9000';
  })

  email.addEventListener('click',function(){
    email.innerHTML='morgandamion5680@gmail.com'
  })

}
 
  export{footerFunction}


// randomize array 
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}
export{shuffleArray}