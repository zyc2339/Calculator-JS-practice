let result = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

// when click button get the number or symbol
const buttonClick = () => {
  document.querySelector(".calc-buttons").addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      getValue(event.target.innerText);
    }
  });
};

buttonClick();

//if get number run function........if get symbol run symbol function
const getValue = (v) => {
  if (isNaN(v)) {
    handleSymbol(v);
  } else {
    handleNumber(v);
  }

  screen.innerText = buffer;
};

//number function shows buffer on the screen:
const handleNumber = (v) => {
  //if beginning is 0, change nothing
  if (buffer === "0") {
    buffer = v;
  } else buffer += v;
};

//calculate numbers function after have operator declaration
const handleMath = (v) => {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer); //from string to number

  // let result = first number
  if (result === 0) {
    result = intBuffer;
  } else {
    //let first result  go to calculation again
    handleOperator(intBuffer);
  }
  previousOperator = v;

  buffer = "0";
};

const handleOperator = (v) => {
  if (previousOperator === "+") {
    result += v;
  } else if (previousOperator === "-") {
    result -= v;
  } else if (previousOperator === "×") {
    result *= v;
  } else if (previousOperator === "÷") {
    result /= v;
  }
  console.log(result);
};

const handleSymbol = (v) => {
  switch (v) {
    case "C":
      buffer = "0";
      result = 0;
      previousOperator = null;
      break;
    case "←":
      if (buffer.length > 1) {
        buffer = buffer.substring(0, buffer.length - 1);
      } else buffer = "0";
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(v);
      break;

    case "=":
      if (previousOperator === null) {
        //make sure there are 2 numbers
        return;
      } else {
        handleOperator(parseInt(buffer)); // operator with 2nd number
        previousOperator = null;
        buffer = result; // show on the screen
      }

      console.log(result);
  }
};
