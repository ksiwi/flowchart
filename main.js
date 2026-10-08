import {parseCode} from "./parser.js";
import { renderDiagram } from "./render.js";
import { parseFunctions } from "./functionParser.js";

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

// Main Loop
button.addEventListener("click", function() {

    const flowchart = document.getElementById("generated-flowchart")
    flowchart.innerHTML = "";

    parseFunctions(userInput.value);
    const output = parseCode(userInput.value);
    // await renderDiagram("generated-flowchart", output)
    // Add above line of code once parser.js can parse code into mermaid diagrams.
    console.log(output);
    outputElement.textContent = output;

});
