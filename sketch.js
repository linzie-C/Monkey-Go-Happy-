var background, backgroundImg;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0, survivalTime = 0;
var gameOver, reset
var PLAY = 1, END = 0, gameState = PLAY;


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImg = loadImage("backgroundImage.jpg");
  gameOverImg = loadImage("GameOverImg.png");
  resetImage = loadImage("resetImg.png");
}



function setup() {
  createCanvas(800, 700);

  //create background sprite
  background = createSprite(0, 0, 600, 600);
  background.addImage(backgroundImg);
  background.scale = 1;
  background.velocityX = -4;


  //create monkey sprite
  monkey = createSprite(100, 320, 20, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  //create ground sprite
  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.shapeColor = ("BROWN");
  ground.x = ground.width / 2;
  
  //create gameOver and reset sprites
  gameOver = createSprite(400, 300, 50, 50)
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.15
  
  reset = createSprite(400, 400, 50, 50);
  reset.addImage(resetImage);
  reset.scale = 0.4;

  //create groups  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  //make monkey stand on ground
  monkey.collide(ground);
  
if(gameState === PLAY)  {
  
  //make monkey and ground visible
  monkey.visible = true;
  ground.visible = true;
  
  //make gameOver and reset invisible
  gameOver.visible = false;
  reset.visible = false;
  
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  background.velocityX = -3;
  if (background.x < 0) {
    background.x = background.width / 2;
  }

  if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -12;
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8

  //call function
  food();
  obstacles();
  
  if(foodGroup.isTouching(monkey))  {
    score = score + 2;
    
    //make each banana destroy after monkey touches it
    foodGroup.destroyEach(); 
  }
  if(obstacleGroup.isTouching(monkey))  {
      gameState = END;
  }
}

  else if(gameState === END)  {
    //make monkey and ground invisible
    monkey.visible = false;
    ground.visible = false;
    
    // make gameOver and reset visible
    gameOver.visible = true;
    reset.visible = true;
    
    
    
    //make background stop
    background.velocityX = 0;
    
    //destroy each group
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
  
  if(mousePressedOver(reset))  {
    gameState = PLAY;
 }
}
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 700, 50);

  stroke("white");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount / frameRate())
  text("Survival Time: " + survivalTime, 30, 50);
  
}

function food() {
  if (frameCount % 80 === 0) {
    //create banana sprite and spawn at random Y positions
    var banana = createSprite(0, 0, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.x = Math.round(random(300, 600));
    banana.addImage(bananaImage);
    banana.scale = 0.1;


    //give velocity
    banana.velocityX = -3;

    //give lifetime
    banana.lifetime = 200;

    //assign banana to food group
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(0, 0, 10, 10);
    obstacle.y = 330
    obstacle.x = Math.round(random(300, 600));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;

    //give velocity
    obstacle.velocityX = -3;

    //give lifetime
    obstacle.lifetime = 200;

    //assign banana to food group
    obstacleGroup.add(obstacle);
  }
}