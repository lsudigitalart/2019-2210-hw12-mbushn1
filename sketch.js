let x , y
let speed = 0.3;
const NUMBOXES = 40;
const NUMBALLS = 30
let gravity=0.001;
let boxes = [];
let balls = [];
let score = 0
let myFont;
let bg = 0
fontSize=32;
let t = 0;
var r=0;
var g=0;
var b=0;
var interval = .09999

function preload() {
  myFont = loadFont('lucon.ttf');
  bg = loadImage('vapor.jpg');
}

function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth,windowHeight,WEBGL);
  
  textFont(myFont);
  textSize(100);
  textAlign(CENTER, CENTER);
  
  for(let boxNum = 1; boxNum<=NUMBOXES; boxNum+=1){
    boxes.push(new fallingBox())
  }

  for(let ballNum = 1; ballNum<=NUMBALLS; ballNum+=1){
    balls.push(new fallingBall())
  }
  frameRate(120);

  

  
}


function draw() {
  background("grey");

  image(bg,-810,-485, windowWidth,windowHeight);
  
  ambientLight(70, 70);
  directionalLight(300, 225, 500, windowWidth/2, windowHeight/2, 5);
  pointLight(255, 255, 255, 0, 0, 100);
  smooth();
 
  for(let fbox of boxes){
    fbox.move()
    fbox.drawBox()
    if (mouseY-480 > fbox.y- 65 && mouseY-480 < (fbox.y+ 65)) {
      if (mouseX-810 > fbox.x- 65 && mouseX-810 < (fbox.x+ 65 )) {
        fbox.col="lightGreen"
        if (fbox.score == true){
          score+=1
          fbox.score = false
        }
      }
    }
  }
  for(let fball of balls){
    fball.move()
    fball.drawBox()
    if (mouseY-480 > fball.y- 65 && mouseY-480 < (fball.y+ 65)) {
      if (mouseX-810 > fball.x- 65 && mouseX-810 < (fball.x+ 65 )) {
        fball.col="red"
        if (fball.score == true){
          score-=1
          fball.score = false
        }
      }
    }
  }

  if(score>=20){
    background("lightGreen");
    text("you win!",0,0)
  }

  textAlign(CENTER);
  fill("white");
  text(score,-700,-410)




  if(t % (3*interval) < interval){ //red
      r = (t % interval)/interval * 256
  }
  else if(t % (3*interval) < 2*interval){ //green
     g = (t % interval)/interval * 256
  }
  else if(t % (3*interval) < 3*interval){ //blue
     b = (t % interval)/interval * 256
  }

  t = t + 0.001;

  translate(mouseX-810,mouseY-480);
  fill(r,g,b);
  sphere(50);
  

}

class fallingBox{
  constructor(){
    this.x = random(-800,800)
    this.y = -550.9 - random(200)
    this.yVel = 0
    this.rotation = 0
    this.gravity = random(.06)
    this.rotationSpeed = random(.02)
    this.col = "hotPink";
    this.score = true
  }

  move(){
    this.y -= this.yVel
    this.yVel -= this.gravity
    this.rotation += this.rotationSpeed


  }

  drawBox(){
    push(); 
    translate(this.x, this.y)
    rotateX(this.rotation);
    rotateY(this.rotation);
    rotateZ(this.rotation);
    ambientMaterial(250);
    fill(this.col);
    box(50,50,50);
    pop();
  }
  
}
class fallingBall{
  constructor(){
    this.x = random(-800,800)
    this.y = -550.9 - random(200)
    this.yVel = 0
    this.rotation = 0
    this.gravity = random(.06)
    this.rotationSpeed = random(.02)
    this.col = "white";
    this.score = true
  }

  move(){
    this.y -= this.yVel
    this.yVel -= this.gravity
    this.rotation += this.rotationSpeed


  }

  drawBox(){
    push(); 
    translate(this.x, this.y)
    rotateX(this.rotation);
    rotateY(this.rotation);
    rotateZ(this.rotation);
    ambientMaterial(250);
    fill(this.col);
    sphere(30,24);
    pop();
  }
  
}
  
