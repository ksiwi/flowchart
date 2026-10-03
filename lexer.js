const token = {
    type: "IDENTIFIER",
    value: "main"
};

class Lexer {
    constructor(input) {
        this.input = input;
        this.currPos = 0;
    }

    advance() {
        this.position++;    
    }

    currentChar() {
        return this.input[this.position];
    }

    parseWord() {
        const start = this.currPos;
        while (this.currPos < this.input.length &&  /[a-zA-Z0-9_]/.test(this.currentChar())) {
            this.advance();
        }

        return this.input.slice(start, this.position);
    }
}

const exampleCode = "def main():\nfoo()";
const myLexer = new Lexer(exampleCode);
console.log(myLexer.parseWord())