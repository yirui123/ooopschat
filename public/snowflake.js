function getRandomSize() {
  let r = pow(random(0, 1), 3);
  return constrain(r * 18, 1, 3);

}

class Snowflake {
  constructor() {
    let x = width / 2;
    for (var i = 0; i <= 20; i++) {
      x += random(-width / 2, width / 2);
    }
    let y = random(-50, -10);
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.r = getRandomSize();
  }

  applyForce(force) {
    // parallax effect
    let f = force.copy();
    f.mult(this.r / 2);
    // let f = force.copy();
    // f.div(this.mass);
    this.acc.add(f);
  }

  update() {
    this.force = gravity;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

  }

  render() {
    let alpha = random(1, 25);
    noFill();
    // stroke(116, 209, 234, alpha);
    stroke(255, 0, 0, alpha);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
    // image(flakeIMG, this.pos.x, this.pos.y, this.r, this.r);
  }

  offScreen() {
    return (this.pos.y > height - this.r);
  }

  disappear() {
    if (snow.length > 500) {
      for (let i = snow.length - 1; i >= 0; i--) {
        if (snow.length % 10 === 1) {
          snow.splice(i, 1);
        }
      }
    }
  }
}