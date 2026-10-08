import {parseCode} from "./parser.js";
import { renderDiagram } from "./render.js";

const button = document.getElementById("submit-btn");
const userInput = document.getElementById("userInputA");
const outputElement = document.getElementById("debug-box");

// Temporary test for mermaid
const code = `
    flowchart TD
        A[main] --> B[hello]
        B --> C[print]
        C --> D[hi william]
    `;
renderDiagram("generated-flowchart", code);

button.addEventListener("click", function() {

    const flowchart = document.getElementById("generated-flowchart")
    flowchart.innerHTML = "";

    const output = parseCode(userInput.value);
    console.log(output);
    outputElement.textContent = output;

});
