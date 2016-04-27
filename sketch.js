
// var config = {
//   "uuid": "f3f0e7ef-f084-441f-a9b6-a4f8ff64ef2b",
//   "token": "9409b0922242095f77754d6a24cd0f2f77f1296c"
// }
// var conn = meshblu.createConnection(config);
//
// conn.on('ready', function(data){
//   console.log(data);
//   var messageSchema = {
//     "type": 'object',
//     "properties": {
//       "x" : {
//         "type" : 'number'
//       },
//       "y" : {
//         "type" : 'number'
//       }
//     }
//   };
//
//   conn.update({
//     "uuid": config.uuid,
//     "messageSchema": messageSchema
//   });
//
//   conn.on('message', function(message){
//     var payload = message.payload;
//     x = payload.x;
//     y = payload.y;
//   });
// });
//
// var x = 80, y = 80;

// fftSize must be at least 32, and a power of 2 (32,64,128,256 etc.)
var fftSize = 32

function setup() {
  createCanvas( windowWidth, windowHeight )

  drums = EDrums('x*xx**xxx*-')
  drums.amp = .75

  bass = FM('bass')
    .note.seq( [7,4,5,3,1,5].rnd(), [1,2,3,3,1,5].rnd())

  rhodes = Synth( 'rhodes', {amp:.35} )
    .chord.seq( Rndi(1,6,3), 1 )
    .fx.add( Delay() )

  fft = FFT( fftSize )

  Gibber.scale.root.seq( ['c4','ac3','bb3'], [4,2,2] )
  Gibber.scale.mode.seq( ['Minor'], [3,2] )

  noStroke()
  colorMode( HSB, 255 )
}

function draw() {
  background( 64 )

  var numBars = fftSize / 2,
      barHeight = ( height - 1 ) / numBars,
      barColor = null,
      value = null

  for( var i = 0; i < numBars; i++ ) {
    barColor = color( ( i / numBars ) * 255, 255, 255 )
    fill( barColor )

    // read FFT value, which ranges from 0-255, and scale it.
    value = ( fft[ i ] / 255 ) * width

    rect( 0, barHeight * i, value, barHeight )
  }
}
