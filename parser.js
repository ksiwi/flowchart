import {parser} from "@lezer/python";

export function parseCode(code) {
    const tree = parser.parse(code);
    const lines = [];
    const cursor = tree.cursor();

    function visit(cursor, indent = 0) {
        lines.push(" ".repeat(indent) + cursor.name);

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
