
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
      },
      "z" : {
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
    z = payload.z;
  });
});

var x = 0, y = 0, z = 0;

function setup() {
  createCanvas(640, 480, WEBGL);
}

function draw() {
  background(0);
  rotateX(radians(x));
  rotateY(radians(y));
  rotateZ(radians(z));
  stroke(255);
  noFill();
  box(200);
}
