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
function printTree(cursor, indent = 0, lines = []) {
    const line = " ".repeat(indent) + cursor.name;
    lines.push(line);
    console.log(line);

    if(cursor.firstChild()) {

        do{

            printTree(cursor, indent + 4, lines);
            
        } while(cursor.nextSibling());

        cursor.parent();
        
    }

    return lines.join("\n");

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