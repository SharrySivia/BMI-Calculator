const weight = document.getElementById("weight");
const foot = document.getElementById("foot");
const inch = document.getElementById("inch");
const btnCalculate = document.getElementById("calculate");
const btnReset = document.getElementById("reset");
let messageBox;
let bmi = 0;

let BarColors = {
  underweight: "tomato",
  normal: "green",
  overweight: "red"
};

//Changing foot and inch to meter
function changeToMeter(f = 0, i = 0) {
  return f * 0.3048 + i * 0.0254;
}

//Transform Button to Bar
function transFormBtn() {
  btnCalculate.textContent = "";
  btnCalculate.classList.add("btn-primary-expand");
}

//Display Bar and message
function displayBar() {
  let status;
  if (bmi >= 18.5 && bmi <= 25) {
    status = "normal";
  } else if (bmi < 18.5) {
    status = "underweight";
  } else {
    status = "overweight";
  }
  messageBox = document.getElementById("messageBox");

  for (let i = 0; i < (bmi > 100 ? 44 : bmi); i++) {
    btnCalculate.style.setProperty("--width", i);
    messageBox.style.setProperty("--position", i);
  }
  btnCalculate.style.setProperty("--background-color", BarColors[status]);
  messageBox.textContent = status;
  messageBox.classList.add("messageBox-show");
}

//Calculate BMI
function calculateBMI() {
  const weightVal = weight.value;
  const footVal = foot.value;
  const inchVal = inch.value;
  if (weightVal && footVal) {
    let heightVal = changeToMeter(footVal, inchVal);
    bmi = weightVal / (heightVal * heightVal);
    transFormBtn();
    setTimeout(displayBar, 1000);
  }
  //Reset everything when user don't click reset
  weight.addEventListener("focus", reset);
  foot.addEventListener("focus", reset);
  inch.addEventListener("focus", reset);
}

//Reset Everything
function reset() {
  weight.value = "";
  foot.value = "";
  inch.value = "";
  bmi = 0;
  btnCalculate.style.setProperty("--width", 0);
  btnCalculate.classList.remove("btn-primary-expand");
  messageBox.classList.remove("messageBox-show");
  setTimeout(() => {
    btnCalculate.textContent = "Calculate";
  }, 270);

  //Remove eventListeners from inputs
  weight.removeEventListener("focus", reset);
  foot.removeEventListener("focus", reset);
  inch.removeEventListener("focus", reset);
}

//Calculate BMI on Calculate button click
btnCalculate.addEventListener("click", calculateBMI);

//Reset everything on Reset button click
btnReset.addEventListener("click", reset);
