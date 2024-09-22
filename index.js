// IMPORT REQUIRED PACKAGES
const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Triangle, Square } = require("./lib/shapes");

// MAKE AN SVG CLASS WITH METHODS THAT SETS TEXT AND SHAPE COLOR
class Svg {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }
  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }
  setShapeElement(shape) {
    this.shapeElement = shape.render();
  }
}

// ARRAY OF QUESTIONS FOR USER INPUT
const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter up to 3 characters for your logo",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter a text color",
  },
  {
    type: "list",
    name: "shapeType",
    message: "Choose a shape for the logo",
    choices: ["Triangle", "Circle", "Square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter a color for your logo",
  },
];

// FUNCTION TO WRITE SVG FILE
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
  });
}


async function init() {
  let svgString = "";
  let svg_file = "logo.svg";

  // USING IMPORTED INQUIRER PACKAGE TO PROMT USER QUESTIONS
  const answers = await inquirer.prompt(questions);

  let user_text = "";
  if (answers.text.length > 0 && answers.text.length < 4) {
    user_text = answers.text;
  } else {
    console.log(
      "Invalid user text field detected! Please enter 1-3 Characters, no more and no less"
    );
    return;
  }
  
  user_font_color = answers["textColor"];
  user_shape_color = answers["shapeColor"];
  user_shape_type = answers["shapeType"];

  let user_shape;
  if (user_shape_type === "Square" || user_shape_type === "square") {
    user_shape = new Square();
  } else if (user_shape_type === "Circle" || user_shape_type === "circle") {
    user_shape = new Circle();
  } else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
    user_shape = new Triangle();
  } else {
    console.log("Invalid shape!");
  }
  
  user_shape.setColor(user_shape_color);

  // CREATE NEW SVG INSTANCE THAT CREATES NEW SVG FROM USERS ANSWERS TO PROMPTS
  let svg = new Svg();
  svg.setTextElement(user_text, user_font_color);
  svg.setShapeElement(user_shape);
  svgString = svg.render();

  console.log("Generated logo.svg");
  writeToFile(svg_file, svgString);
}
init();