var dog,dogIMG;
var treat,treatIMG,treatGroup;
var obstacle,obstacleIMG,obstacleGroup;
var bg,bgIMG;
var gameoverIMG;
var ground;
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload()
{
  dogIMG = loadImage("Dog.png");
  treatIMG = loadImage("DogTreat.png");
  obstacleIMG = loadImage("Log.png");
  bgIMG = loadImage("bg.png");
  gameoverIMG = loadImage("gameOver.png");

	
}

function setup() {

  createCanvas(displayWidth, displayHeight);
  
  bg = createSprite(1000,475,900,200);
  bg.addImage("bg.png",bgIMG);
  bg.scale = 4.5;
  bg.velocityX = -2;
  bg.x = bg.width/2;
  
  
  dog = createSprite(100,970,20,50);
  dog.addImage("Dog.png",dogIMG);
  dog.scale = 0.27;
  dog.setCollider("circle",0,0,125);

  
  
  
  ground = createSprite(400,975,1000,10);
  ground.velocityX = -4;
  ground.visible = false;
  

  treatGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  
  background(186,223,243);

  dog.collide(ground);

  if(gameState === PLAY){
    
  if(bg.x<200){
    bg.x = bg.width/2;
  }
  
   
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  if(keyDown("space")){
      dog.velocityY = -20 ;
    }
    
  dog.velocityY = dog.velocityY + 0.8;

  treats();
  
  obstacles();
    
  
  
  if(treatGroup.isTouching(dog)){
    treatGroup.destroyEach();
    score = score + 2;
 }
 
 textSize(60);
 fill("black");
 text("Score: "+score,1100,200);

 if(obstacleGroup.isTouching(dog)){
   gameState = END;
 }

}
 
 if(gameState === END) {
    
    dog.velocityX = 0;
    dog.velocityY = 0;
    ground.velocityX = 0;
    bg.velocityX = 0;  
    
    treatGroup.destroyEach();
    obstacleGroup.destroyEach();
        
    treatGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    treatGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(0);
    
    var gameOver = createSprite(750,500,200,200);
    gameOver.addImage("gameOver.png",gameoverIMG);

    
    
  }
  

  
  
  drawSprites();  
 
 
  
  
}

function treats(){
  if(World.frameCount % 200 === 0){
      var treat = createSprite(1500,200,20,20);
      
      treat.y = random(550,650);
      
      treat.addImage("DogTreat.png",treatIMG);
      treat.scale = 0.15;
      
      treat.velocityX = -6;
      
      treat.lifetime = 1500;                                                 
      
      treatGroup.add(treat);    
    
  }
}

function obstacles(){
  if (World.frameCount % 500 === 0) {
      var obstacle = createSprite(1500,975,20,20);
      
      obstacle.addImage("Log.png",obstacleIMG);
      obstacle.scale = 0.7; 
      
      obstacle.velocityX = -5;
      
      obstacle.lifetime = 1500;                                                 
      
      obstacleGroup.add(obstacle);
    
  }
}





