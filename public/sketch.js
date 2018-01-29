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
    fill(random(255), random(255), 255);
    translate(random(50, width - 50), random(50, height - 50));
    rotate(random(-1, 1));
    textSize(24);
    text(msg, 0, 0);
    pop();
  });
}

function newDrawing(data) {
  fill(255, random(255), random(255));
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
  fill(random(255), random(255), 255);
  noStroke();
  ellipse(mouseX, mouseY, 15, 15)
}

function draw() {
  background(0, 0, 0, 1);
}