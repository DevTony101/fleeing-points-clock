class Vehicle {
  constructor() {
    this.loc = createVector(random(windowWidth), random(windowHeight));
    this.target = createVector();
    this.vel = createVector();
    this.acc = createVector();
    this.clr = color(255, random(200), random(255));
    this.size = 5;
    this.constraints = {
      maxSpeed: 10,
      maxForce: 0.8
    };
  }

  setTarget(x, y) {
    this.target.set(x, y);
  }

  randomizeColors() {
    this.clr = color(random(255), random(255), random(255));
  }

  addSteerBehavior() {
    let steer = this.steer(this.target, 100, 1);
    this.applyForce(steer);
  }

  addFleeBehavior(target) {
    let flee = this.flee(target, 100, -1);
    if (flee) {
      flee.mult(5);
      this.applyForce(flee);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(this.clr);
    strokeWeight(this.size);
    point(this.loc.x, this.loc.y);
  }

  steer(target, minDistance, dir) {
    let desired = p5.Vector.sub(target, this.loc);
    let d = desired.mag();
    var speed = this.constraints.maxSpeed;
    if (d < minDistance) {
      speed = map(d, 0, minDistance, 0, this.constraints.maxSpeed);
    }
    desired.setMag(dir * speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.constraints.maxForce);
    return steer;
  }

  flee(target, minDistance, dir) {
    let desired = p5.Vector.sub(target, this.loc);
    let d = desired.mag();
    if (d < minDistance) {
      desired.setMag(dir * this.constraints.maxSpeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.constraints.maxForce);
      return steer;
    } else {
      return undefined;
    }
  }
}