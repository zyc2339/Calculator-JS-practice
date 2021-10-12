let result = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

const buttonClick = () => {
  document.querySelector(".calc-buttons").addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      getButtonValue(e.target.innerText);
    }
  });
};

buttonClick();

const getButtonValue = (e) => {
  if (isNaN(e)) {
    console.log(e);
    handleSymbol(e);
  } else handleNumber(e);
  screen.innerText = buffer;
};

const handleNumber = (v) => {
  if (buffer === "0") {
    buffer = v;
  } else buffer += v;
};

const handleMath = (v) => {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (result === 0) {
    result = intBuffer;
  } else {
    handleOperator(intBuffer);
  }

  previousOperator = v;

  buffer = "0";
};

const handleOperator = (v) => {
  if (previousOperator === "+") {
    result += v;
  }
  if (previousOperator === "-") {
    result -= v;
  }
  if (previousOperator === "×") {
    result *= v;
  }
  if (previousOperator === "÷") {
    result /= v;
  }
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
        return;
      } else {
        handleOperator(parseInt(buffer));
        previousOperator = null;
        buffer = result;
      }
  }
};
