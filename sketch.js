let settings = {

  rotateX: 60,
  rotateY: 0,
  rotateZ: 360,
  blockWidth: 30,
  positiveHeight: 200,
  negativeHeight: -100,
  sX: 1.5,
  sY: 1.5,
  sZ: 2,
  red: 255,
  green: 18,
  blue: 0,
  animateColors: false,
  animateRotate: false,

}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noiseDetail(1);

  gui = new dat.GUI();
  gui.add(settings, 'blockWidth', 10, 80).name("Block Size")
  gui.add(settings, 'sX', 0.1, 2.0).name("Scale X")
  gui.add(settings, 'sY', 0.1, 2.0).name("Scale Y")
  gui.add(settings, 'sZ', 0.1, 2.0).name("Scale Z")
  gui.add(settings, 'rotateX', 0, 360).name("RotateX")
  gui.add(settings, 'rotateY', 0, 360).name("RotateY")
  gui.add(settings, 'rotateZ', 0, 360).name("RotateZ")
 
  gui.add(settings, 'positiveHeight', 10, 400).name("Positive Height")
  gui.add(settings, 'negativeHeight', -400, -10).name("Negative Height")

  gui.add(settings, 'red', 0, 255).name("Red")
  gui.add(settings, 'green', 0, 255).name("Green")
  gui.add(settings, 'blue', 0, 255).name("Blue")
  gui.add(settings, 'animateColors', true, false).name("Animate Colors")
  // gui.add(settings, 'animateRotate', true, false).name("Animate Rotate")

 
  
  gui.width = 300;
  gui.close();
  gui.remember(settings);


}

function canvasResized() {
  background(30, 30, 30);
  resizeCanvas(windowWidth, windowHeight. WEBGL);
  setup()

}


function draw() {
  background(30, 30, 30);
  translate(0,0, -400);
  // if (animateRotate == false) {


    rotateX(settings.rotateX);
    rotateZ(settings.rotateZ)
    rotateY(settings.rotateY);
  
  //  }  else {  
  //   rotateZ(frameCount * 0.25);
  //   rotateX(map(cos(frameCount * 0.25), -1, 1, 30, -30));
  //   rotateY(map(sin(frameCount * 0.25), -1, 1, -30, 30));
  //  }
   
  
 
  scale(settings.sX, settings.sY, settings.sZ);
 

// noStroke()  

 




  directionalLight([255], createVector(0, 0, -1));
  directionalLight([255], createVector(0, 0, -1));


  var w = settings.blockWidth;
  var start = frameCount / 100;

  var xoff = 0;

  for(var x = -width/2; x < width/2; x += w) {
    yoff = 0;
    for(var y = -height/2; y < height/2; y += w) {
      
      var h =map(noise(xoff + start, yoff + start), 0, 1, settings.negativeHeight, settings.positiveHeight);
      
      
if (settings.animateColors) {
  var r = map(x, -width/2, width/2, 0, 255);
  var g = map(y, -height/2, height/2, 255, 0);
  var b = map(h, -100, 100, 0, 255);
} else {
      var r = settings.red;
      var g = settings.green;
      var b = settings.blue;
}
      
      push();
      fill(r, g, b);
      translate(x, y, -h);
      box(w, w, h);
      pop();

      yoff += 0.1;
    }
    xoff += 0.1;
  }
}
