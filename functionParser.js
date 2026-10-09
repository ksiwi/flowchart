import { parser } from "@lezer/python";
import { renderDiagram } from "./render.js";

export function parseFunctions(containerID, code) {
    // lezer
    const tree = parser.parse(code);
    const functions = {};

    findFunctions(tree.cursor(), code, functions);

    let mermaidCode = "flowchart TD\n";

    for (const functionName in functions) {
        for (const calledFunction of functions[functionName]) {
            mermaidCode += `    ${functionName} --> ${calledFunction}\n`;
        }
    }

    renderDiagram(containerID, mermaidCode);

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