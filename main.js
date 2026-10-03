import {parseCode} from "./parser.js";

const button = document.getElementById("submit-btn");
const userInput = document.getElementById("userInputA");
const outputElement = document.getElementById("debug-box");

button.addEventListener("click", function() {
    const output = parseCode(userInput.value);
    console.log(output);
    outputElement.textContent = output;
});
