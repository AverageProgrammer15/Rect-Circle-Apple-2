x = 0;
y = 0;

draw_apple = "";
draw_circle = "";
draw_rectangle = "";
content = null
to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

to_number = Number(content);
screen_height = 0;
screen_width = 0;


round = "circle.png"
rect = "rectangle.png"
Apple = "apple.png"


function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height-150);
  canvas.center()
  console.log("Canvas created and loaded. Data: width-",screen_width,";height:",screen_height-150);
  background(220);



};

function preload(){
  apple = loadImage("apple.png");
  round = loadImage("circle.png");
  rect = loadImage("rectangle.png");

  if (apple && round && rect){
    console.log("All images have been loaded")
  }

  if (document.getElementById("p5_loading")){
    console.error("Canvas might not load!!")
  }
}



function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  

 content = event.results[0][0].transcript.toLowerCase();

 console.log("Recieved:", content)

 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

 if (content == "circle"){
  draw_circle = "set";
 } else if (content == "rectangle"){
  draw_rectangle = "set";
 } else if (content == "apple"){
  draw_apple = "set";
 }

console.log(draw_circle, draw_rectangle, draw_apple)

}



function draw(){
  if (to_number <= 0) {
    console.log("Invalid number of objects to draw");
    return;
  }

  for (let i = 0; i < to_number; i++) {
    let Rng = Math.floor(Math.random() * 10); // Random value between 0 and 9
    let x = Rng * 700;
    let y = Rng * 400;

    if(draw_apple == "set") {
      image(apple, x, y, 50, 50);
      speak_data = "Drawn an apple";
    } else if(draw_circle == "set") {
      image(round, x, y, 50, 50);
      speak_data = "Drawn a circle";
    } else if(draw_rectangle == "set") {
      image(rect, x, y, 50, 50);
      speak_data = "Drawn a rectangle";
    }
    
    speak(); // Speak the message after each drawing
  }
}

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    console.log("Speaking:", speak_data);
    synth.speak(utterThis);
    speak_data = "";
}

