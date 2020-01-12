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

function mousePressed(e) {
  console.log(e.target);
  if (e.target.className != "p5Canvas") return;
  click = true;
}

function mouseReleased() {
  click = false;
}

function draw() {
  if (click && !clickPrevious) {
    background(255, 155, 155);
  } else {
    background(175);
  }

  push();
  pop();
}

clickPrevious = click;
