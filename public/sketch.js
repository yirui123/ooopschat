var socket;
var capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  socket = io();
  socket.on('mouse', newDrawing);
  socket.on('chat message', newDrawing);

  socket.on('chat message', function(msg) {
    push();
    fill(random(155), random(255), 255);
    translate(random(width / 4, (width / 4) * 3), random(height / 4, (width / 4) * 3));
    rotate(random(-2, 2));
    textSize(30);
    text(msg, 0, 0);
    pop();
  });
}

function newDrawing(data) {
  fill(155 + noise(mouseX, mouseY) * 100, 186, random(10, 50), 155);
  noStroke();
  rect(data.x, data.y, 15, 15);
}

function mouseDragged() {
  console.log('sending: ' + mouseX + ', ' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }
  // name the message 'mouse'
  socket.emit('mouse', data);
  fill(random(10, 50), 186, 155 + noise(mouseX, mouseY) * 100, 155);
  noStroke();
  ellipse(mouseX, mouseY, 15, 15)
}

function draw() {
  background(0, 0, 0, 2);
}