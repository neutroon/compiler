export class Parser {
  // Display the syntax tree
  // outputDiv.innerHTML = JSON.stringify(rootNode, null, 2);

  static parseLine(line) {
    if (line.startsWith("if")) {
      // Parse if statement
      var condition = line
        .substring(line.indexOf("(") + 1, line.indexOf(")"))
        .trim();
      var body = line
        .substring(line.indexOf("then") + 4, line.indexOf("end"))
        .trim();

      return {
        type: "IfStatement",
        condition: condition,
        body: this.parseBody(body),
      };
    } else if (line.startsWith("repeat")) {
      // Parse repeat statement
      var repeatCondition = line
        .substring(line.indexOf("until") + 5, line.indexOf(";"))
        .trim();
      var repeatBody = line
        .substring(line.indexOf("repeat") + 6, line.indexOf("until"))
        .trim();
      return {
        type: "RepeatStatement",
        condition: repeatCondition,
        body: this.parseBody(repeatBody),
      };
    } else if (line.startsWith("read")) {
      // Parse read statement
      var variable = line
        .substring(line.indexOf("read") + 4, line.indexOf(";"))
        .trim();
      return {
        type: "ReadStatement",
        variable: variable,
      };
    } else if (line.startsWith("write")) {
      // Parse write statement
      var value = line
        .substring(line.indexOf("write") + 5, line.indexOf(";"))
        .trim();
      return {
        type: "WriteStatement",
        value: value,
      };
    } else if (line.includes(":=")) {
      // Parse assignment statement
      var parts = line.split(":=");
      var variable = parts[0].trim();
      var assignmentValue = parts[1].trim();
      return {
        type: "AssignmentStatement",
        variable: variable,
        value: assignmentValue,
      };
    } else {
      // Unrecognized statement
      return null;
    }
  }

  static parseBody(body) {
    // Parse the body of if or repeat statement
    // Split the body into individual statements and parse each statement
    //   var statements = body.split(";");
    //   var parsedStatements = [];
    //   statements.forEach(function (statement) {
    //     var trimmedStatement = statement.trim();
    //     if (trimmedStatement) {
    //         var parsedStatement = parseLine(trimmedStatement);
    //       if (parsedStatement) {
    //         parsedStatements.push(parsedStatement);
    //       } else {
    //         // Handle parsing error
    //         console.error("Error parsing statement: " + trimmedStatement);
    //       }
    //     }
    //   });
    return body;
  }
}
