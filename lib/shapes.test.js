const { Circle, Square, Triangle } = require("./shapes");
// IMPORT SHAPE CLASSES AND WRITE TESTS FOR EACH CLASS

// RENDERS CIRCLE SHAPE
describe("Circle", () => {
  test("shoud render a circle element", () => {
    const shape = new Circle();
    var color = "blue";
    shape.setColor(color);
    expect(shape.render()).toEqual(
      `<circle cx="150" cy="100" r="80" fill="${color}" />`
    );
  });
});

// RENDERS SQUARE SHAPE
describe("Square", () => {
  test("should render a square", () => {
    const shape = new Square();
    var color = "green";
    shape.setColor(color);
    expect(shape.render()).toEqual(
      `<rect x="90" y="40" width="120" height="120" fill="${color}" />`
    );
  });
});

// RENDERS TRIANGLE SHAPE
describe("Triangle", () => {
  test("should render a triangle", () => {
    const shape = new Triangle();
    var color = "pink";
    shape.setColor(color);
    expect(shape.render()).toEqual(
      `<polygon points="150, 18 244, 182 56, 182" fill="${color}" />`
    );
  });
});
