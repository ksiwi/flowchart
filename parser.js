import {parser} from "@lezer/python";
import { renderDiagram } from "./render.js";

const STATEMENT_TYPES = new Set([
    "AssignStatement",
    "AugAssignStatement",
    "ReturnStatement",
    "ExpressionStatement",
    "IfStatement",
    "ForStatement",
    "WhileStatement",
    "WithStatement",
    "TryStatement",
    "RaiseStatement",
    "AssertStatement",
    "DeleteStatement",
    "ImportStatement",
    "ImportFromStatement",
    "PassStatement",
    "BreakStatement",
    "ContinueStatement"
]);

//Creates a box with text inside it
function createBox(text) {

    console.log("HI");

    const box = document.createElement("div");

    box.className = "flowchart-item";
    box.textContent = text;

    const flowchart = document.getElementById("generated-flowchart")
    flowchart.appendChild(box);

}

//Parses code
export async function parseCode(code) {

    const tree = parser.parse(code);
    const nodes = [];

    function visit(node) {

        if(STATEMENT_TYPES.has(node.name)) {
            nodes.push({
                type: node.name,
                text: code.slice(node.from, node.to).trim()
            });
        }

        for(

            let child = node.firstChild;
            child;
            child = child.nextSibling

        ) {

            visit(child);

        }

    }

    visit(tree.topNode);

    let mermaidCode = "flowchart LR\n";

    mermaidCode += 'start(["Start"]) \n';

    nodes.forEach((node, i) => {
        const id = `n${i}`;
        const label = node.text.replace(/"/g, "#quot;");

        mermaidCode += `    ${id}["${label}"]\n`;
    });

    mermaidCode += '    endNode(["End"])\n';

    if(nodes.length === 0) {

        mermaidCode += "    start --> endNode\n";

    } else {

        mermaidCode += "    start --> n0\n";

        for(let i = 0; i < nodes.length - 1; i++) {

            mermaidCode += `    n${i} --> n${i + 1}\n`;

        }

        mermaidCode += `    n${nodes.length - 1} --> endNode\n`;

    }

    await renderDiagram("display", mermaidCode);
    
}