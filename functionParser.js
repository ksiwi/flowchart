import { parser } from "@lezer/python";
import { renderDiagram } from "./render.js";

export function parseFunctions(code) {
    // 1. Parse the Python code with Lezer
    const tree = parser.parse(code);

    // 2. Store the function relationships
    const functions = {};

    // 3. Walk through the Lezer tree
    findFunctions(tree.cursor(), code, functions);

    // 4. Turn the relationships into Mermaid code
    let mermaidCode = "flowchart TD\n";

    for (const functionName in functions) {
        for (const calledFunction of functions[functionName]) {
            mermaidCode += `    ${functionName} --> ${calledFunction}\n`;
        }
    }

    // 5. Send the Mermaid code to render.js
    renderDiagram("function-diagram", mermaidCode);

    // Useful for debugging
    return mermaidCode;
}


function findFunctions(cursor, code, functions) {

    if (cursor.name === "FunctionDefinition") {

        // Move to the function's name
        cursor.firstChild();

        while (cursor.name !== "VariableName") {
            if (!cursor.nextSibling()) {
                return;
            }
        }

        const functionName = code.slice(cursor.from, cursor.to);

        // Create an entry for this function
        functions[functionName] = [];

        // Move through the function definition
        cursor.parent();

        // Find calls inside this function
        findCalls(cursor, code, functionName, functions);
    }

    // Continue searching through the tree
    if (cursor.firstChild()) {
        do {
            findFunctions(cursor, code, functions);
        } while (cursor.nextSibling());

        cursor.parent();
    }
}


function findCalls(cursor, code, currentFunction, functions) {

    if (cursor.name === "CallExpression") {

        // Find the function being called
        if (cursor.firstChild()) {

            do {
                if (cursor.name === "VariableName") {

                    const calledFunction = code.slice(cursor.from, cursor.to);

                    functions[currentFunction].push(calledFunction);

                    break;
                }
            } while (cursor.nextSibling());

            cursor.parent();
        }
    }

    if (cursor.firstChild()) {
        do {
            findCalls(cursor, code, currentFunction, functions);
        } while (cursor.nextSibling());

        cursor.parent();
    }
}