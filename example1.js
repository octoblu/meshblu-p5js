
var config = {
  "uuid": "f3f0e7ef-f084-441f-a9b6-a4f8ff64ef2b",
  "token": "9409b0922242095f77754d6a24cd0f2f77f1296c"
}
var conn = meshblu.createConnection(config);

conn.on('ready', function(data){
  console.log(data);
  var messageSchema = {
    "type": 'object',
    "properties": {
      "x" : {
        "type" : 'number'
      },
      "y" : {
        "type" : 'number'
      }
    }
  };

  conn.update({
    "uuid": config.uuid,
    "messageSchema": messageSchema
  });

  conn.on('message', function(message){
    var payload = message.payload;
    x = payload.x;
    y = payload.y;
  });
});

var x = 80, y = 80;

function setup() {
  createCanvas(640, 480);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
    conn.message({
      "devices": "*",
      "payload": {
        "mouseX": mouseX,
        "mouseY": mouseY
      }
    });
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, x, y);
}
