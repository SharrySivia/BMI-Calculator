const weight = document.getElementById("weight");
const foot = document.getElementById("foot");
const inch = document.getElementById("inch");
const btnCalculate = document.getElementById("calculate");
const btnReset = document.getElementById("reset");

let BMIRange = {
  underweight: ["Underweight", "tomato"],
  normal: ["Normal", "green"],
  overweight: ["Overweight", "red"]
};

//Changing foot and inch to meter
function changeToMeter(f = 0, i = 0) {
  return f * 0.3048 + i * 0.0254;
}

let bmi;

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
}

//Transform Button to Bar
function transFormBtn() {
  btnCalculate.textContent = "";
  btnCalculate.classList.add("btn-primary-expand");
}

//Display Bar and message
function displayBar() {
  const messageBox = document.getElementById("messageBox");
  let status;
  if (bmi >= 18.5 && bmi <= 25) {
    status = "normal";
  } else if (bmi < 18.5) {
    status = "underweight";
  } else {
    status = "overweight";
  }

  for (let i = 0; i < bmi; i++) {
    btnCalculate.style.setProperty("--width", i);
    messageBox.style.setProperty("--position", i);
  }
  btnCalculate.style.setProperty("--background-color", BMIRange[status][1]);
  messageBox.textContent = BMIRange[status][0];
  messageBox.classList.add("messageBox-show");
}

//Reset Everything
function reset() {
  weight.value = "";
  foot.value = "";
  inch.value = "";
  bmi = 0;
  btnCalculate.style.setProperty("--width", 0);
  btnCalculate.classList.remove("btn-primary-expand");
  btnCalculate.textContent = "Calculate";
  messageBox.classList.remove("messageBox-show");
}

//Calculate BMI on Calculate button click
btnCalculate.addEventListener("click", calculateBMI);

//Reset everything on Reset button click
btnReset.addEventListener("click", reset);
