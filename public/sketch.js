var socket;

let snow = [];
let gravity;
var loc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  socket = io();
  gravity = createVector(0, 0.0005);

  loadJSON("http://ip-api.com/json", gotData, 'jsonp');

  function gotData(data) {
    locationData = data;
    loc = locationData.city;
    //console.log(locationData.city);
  }

  socket.on('mouse', newDrawing);
  socket.on('chat message', newDrawing);

  socket.on('chat message', function(msg) {
    for (var i = 0; i < random(2, 6); i++) {
      push();
      fill(random(255), 255, random(255));
      translate(round(random(width / 2)), round(random(height / 2)));
      rotate(random(-1, 1));
      textFont('Ubuntu Mono');
      textSize(20);
      text('someone from ' + loc + ': \n' + msg, 0, 0);
      pop();
      fill(0, 0, 0, 53);
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

function draw() {
  background(0, 0, 0, 3);
  snow.push(new Snowflake());

  for (flake of snow) {
    flake.applyForce(gravity);
    flake.render();
    flake.update();
    flake.pileUp();
  }
}