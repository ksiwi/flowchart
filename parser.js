import {parser} from "@lezer/python";

const button = document.getElementById("submit-btn");

button.addEventListener("click", function() {

    const userInput = document.getElementById("userInputA");

    const code = userInput.value;

    const tree = parser.parse(code);

    const output = printTree(tree.cursor());
    
    const element = document.getElementById("debug-box");
    
    element.textContent = output;
});

// Helper function for debugging.
function printTree(cursor, indent = 0) {
    let output = "";

    output += " ".repeat(indent) + cursor.name + "\n";

    if (cursor.firstChild()) {

        do {
            output += printTree(cursor, indent + 4);
        } while (cursor.nextSibling());

        cursor.parent();
    }

    return output;
}

/*
const code = `
x = 67
if(x < 69):
    print(x)
else:
    print(38)
`    
;
*/


// element is a test element
//printTree(tree.cursor());