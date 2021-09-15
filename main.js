const input = document.querySelector("#getInt");
const error = document.querySelector(".error");
const button = document.querySelector(".submit");
const resultDiv = document.querySelector(".results");
const resultList = document.querySelector(".resultList");
const clearButton = document.createElement("button");

const control = num => {
  "use strict";

  const validator = num => {
    //check if valid input, then prime for next phase
    if (isNaN(num) || num < 0 || num === "") {
      error.textContent = "Please enter a positive integer";
      input.style.backgroundColor = "#fdd";
    } else if (num%1 !== 0) {
      error.textContent = "Fractions can't be narcissistic numbers";
      input.style.backgroundColor = "#fdd";
    } else {
      num = Number(num); //to remove floats from numbers like "153.0", ".0"
      armstrongEngine(num)
    }
  };
  const armstrongEngine = num => {
    //check if valid input is narcissistic, then send result to display department
    const numArray = num.toString().split("");
    let sum = 0;
    numArray.forEach(i => {
      let exp = i ** numArray.length;
      sum += exp;
    });
    display(sum == num, num);
  };
  const display = (result, num) => {
    //display results in div
    const resultItem = document.createElement("li");
    if (result) {
      resultItem.textContent = `${num} is narcissistic!`;
      resultItem.style.color = "green";
    } else {
      resultItem.textContent = `${num} isn't narcissistic.`;
      resultItem.style.color = "red";
      
    }
    resultList.insertBefore(resultItem, resultList.firstChild); //arrange results in 'stack-ish' order so last item comes first. seems more convenient for user.
    clearButton.textContent = "clear";
    resultDiv.appendChild(clearButton);
  };

  validator(num);
};

button.addEventListener("click", e => {
  e.preventDefault();
  control(input.value);
  if (!error.textContent) {
    //we don't want to clear field if there's error so user can see what's wrong and modify
    input.value = "";
  }
  input.focus();
});
clearButton.addEventListener("click", () => {
  resultList.textContent = "";
  resultDiv.removeChild(clearButton);
  input.focus();
});
input.addEventListener("input", () => {
  //clear error field once user modifies
  error.textContent = "";
  input.style.backgroundColor = "transparent";
});