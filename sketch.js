var cemiterio;
var cacador1, cacador2;
var coracao;
var grave;
var player
var zombieimg
var zombie
var zombies
var heart1img, heart2img, heart3img
var heart1, heart2, heart3
var life = 3;
var bullet
var bullets = 75
var bulletsbox
var score = 0
var explosion
var win
var lose
var gameState = "play"
 
function preload() {
  cemiterio = loadImage("assets/bg.jpeg");
  cacador1 = loadImage("assets/shooter_2.png");
  cacador2 = loadImage("assets/shooter_3.png");
  zombieimg = loadImage("assets/zombie.png");
  heart1img = loadImage("assets/heart_1.png");
  heart2img = loadImage("assets/heart_2.png");
  heart3img = loadImage("assets/heart_3.png");
  explosion = loadSound("assets/explosion.mp3");
  win = loadSound("assets/win.mp3");
  lose = loadSound("assets/lose.mp3");
}
 
function setup(){
  createCanvas(windowWidth, windowHeight);
  grave = createSprite(displayWidth/2, displayHeight/2, 200, 200);
  grave.addImage(cemiterio);
  grave.scale = 1.5
 
  player = createSprite(displayWidth -1450, displayHeight -300, 50, 50);
  player.addImage(cacador1);
  player.scale = 0.7
  player.debug = true
  player.setCollider("rectangle", 0, 0, 250, 300)
 
  heart1 = createSprite(displayWidth - 250, 40, 20, 20);
  heart1.visible = false
  heart1.addImage("coracao1", heart1img);
  heart1.scale = 0.4;
 
  heart2 = createSprite(displayWidth - 250, 40, 20, 20);
  heart2.visible = false
  heart2.addImage("coracao2", heart2img);
  heart2.scale = 0.4;
 
  heart3 = createSprite(displayWidth - 250, 40, 20, 20);
  heart3.visible = true
  heart3.addImage("coracao3", heart3img);
  heart3.scale = 0.4;
 
 
  zombies = new Group();
  bulletsbox = new Group();
 
}
 
function draw(){
  background(0)
  if(gameState === "play"){
  if(life === 3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }
  if(life === 2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }
  if(life === 1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }
 
  if(life === 0){
    gameState = "lost"
    lose.play()
  }
 
  if(score === 100){
    gameState = "katsu"
    win.play()
  }

  if(bullets === 0){
    gameState = "bullets"
  }
 
if(keyWentDown("space")){
  bullet = createSprite(displayWidth - 1450, player.y - 30, 20, 10);
  bullet.velocityX = 65
  bulletsbox.add(bullet);
  player.deapth = bullet.deapth;
  player.deapth = player.deapth + 2;
  bullets = bullets -1
 
  player.addImage(cacador2);
 
 
} else if(keyWentUp("space")){
  player.addImage(cacador1);  
}
 

 
if(keyDown(UP_ARROW)){
    player.y = player.y - 30
}
 
if(keyDown(DOWN_ARROW)){
    player.y = player.y + 30
}
 
if(zombies.isTouching(bulletsbox)){
  for(var i = 0; i<zombies.length; i++){
    if(zombies[i].isTouching(bulletsbox)){
      zombies[i].destroy();
      bulletsbox.destroyEach();
      score = score +2;
      explosion.play()
    }
  }
}
 
 spawnZombies()
 
 
  if(zombies.isTouching(player)){
    for(var i = 0; i<zombies.length; i++){
      if(zombies[i].isTouching(player)){
        zombies[i].destroy();
        life = life -1;
      }
    }
  }
 
}
 
drawSprites();
 
textSize(20);
fill("white");
text("balas = " + bullets, displayWidth - 210, displayHeight/2 - 450)
text("pontuação = " + score, displayWidth - 250, displayHeight/2 - 430)
text("vidas = " + life, displayWidth - 200, displayHeight/2 - 410)
 
if(gameState == "lost"){
  textSize(100)
  fill("white")
  text("vc perdeu o jogo", 250, 250)
  zombies.destroyEach()
  player.destroy()
  heart1.visible = false
}
else if(gameState == "katsu"){
  textSize(100)
  fill("white")
  text("vc sobreviveu ao apocalipse Parabéns!", 80, 400)
  zombies.destroyEach()
  player.destroy()
}
else if(gameState == "bullets"){
  textSize(100)
  fill("white")
  text("vc perdeu o jogo porque não há balas", 40, 400)
  zombies.destroyEach()
  player.destroy()
  bullets.destroyEach()
  heart1.visible = false
}
 
 
}
 
function spawnZombies()
{
  if(frameCount%70 == 0){
    zombie = createSprite(random(1400,1810),random(100,500), 40, 40);
    zombie.addImage(zombieimg);
    zombie.scale = 0.3
    zombie.velocityX = -10
    zombies.add(zombie);
    zombie.debug = true
    zombie.setCollider("rectangle", 0, 0, 200, 200)
    zombie.lifeTime = 450
  }
 
}
