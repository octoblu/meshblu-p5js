
var config = {
  "uuid": "9fbcafbc-804c-4c5f-926d-3746e6f85558",
  "token": "2310e7998eac9c8808bab2cebc1189094958ba99"
}
var conn = meshblu.createConnection(config);

conn.on('ready', function(data){
  console.log(data);
  var messageSchema = {
    "type": 'object',
    "properties": {
      "note" : {
        "type" : 'number'
      },
      "velocity" : {
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
    if(payload.noteOn){
      playNote(payload.noteOn.note, 200);
      console.log(payload.noteOn.note);
    }
  });

});

var osc;

function setup() {
  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    console.log('slow');
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {
}
