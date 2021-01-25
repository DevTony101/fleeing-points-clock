let customFont;
let vehicles = [];
let textPoints;

function preload() {
  customFont = loadFont('data/AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateTime();
  setInterval(updateTime, 3000);
}

function keyPressed() {
  if (keyCode === ENTER) {
    vehicles.forEach(vehicle => vehicle.randomizeColors());
  }
}

function draw() {
  background(0);
  vehicles.forEach(vehicle => {
    vehicle.addSteerBehavior();
    vehicle.addFleeBehavior(createVector(mouseX, mouseY));
    vehicle.update();
    vehicle.show();
  });

  textAlign(CENTER, CENTER);
  fill(255);
  text('Hover your mouse over the numbers!', parseInt(windowWidth / 2), windowHeight - 50);
}

function padTime(n) {
  return (n / 10) >= 1 ? n : "0" + n;
}

function updateTime() {
  let time = `${padTime(hour())}:${padTime(minute())}:${padTime(second())}`;
  let previousLength = textPoints ? textPoints.length : -1;
  textPoints = customFont.textToPoints(time, 10, parseInt(windowHeight / 2) + 100, 310);
  if (previousLength != -1) {
    if (textPoints.length > previousLength) {
      let diff = textPoints.length - previousLength;
      for (let i = 0; i < diff; i++) vehicles.push(new SquareVehicle());
      for (let i = 0; i < textPoints.length; i++) {
        let pt = textPoints[i];
        vehicles[i].setTarget(pt.x, pt.y);
      }
    } else if (textPoints.length < previousLength) {
      let diff = previousLength - textPoints.length;
      vehicles.splice(vehicles.length - diff - 1, diff);
      for (let i = 0; i < textPoints.length; i++) {
        let pt = textPoints[i];
        vehicles[i].setTarget(pt.x, pt.y);
      }
    } else {
      for (let i = 0; i < textPoints.length; i++) {
        let pt = textPoints[i];
        vehicles[i].setTarget(pt.x, pt.y);
      }
    }
  } else {
    textPoints.forEach(point => {
      let sqv = new SquareVehicle();
      sqv.setTarget(point.x, point.y);
      vehicles.push(sqv);
    });
  }
}
