var PLAY = 1;
var END = 0;
var gameState = PLAY;
var man, manAnimation, background, backgroundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacle1Img, obstacle2Img, obstacle3Img, obstacle4Img, obstacle5Img, obstacle6Img;

var score=0;

function preload(){
manAnimation = loadAnimation("Images/running_man1.png", "Images/running_man2.png");
backgroundImage = loadImage("Images/trackImage.jpg");
obstacle1Img = loadImage("Images/obstacleImage.png");
obstacle2Img = loadImage("Images/obstacleImage.png");
obstacle3Img = loadImage("Images/obstacleImage.png");
obstacle4Img = loadImage("Images/obstacleImage.png");
obstacle5Img = loadImage("Images/obstacleImage.png");
obstacle6Img = loadImage("Images/obstacleImage.png");
}

function setup() {
  createCanvas(1000, 600);
  man = createSprite(400, 450, 100, 100);
  man.addAnimation("running", manAnimation);

  obstacle1 = createSprite(400, 450, 50, 50);
  obstacle1.addImage(obstacle1Img);
  
  obstacle2 = createSprite(390, 410, 50, 50);
  obstacle2.addImage(obstacle2Img);
  
  obstacle3 = createSprite(520, 520, 50, 50);
  obstacle3.addImage(obstacle3Img);
  
  obstacle4 = createSprite(490, 490, 50, 50);
  obstacle4.addImage(obstacle4Img);
 
  obstacle5 = createSprite(450, 475, 50, 50);
  obstacle5.addImage(obstacle5Img);
 
  obstacle6 = createSprite(550, 533, 50, 50);
  obstacle6.addImage(obstacle6Img);

  obstaclesGroup = createGroup();
  obstaclesGroup.add(obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6);
}

function draw() {
  background(backgroundImage); 
  fill("red");
  textSize(60); 
  text("Score: "+ score, 500,70);
  
  man.scale = 0.7;
  obstacle1.scale = 0.3;
  obstacle2.scale = 0.1;
  obstacle3.scale = 0.5;
  obstacle4.scale = 0.7;
  obstacle5.scale = 0.9;
  obstacle6.scale = 1.1;

  if(gameState === PLAY){
    man.velocityX = 12;
    score += 1;
  }

//jump when the space key is pressed
  if(keyDown(UP_ARROW)&& man.y >= 100) {
    man.velocityY = -12;
   
   }

  if(background.x<0){
   background.x = background.x/2;

  }

 if(man.isTouching === obstaclesGroup){
    man.velocityX = 0;
    obstaclesGroup.velocityX =0;
    fill("red");
    textSize(24);
    text("Game is over! Press Space Key to restart.");
    gameState = END;
  }

  if(gameState === END){
    man.velocityX = 12;
    background.width = background.width/2;
    gameState = PLAY;
  }
  obstaclesGroup.setLifetimeEach(-1);
  obstaclesGroup.setVelocityXEach(7);
   
  spawnObstacles();
  drawSprites();
}


function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = (6 + score/100);
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1Img);
        break;
       case 2: obstacle.addImage(obstacle2Img);
        break;
       case 3: obstacle.addImage(obstacle3Img);
        break;
       case 4: obstacle.addImage(obstacle4Img);
        break;
       case 5: obstacle.addImage(obstacle5Img);
         break;
       case 6: obstacle.addImage(obstacle6Img);
         break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
 }