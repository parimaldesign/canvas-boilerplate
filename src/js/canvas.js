import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

var gravity = 1;
var friction = 0.8;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Ball {
  constructor(x, y,dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dy = dy
    this.dx = dx
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke()
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height){
      this.dy = -this.dy * friction;
    } else{
      this.dy += gravity;
    }
    
    if((this.x + this.radius + this.dx > canvas.width) || (this.x + this.radius + this.dx < 0 + (this.radius*2))){
      this.dx = -this.dx * friction;
    }

    this.y += this.dy;
    this.x += this.dx;
    this.draw()
  }
}

// Implementation
let balls;
//var ball;
function init() {

  //ball = new Ball(canvas.width/2,canvas.height/2,2,30,'#fff',1)
  balls = []

  for (let i = 0; i < 50; i++) {
    let radius = randomIntFromRange(15,50);
    let x = randomIntFromRange(radius,canvas.width-radius);
    let y = randomIntFromRange(radius,canvas.height-radius);
    //friction = randomIntFromRange(0.1,5);
    let dx = randomIntFromRange(-2,2)
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let col = `rgba(${r},${g},${b},1)`;
    let color = randomColor(colors);
    // balls.push(new Ball(x,y,dx,friction,radius,col))
    balls.push(new Ball(x,y,dx,friction,radius,color))
  }
  console.log(balls)
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
    
  //ball.update();
  balls.forEach(ball => {
    ball.update()
  })
}

init()
animate()


addEventListener("click",function(){
  init()
})