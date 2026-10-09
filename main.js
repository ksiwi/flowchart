import {parseCode} from "./parser.js";
import { parseFunctions } from "./functionParser.js";

const button = document.getElementById("submit-btn");
const userInput = document.getElementById("userInputA");
const outputElement = document.getElementById("debug-box");
let typingTimer;
let lastParsedInput = null;

// Automatically process code after typing stops

userInput.addEventListener("input", function() {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(function() {
        const currentInput = userInput.value;

        // Only run parseFunctions if the input has changed
        if (currentInput !== lastParsedInput) {
            // ADD MATH THING HERE IF U WANNA TEST MATH THING (replace below line)
            parseFunctions("display", currentInput);

            lastParsedInput = currentInput;
        }

        const timeTracker = document.getElementById("time-track")
        const currentNumber = parseInt(timeTracker.textContent, 10)
        timeTracker.textContent = currentNumber + 1;
        
    }, 100);
});

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        event.preventDefault();

        const start = userInput.selectionStart;
        const end = userInput.selectionEnd;
        const indent = "    ";

        // Insert four spaces at the cursor or replace selected text
        userInput.setRangeText(
            indent,
            start,
            end,
            "end"
        );

        // Trigger your existing real-time parser
        userInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
});

// Uncomment the bellow code to add back the submit button if u wanna debug stuff ig
/*
button.addEventListener("click", function() {
    parseFunctions("display", userInput.value);
});
*/


