import {parser} from "@lezer/python";

function getUserInput() {

    let userInput = document.getElementById("userInputA")
    (userInput.value)

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
console.log(tree)