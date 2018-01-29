var socket;
var capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  socket = io();
  socket.on('mouse', newDrawing);
  socket.on('chat message', newDrawing);

  socket.on('chat message', function(msg) {
    var angle = 0.3;
    push();
    fill(random(255), random(255), 255);
    translate(random(width / 2), random(height / 2));
    rotate(angle);
    textSize(24);
    text(msg, 0, 0);
    pop();
    angle += 0.1;
  });
}

function newDrawing(data) {
  fill(255, random(255), random(255));
  noStroke();
  ellipse(data.x, data.y, 5, 5);
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
  ellipse(mouseX, mouseY, 5, 5)
}

function draw() {
  background(0, 0, 0, 5);
}