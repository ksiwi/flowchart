import ast

code = """

x = 5

if x < 3:
    print(x)

"""

parsedCode = ast.parse(code)

def parseCode(code_string: code):

    try:
        parsedCode = ast.parse(code)
        return True
    except SyntaxError:
        return False

if(parseCode):
    print(ast.dump(parsedCode, indent = 4))