var player, playerImg;
var enemy, enemyImg;
var stars, starsImg;
var rocks, rocksImg;
var background, bgImg;

var rockGroup;
var EnemyshipGroup;

var gameState="PLAY"

var score;

var restart, restartImg;


function preload() {

playerImg = loadImage("player spaceship.gif");
enemyImg = loadImage("enemy spaceship.gif");
rocksImg = loadImage("stone.png");
bgImg = loadImage("spacebg.png");
restartImg = loadImage("restart.png");
}




function setup() 
{ 
  createCanvas(windowWidth, windowHeight);

  player = createSprite(300, 100, 25, 25);
  player.addImage(playerImg);
  player.scale = 0.2;

  restart = createSprite(width/2, height/2);
  restart.addImage(restartImg);
  restart.scale = 0.2;

  rockGroup = createGroup();
  EnemyshipGroup = createGroup();

  score = 0;
  
}

function draw() 
{
background(bgImg);

text("Score: " + score, 60, 55);

if (gameState === "PLAY") {

player.x = mouseX;
player.y = mouseY;
createRocks();
createEnemyShips();

score = score + Math.round(frameCount/60);

restart.visible = false;

if (EnemyshipGroup.isTouching(player) || rockGroup.isTouching(player)) {
  gameState = "END";
}

}

else if(gameState === "END") {
  player.x = 0;
  player.y = 0;

  EnemyshipGroup.destroyEach();
  rockGroup.destroyEach();

  restart.visible = true;

  if(mousePressedOver(restart)) {
    reset();
  }

}






drawSprites();

}

function reset() {
  gameState = "PLAY";
  score = 0;
}

function createEnemyShips() {

if(frameCount % 70 === 0) {
  enemy = createSprite(100, 120, 25, 25);
  enemy.addImage(enemyImg);
  enemy.scale = 0.2;
  enemy.x = Math.round(random(15, width-200));
  enemy.velocityY = 5;

  EnemyshipGroup.add(enemy);
}

}

function createRocks() {

if(frameCount % 60 === 0) {
  rocks = createSprite(200, 150, 25, 25);
  rocks.addImage(rocksImg);
  rocks.scale = 0.2;
  rocks.x = Math.round(random(15, width-200));
  rocks.velocityY = 6;

  rockGroup.add(rocks);
}

}



