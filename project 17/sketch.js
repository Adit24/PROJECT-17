var monkey,monkeyImage,jungle,jungleImage,stone,stoneImage,food,foodImage,ground;
var score;
var foodGroup,obstaclesGroup;
var gameState , PLAY=1,END=0;
var backgroundImage,bg;

function preload(){
  
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  obstacleImage=loadImage("stone.png");
  foodImage=loadImage("banana.png");
  backgroundImage=loadImage("jungle.png");
  
}

function setup() {
  createCanvas(400, 400);
  bg=createSprite(200,200,400,400);
  bg.addImage("back",backgroundImage);
  bg.x=bg.width/2;
  bg.scale=4;
  bg.velocityX=-2;
  monkey = createSprite(50,370,30,30);
  monkey.addAnimation("running",monkeyImage);
  monkey.scale=0.15;
  gameState=PLAY;
  ground = createSprite(200,380,400,20);
  ground.visible=false;
  obstaclesGroup = new Group();
  foodGroup = new Group();
  score=0;
}

function draw() {
  
    background("white");
  
  if(gameState===PLAY){
      if(keyDown("space")){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
    if(bg.x<0){
    bg.x=bg.width/2;
    }
  monkey.collide(ground);
     if(foodGroup.isTouching(monkey)){
    
    score=score+2;
       foodGroup.destroyEach();
    
  }
   switch(score){
    case 0:monkey.scale=0.15;
      break;
      case 10:monkey.scale=0.17;
      break;
      case 20:monkey.scale=0.19;
      break;
  case 30:monkey.scale=0.2;
break;
  
      case 50:monkey.scale=0.25;
      gameState="win";
      break;
      default:break;
  }
    if(obstaclesGroup.isTouching(monkey)){
    
   monkey.scale=0.15;
    
  }
  
   // survivalTime=survivalTime+Math.round(frameRate/60);
   
    
  spwanFood();
  
  spwanObstacles();
    
  }
  else if(gameState===END){
    bg.velocityX=0;
    monkey.velocityY=0;
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
  }
  

  
  drawSprites();
   text("Score:"+score,120,50);
}
function spwanObstacles(){
  if(frameCount%300===0){
  var obstacle = createSprite(400,340,40,40);
  obstacle.addImage("Stone",obstacleImage);
  obstacle.scale=0.2;
  obstacle.velocityX=-8;
  obstacle.lifetime=50;
  obstaclesGroup.add(obstacle);
}

}
function spwanFood(){
  if(frameCount%80===0){
    var food = createSprite(400,340,40,40);
    food.addImage("Banana",foodImage);
    food.velocityX=-8;
    food.y=random(120,200);
    food.scale=0.08;
    food.lifetime=50;
    foodGroup.add(food);
    
  }
}