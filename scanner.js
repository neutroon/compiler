export class Scanner {
  static scanerrors = "";

  static GetScanerrors() {
    return this.scanerrors;
  }

  static hasAlphabet(input) {
    const alpha = "abcdefghijkmnlopqrstuvwxyz";
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < 26; j++) {
        if (input[i] === alpha[j]) {
          return true;
        }
      }
    }
    return false;
  }

  static tokenize(text, delimiters) {
    const tokens = new Array(text.length).fill("");

    let index = 0;
    for (let i = 0; i < text.length; i++) {
      let del = false;
      for (let j = 0; j < delimiters.length; j++) {
        if (text[i] === delimiters[j]) {
          if (tokens[index] !== "") {
            index++;
          }
          tokens[index] = delimiters[j];
          index++;
          del = true;
        }
      }
      if (!del) {
        tokens[index] += text[i];
      }
    }
    return tokens;
  }

  static lexer(input) {
    const delimiters = ' <>+-*/=:,;{}[]()"\r\n';
    const splitted = this.tokenize(input, delimiters);
    const print = [];

    let comment = false;
    let commentt = "";
    let str = false;
    let strr = "";
    let index = 0;
    for (let i = 0; i < splitted.length; i++) {
      if (comment === true) {
        if (splitted[i] === "*" && splitted[i + 1] === "/") {
          comment = false;
          commentt += "*/";
          print.push([commentt, "comment"]);
          commentt = "";
          i++;
          index++;
          continue;
        } else {
          commentt += splitted[i];
          continue;
        }
      }

      if (str === true) {
        if (splitted[i] === '"') {
          str = false;
          strr += '"';
          print.push([strr, "string"]);
          strr = "";
          index++;
          continue;
        } else {
          strr += splitted[i];
          continue;
        }
      }

      if (splitted[i] === "/") {
        if (splitted[i + 1] === "*") {
          commentt += splitted[i];
          comment = true;
          continue;
        }
      }

      if (splitted[i] === '"') {
        strr += splitted[i];
        str = true;
        continue;
      }

      if (
        splitted[i] === "int" ||
        splitted[i] === "float" ||
        splitted[i] === "string" ||
        splitted[i] === "read" ||
        splitted[i] === "write" ||
        splitted[i] === "repeat" ||
        splitted[i] === "until" ||
        splitted[i] === "if" ||
        splitted[i] === "endl" ||
        splitted[i] === "return" ||
        splitted[i] === "then" ||
        splitted[i] === "endl" ||
        splitted[i] === "end" ||
        splitted[i] === "elseif" ||
        splitted[i] === "else" ||
        splitted[i] === "real" ||
        splitted[i] === "begin"
      ) {
        print.push([splitted[i], "RESERVED_WORD_" + splitted[i]]);
      } else if (parseFloat(splitted[i])) {
        print.push([splitted[i], "Number_" + splitted[i]]);
      } else if (splitted[i] === ":") {
        if (splitted[i + 1] === "=") {
          print.push([splitted[i] + splitted[i + 1], "Assign_Operator"]);
          i++;
          index++;
          continue;
        } else {
          this.scanerrors +=
            "assign operator's " +
            splitted[i] +
            " must be followed by an =" +
            "\n" +
            "\n";
        }
      } else if (
        splitted[i] === "+" ||
        splitted[i] === "*" ||
        splitted[i] === "/" ||
        splitted[i] === "-"
      ) {
        print.push([splitted[i], "Arithmatic_Operator_" + splitted[i]]);
      } else if (
        splitted[i] === ">=" ||
        splitted[i] === "<=" ||
        splitted[i] === ">" ||
        splitted[i] === "<" ||
        splitted[i] === "==" ||
        splitted[i] === "<>"
      ) {
        print.push([splitted[i], "condition_operator" + splitted[i]]);
      } else if (
        splitted[i] === "&&" ||
        splitted[i] === "||" ||
        splitted[i] === "!"
      ) {
        print.push([splitted[i], "Boolean_operator" + splitted[i]]);
      } else if (
        splitted[i] === "%" ||
        splitted[i] === "=" ||
        splitted[i] === "{" ||
        splitted[i] === "}" ||
        splitted[i] === ":="
      ) {
        print.push([splitted[i], "Operator_" + splitted[i]]);
      } else if (
        splitted[i] === ";" ||
        splitted[i] === "(" ||
        splitted[i] === ")" ||
        splitted[i] === ","
      ) {
        print.push([splitted[i], "Separator_" + splitted[i]]);
      } else if (this.hasAlphabet(splitted[i])) {
        if (!isNaN(splitted[i][0])) {
          this.scanerrors +=
            "identifier " +
            splitted[i] +
            " can't begin with number ,Identifier must begin with letter only." +
            "\n" +
            "\n";
        } else {
          print.push([splitted[i], "Identifier_" + splitted[i]]);
        }
      } else {
        continue;
      }
      index++;
    }
    return print;
  }
}
