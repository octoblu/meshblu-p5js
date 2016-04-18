# meshblu-p5js

Using p5.js with the [Meshblu](https://meshblu.readme.io) client-side javascript library

Include the p5.js and Meshblu library in your header along with the "sketch"

```html
<script language="javascript" type="text/javascript" src="libraries/p5.js"></script>
<script src="https://cdn.octoblu.com/js/meshblu/latest/meshblu.bundle.js"></script>
<script language="javascript" type="text/javascript" src="sketch.js"></script>
```


Use [meshblu-util](https://www.npmjs.com/package/meshblu-util) or [Octoblu](http://app.octoblu.com)
to generate a UUID/TOKEN

Create Connection
```js

var config = {
  "uuid": "YOUR-DEVICE-UUID",
  "token": "YOUR-DEVICE-TOKEN"
}
var conn = meshblu.createConnection(config);
```

On ready we update the device with a schemaform.io messageSchema which allows us
to define the UI within the Octoblu flow designer. Then we handle messages.
```js

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
}); // close OnReady

```

These are the variables we set onMessage so that the draw loop will update to them on each cycle.
```js
var x = 80, y = 80;
```

Our p5.js setup function. We define the canvas.
```js
function setup() {
  createCanvas(640, 480);
}
```

Draw loop where all the magic happens. We use conn.message to send a broadcast to all devices when we click.
```js
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

```
