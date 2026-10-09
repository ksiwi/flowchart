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

    typingTimer = setTimeout(async function() {
        const currentInput = userInput.value;

        // Only run parseFunctions if the input has changed
        if (currentInput !== lastParsedInput) {
            // ADD MATH THING HERE IF U WANNA TEST MATH THING (replace below line)
            console.log("Input changed:", currentInput);

            await parseCode(currentInput);
            parseFunctions("function-diagram", currentInput);
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

userInput.addEventListener("keydown", function(event) {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const cursor = userInput.selectionStart;
    const textBeforeCursor = userInput.value.slice(0, cursor);

    // Get the current line
    const lines = textBeforeCursor.split("\n");
    const currentLine = lines[lines.length - 1];

    // Copy the current line's leading spaces or tabs
    const indentation = currentLine.match(/^[ \t]*/)[0];

    // Add one indentation level after Python block statements
    const trimmedLine = currentLine.trimEnd();
    const extraIndent = trimmedLine.endsWith(":") ? "    " : "";

    const insertion = "\n" + indentation + extraIndent;

    // Insert the newline and indentation at the cursor
    userInput.setRangeText(
        insertion,
        cursor,
        userInput.selectionEnd,
        "end"
    );

    // Trigger your existing real-time parser
    userInput.dispatchEvent(new Event("input"));
});

userInput.addEventListener("keydown", function(event) {
    if (event.key !== "Backspace") return;

    const cursor = userInput.selectionStart;
    const selectionEnd = userInput.selectionEnd;
    const textBeforeCursor = userInput.value.slice(0, cursor);

    // Only handle Backspace when there's no selection
    if (cursor !== selectionEnd) return;

    // Check whether the cursor is after four spaces
    if (textBeforeCursor.endsWith("    ")) {
        event.preventDefault();

        userInput.setRangeText(
            "",
            cursor - 4,
            cursor,
            "end"
        );

        // Refresh the flowchart
        userInput.dispatchEvent(new Event("input"));
    }
});

// Uncomment the bellow code to add back the submit button if u wanna debug stuff ig
/*
button.addEventListener("click", function() {
    parseFunctions("display", userInput.value);
});
*/


