import {parser} from "@lezer/python";

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
export function parseCode(code) {

    const tree = parser.parse(code);
    const lines = [];
    const cursor = tree.cursor();

    //Prints the structure of the tree and also runs the createbox to make expression statement boxes
    function visit(cursor, indent = 0) {

        const text = code.slice(cursor.from, cursor.to);

        if (cursor.name === "AssignStatement") {
            createBox(text);
        }

        if (cursor.firstChild()) {
            do {
                visit(cursor, indent + 4);
            } while (cursor.nextSibling());

            cursor.parent();
        }
    }

    visit(cursor);
    return lines.join("\n");
}