import { Scanner } from "./scanner.js";
import { Parser } from "./parser.js";

let codeAreaInput = document.querySelector("#codeArea");
let scannerArea = document.querySelector("#scanner");
let parserArea = document.querySelector("#parser");
// let scan = document.querySelector("#scan");
let resulet = { scanner: "", parser: "" };

// functions
function getCode(code) {
  resulet.scanner = Scanner.lexer(code);
  resulet.parser = Parser.parseLine(code);
}

// events
codeAreaInput.addEventListener("keyup", () => {
  let scannerContent = "";
  getCode(codeAreaInput.value);

  let lines = codeAreaInput.value.split(";");
  // Create root node for the syntax tree
  let rootNode = {
    type: "Program",
    children: [],
  };
  // Parse each line and construct the syntax tree
  lines.forEach(function (line) {
    var trimmedLine = line.trim();
    if (trimmedLine) {
      var parsedLine = Parser.parseLine(trimmedLine);
      if (parsedLine) {
        rootNode.children.push(parsedLine);
        resulet.parser = rootNode;
      } else {
        // Handle parsing error
        console.error("Error parsing line: " + trimmedLine);
      }
    }
  });

  resulet.scanner.forEach((element) => {
    scannerContent += `

    <div id="lineOfCode">
        <span>
            ${element[0]}
        </span>

        <span>
            ${element[1]}
        </span>
    </div>
    
    `;
  });

  parserArea.innerHTML = JSON.stringify(resulet.parser);
  scannerArea.innerHTML = scannerContent;
});
