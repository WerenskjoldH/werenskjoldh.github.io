class Star {
  /*
    posX: x position of star
    posY: y position of star
    r: radius of star
    s: speed of star
    c: color of star
  */
  constructor(posX, posY, r, s, c) {
    this.x = posX;
    this.y = posY;
    this.radius = r;
    this.speed = s;
    this.color = c;
  }

  drawStar() {
    fill(this.color);
    circle(this.x, this.y, this.radius);
  }

  // We pass 0 for back stars and 1 for front stars
  refreshStar(t) {
    let posX = container.offsetWidth + Math.random() * container.offsetWidth;
    let posY = Math.random() * container.offsetHeight;
    let col = getPlanetColor();
    let r, s;

    if (t == 0) {
      r = getRandomFloat(minBackStarRadius, maxBackStarRadius);
      s =
        (r / maxBackStarRadius) * (maxBackStarSpeed - minBackStarSpeed) +
        minBackStarSpeed;
    } else {
      r = getRandomFloat(minFrontStarRadius, maxFrontStarRadius);
      s =
        (r / maxFrontStarRadius) * (maxFrontStarSpeed - minFrontStarSpeed) +
        minFrontStarSpeed;
    }

    this.x = posX;
    this.y = posY;
    this.radius = r;
    this.speed = s;
    this.color = col;
  }
}

const container = document.getElementById("Simarea");
var canvas;

var starColors;

let click = false;
let clickPrevious = false;

const maxBackStars = 10;
const minBackStarSpeed = 0.05;
const maxBackStarSpeed = 0.5;
const minBackStarRadius = 1;
const maxBackStarRadius = 10;

const maxFrontStars = 8;
const minFrontStarSpeed = 0.75;
const maxFrontStarSpeed = 4;
const minFrontStarRadius = 15;
const maxFrontStarRadius = 35;

var backStars = new Array();
var frontStars = new Array();

function getRandomFloat(min, max) {
  return min + Math.random() * (max - min);
}

function getPlanetColor() {
  let r = Math.floor(Math.random() * 100);
  if (r <= 5) return starColors[1];
  else if (r > 5 && r <= 15) return starColors[2];
  else if (r > 15 && r <= 20) return starColors[3];
  else return starColors[0];
}

// Sorry to those looking at this code, we shouldn't resort the whole damn thing when adding one item, buuuuuut I want to get it working first
function sortStarArray(sA) {
  sA.sort(function(a, b) {
    if (a.radius <= b.radius) return -1;
    else return 1;
  });
}

function windowResized() {
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

function setup() {
  canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.position(0, 0);
  canvas.parent("Simarea");
  canvas.style("z-index", "-1");
  background(63, 63, 116);
  noStroke();

  starColors = [
    color(255, 255, 255),
    color(217, 87, 99),
    color(153, 229, 80),
    color(215, 123, 186)
  ];

  // Initialize Back Stars
  for (let i = 0; i < maxBackStars; i++) {
    let posX = Math.random() * 2 * container.offsetWidth;
    let posY = Math.random() * container.offsetHeight;
    let radius = getRandomFloat(minBackStarRadius, maxBackStarRadius);
    // This will let us fake a parallax
    let speed =
      (radius / maxBackStarRadius) * (maxBackStarSpeed - minBackStarSpeed) +
      minBackStarSpeed;
    let col = getPlanetColor();

    backStars.push(new Star(posX, posY, radius, speed, col));
  }
  // To maintain drawing order, we need to now sort by radius
  sortStarArray(backStars);

  // Initialize Front Stars
  for (let i = 0; i < maxFrontStars; i++) {
    let posX = Math.random() * 2 * container.offsetWidth;
    let posY = Math.random() * container.offsetHeight;
    let radius = getRandomFloat(minFrontStarRadius, maxFrontStarRadius);
    // This will let us fake a parallax
    let speed =
      (radius / maxFrontStarRadius) * (maxFrontStarSpeed - minFrontStarSpeed) +
      minFrontStarSpeed;
    let col = getPlanetColor();

    frontStars.push(new Star(posX, posY, radius, speed, col));
  }
  // To maintain drawing order, we need to now sort by radius
  sortStarArray(frontStars);
}

function mousePressed(e) {
  if (e.target.className != "p5Canvas") return;
  click = true;
}

function mouseReleased() {
  click = false;
}

function draw() {
  // 1. User Input
  if (click && !clickPrevious) {
    console.log("clicked in canvas");
  }

  // 2. Update Planets
  frontStars.forEach((obj, ind) => {
    obj.x -= obj.speed;

    if (obj.x < -1 * obj.radius) {
      obj.refreshStar(0);
      sortStarArray(frontStars);
    }
  });

  backStars.forEach((obj, ind) => {
    obj.x -= obj.speed;

    if (obj.x < -1 * obj.radius) {
      obj.refreshStar(1);
      sortStarArray(backStars);
    }
  });

  // 3. Draw Scene

  background(63, 63, 116);

  frontStars.forEach((obj, ind) => {
    obj.drawStar();
  });

  backStars.forEach((obj, ind) => {
    obj.drawStar();
  });

  // 4. Update previous click
  clickPrevious = click;
}
