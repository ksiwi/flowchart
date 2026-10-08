import mermaid from "mermaid";
import {parseCode} from "./parser.js";

const button = document.getElementById("submit-btn");
const userInput = document.getElementById("userInputA");
const outputElement = document.getElementById("debug-box");
mermaid.initialize({ startOnLoad: true });

button.addEventListener("click", function() {

    const flowchart = document.getElementById("generated-flowchart")
    flowchart.innerHTML = "";

    const output = parseCode(userInput.value);
    console.log(output);
    outputElement.textContent = output;

});
