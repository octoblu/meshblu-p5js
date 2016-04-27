var ctracker;
function setup() {
  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.size(400, 300);
  videoInput.position(0, 0);

  // setup canvas
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  noStroke();
}

var prev, current;
function draw() {
  clear();
  var positions = ctracker.getCurrentPosition();
  fill(255, 0, 255);
  if(positions[27] != undefined){
    current = positions[20][1];
    diff = Math.abs(current - prev);
    if(diff >= 1.2 && diff < 1.5){
      console.log('eyebrow_raised');
      ellipse(positions[27][0], positions[27][1], 50, 50);
      ellipse(positions[32][0], positions[32][1], 50, 50);
    }
    prev = current;
    ellipse(positions[27][0], positions[27][1], 10, 10);
    ellipse(positions[32][0], positions[32][1], 10, 10);
  }
}
