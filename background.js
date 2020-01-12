const container = document.getElementById("Simarea");
var canvas;

const rectWidth = 10;

let playEffect = false;
let [effectX, effectY] = [225, 225];

let click = false;
let clickPrevious = false;

function windowResized() {
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function setup() {
  canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.position(0, 0);
  canvas.parent("Simarea");
  canvas.style("z-index", "-1");
}

function draw() {
  background(175);
}

function mousePressed(e) {
  console.log(e.target);
  if (e.target.className != "p5Canvas") return;
  click = true;
}

function mouseReleased() {
  click = false;
}

function draw() {
  if (click && !clickPrevious && !playEffect) {
    [effectX, effectY] = [mouseX, mouseY];
  }

  let [radiusX, radiusY] = [2000, 2000];
  for (let i = 0; i < 20; i++) {
    radiusX *= 0.75;
    radiusY *= 0.75;
    push();
    ellipse(
      effectX + 40 * sin(i + millis() / 500),
      effectY + 10 * cos(i + millis() / 100),
      radiusX,
      radiusY
    );
    pop();
  }
}

clickPrevious = click;
