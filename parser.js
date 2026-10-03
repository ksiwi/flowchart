import {parser} from "@lezer/python";

function getUserInput() {

    let userInput = document.getElementById("userInputA")
    (userInput.value)

}

function printTree(cursor, indent = 0) {

    console.log(" ".repeat(indent) + cursor.name);

    if(cursor.firstChild()) {

        do{

            printTree(cursor, indent + 4);
            
        } while(cursor.nextSibling());

        cursor.parent();
        
    }

}

const code = `
x = 67
if(x < 69):
    print(x)
else:
    print(38)
`    
;

const tree = parser.parse(code);
printTree(tree.cursor());