var socket;
var capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  socket = io();
  socket.on('mouse', newDrawing);
  socket.on('chat message', newDrawing);

  socket.on('chat message', function(msg) {
    for (var i = 0; i < random(2, 5); i++) {
      push();
      fill(random(155), random(255), 255);
      translate(random(width / 4, (width / 4) * 3), random(height / 4, (width / 4) * 3));
      rotate(random(-3, 3));
      textSize(30);
      text(msg, 0, 0);
      pop();
      fill(0, 0, 0, 50);
      rect(0, 0, width, height);
    }
  });

}

function newDrawing(data) {
  fill(155 + noise(mouseX, mouseY) * 100, 186, random(10, 50));
  noStroke();
  rect(data.x, data.y, 5, 5);

  fill(0, 0, 0, 3);
  rect(0, 0, width, height);
}

function mouseDragged() {
  //console.log('sending: ' + mouseX + ', ' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }
  // name the message 'mouse'
  socket.emit('mouse', data);
  fill(random(10, 50), 186, 155 + noise(mouseX, mouseY) * 100);
  noStroke();
  ellipse(mouseX, mouseY, 5, 5);
  fill(0, 0, 0, 3);
  rect(0, 0, width, height);
}

function draw() {}