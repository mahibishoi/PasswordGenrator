// display
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

// copy password
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copymsg]");

// length
const lengthDisplay = document.querySelector("[data-length-display]");
const lengthSlider = document.querySelector("[data-length-slider]");

// checkboxes
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

// indicator
const indicator = document.querySelector("[data-indicator]");

// generate button
const generateBtn = document.querySelector(".generatbutton");

// symbol
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

///initially
let password="";
let passwordlength=15;
let checkCount=0;
handleSlider();
setIndicator("#ccc");
 
//ste strength circle color to grey


//set passwordLength
function handleSlider(){
    lengthSlider.value=passwordlength;
     lengthDisplay.innerText=passwordlength;

    

}
function setIndicator(color){
      indicator.style.backgroundColor=color;
}
function getRndInteger(min,max){
     return Math.floor(Math.random() * (max - min)) + min;
    }

function generateRandomNumber(){
  return getRndInteger(0,9)
}
 function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123))
 }
 function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,91))
 }

function generateSymbol(){
   const randNum=getRndInteger(0,symbols.length)
     return symbols.charAt(randNum);
}
function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;


if(hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8){
        setIndicator("#0f0");
    }
else if((hasUpper || hasLower) && (hasNum || hasSym) && passwordlength >= 6){
        setIndicator("#ff0");
    }
else{
        setIndicator("#f00");
    }


}
async function copyContent() {
    try {
        // throw error if password is empty
        if(password === ""){
            alert('First Generate Password to copy');
            throw 'Failed'; 
        }

        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } 

    // catch() will only run if any error is thrown by the try block
    catch (error) {
      copyMsg.innerText = error;
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
      copyMsg.classList.remove("active");
    }, 2000);
}  
function shufflePassword(array){
    //fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        // find out random j
        const j = Math.floor(Math.random() * (i + 1));
        // swap 2 numbers
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      let str = "";
      // array.forEach((el) => (str += el));
      str = array.join("");
      return str;
  }







function handlecheckBoxchange(){
checkCount=0;
allCheckbox.forEach((checkbox)=>{
    if(checkbox.checked)
    checkCount++;

});
 //special codition if checkbox is greater than password length set
  if(passwordlength<checkCount)   {
    passwordlength=checkCount;
    handleSlider();
  }



}
allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckBoxchange);
})




lengthSlider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
  if(passwordDisplay.value)
  copyContent();
})





    //generat password
generateBtn.addEventListener('click',()=>{
              //none of the checkbox are selected
              if(checkCount<=0) return;
              if(passwordlength<checkCount){
                passwordlength=checkCount;
                handleSlider();
              }

              //lets start the journey to find new password
              //remove old password
              password="";

               
              //lets put the stuff mentioned by checkbox



              //if(uppercaseCheck.checked){
               // password+=generateUppercase();
              //}
              //if(lowercaseCheck.checked){
                //password+=generateLowercase();
              //}
              //if(numberCheck.checked){
                //password+=generateRandomNumber();
              //}
              //if(symbolCheck.checked){
                //password+=generateSymbol();
              //}

let funArr=[];
if(uppercaseCheck.checked){
    funArr.push(generateUppercase);
    
  }
if(lowercaseCheck.checked){
    funArr.push(generateLowercase);
  }
  if(numberCheck.checked) {
    funArr.push(generateRandomNumber);
    }
if(symbolCheck.checked){
    funArr.push(generateSymbol);
  }
// compulsory addition
for(let i=0;i<funArr.length;i++){
    password+=funArr[i]();
}
for(let i=0;i<passwordlength-funArr.length;i++){

let randIndex=getRndInteger(0,funArr.length)
password+=funArr[randIndex]();



}
//shuffle the password
password=shufflePassword(Array.from(password));

//show in UI
passwordDisplay.value=password;
//calculate strength
calcStrength();

});
