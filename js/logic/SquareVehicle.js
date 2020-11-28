class SquareVehicle extends Vehicle {
  constructor() {
    super();
    this.angle = 0;
  }

  update() {
    super.update();
    let m = super.steer(this.target, 100, 1).mag();
    this.angle += map(m, 0, this.constraints.maxForce, 0, 0.4);
  }

  show() {
    push();
    noStroke();
    fill(this.clr);
    translate(this.loc.x, this.loc.y);
    rotate(this.angle);
    rectMode(CENTER);
    square(0, 0, 2 * this.size);
    pop();
  }
}