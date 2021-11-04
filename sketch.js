var bg, bgImg
var bottomGround
var topGround
var jones, jonesImg, gameState = 0;
var tree, TreeGrp;
var rock, RockGrp;
var witch, WitchGrp;
var bullet, BulletGrp;
var spell, SpellGrp;
var gameState = 0;
var score=0, lives=3, bLeft=10;
var PotionGrp, potion;
var gameOver, goimg;
var treeImg;
var bGImg;
var potionImg;
var rockImg;
var spellImg;
var bulletImg;

function preload() {
  bgImg = loadImage("assets/SpookyBG.jpg")

  jonesImg = loadAnimation("assets/giphy-0-removebg-preview.png","assets/giphy-1-removebg-preview.png","assets/giphy-2-removebg-preview.png","assets/giphy-3-removebg-preview.png","assets/giphy-4-removebg-preview.png","assets/giphy-5-removebg-preview.png","assets/giphy-6-removebg-preview.png","assets/giphy-7-removebg-preview.png")
  goimg = loadImage('assets/GameOVER.jfif')
  treeImg = loadImage('assets/tree.png');
  bGImg = loadImage('assets/grd4.png');
  potionImg = loadImage('assets/potionImg.png');
  rockImg = loadImage('assets/rock1.png');
  spellImg = loadImage('assets/spell.png');
  witchImg = loadImage('assets/witch.png');
  bulletImg = loadImage('assets/bullet.png');
}

function setup() {

  createCanvas(windowWidth, windowHeight);

  //background image
  /*bg = createSprite(600,375);
  bg.addImage(bgImg);
  bg.scale = 1.9;*/

  //creating top and bottom grounds
  bottomGround = createSprite(800, 500, 2100, 500);
  bottomGround.addImage(bGImg);
  bottomGround.scale = 2;
  bottomGround.visible = true;
  
  bG2 = createSprite(600,700,2100,500);
  bG2.visible = false;


  topGround = createSprite(600, 0, 2000, 20);
  topGround.visible = false;

  //creating balloon     
  jones = createSprite(100, 250, 20, 50);
  jones.debug = false;
  jones.setCollider("circle",0,0,100);
  jones.addAnimation("jones", jonesImg);
  jones.scale = 0.3;

  TreeGrp = new Group();
  RockGrp = new Group();
  WitchGrp = new Group();
  BulletGrp = new Group();
  SpellGrp = new Group();
  PotionGrp = new Group();
}

function draw() {
  

  if (gameState === 1) {
    background("white");
    //making the hot air jones jump
    if (keyDown("space")) {
      jones.velocityY = -6;

    }

    //adding gravity
    jones.velocityY = jones.velocityY + 0.5;



    jones.collide(bG2);

    fill('#654321');
    rectMode(CENTER);
  rect(800,630,2100,300);


    /*if (keyDown("right")) {
      jones.position.x += 3;
    }
    if (keyDown("left")) {
      jones.position.x -= 3;
    }*/

    /*if (jones.isTouching(topGround)) {
      gameState = 1;
      jones.destroy();
    }*/

    if (keyWentDown("right")) {
      bullet = createSprite(jones.x, jones.y, 20, 20);
      bullet.addImage(bulletImg);
      bullet.scale = 0.1;
      bullet.shapeColor = "black";
      bullet.velocityX = 20;
      BulletGrp.add(bullet);
    }

    if (BulletGrp.isTouching(WitchGrp)) {
      for (var i = 0; i < BulletGrp.length; i += 1) {
        for (var j = 0; j < WitchGrp.length; j += 1) {
          if (BulletGrp[i].isTouching(WitchGrp[j])) {
            BulletGrp[i].destroy();
            WitchGrp[j].destroy();
            score+=100;
          }
        }

      }
    }



    

    treeSpawn();
    /*if (TreeGrp.isTouching(jones)) {
      for (var i = 0; i < TreeGrp.length; i += 1) {
        if (TreeGrp[i].isTouching(jones)) {
          TreeGrp[i].destroy();
        }
      }
    }*/

    rockSpawn();
    /*if (RockGrp.isTouching(jones)) {
      for (var i = 0; i < RockGrp.length; i += 1) {
        if (RockGrp[i].isTouching(jones)) {
          RockGrp[i].destroy();
        }
      }
    }*/

    witchSpawn();

    potionSpawn();

    attack(WitchGrp);

    

    drawSprites();

    textSize(25);
    fill("black");
    text("x:" + mouseX + "y:" + mouseY, mouseX, mouseY);

    if(PotionGrp.isTouching(jones)){  
      for(var i = 0; i < PotionGrp.length; i++){
        if(PotionGrp[i].isTouching(jones)){
          PotionGrp[i].destroy();
          score+=50;
        }        
      }
    }

    if(RockGrp.isTouching(jones) || TreeGrp.isTouching(jones) || SpellGrp.isTouching(jones)){
      for(var i = 0; i < RockGrp.length; i++){
        if(RockGrp[i].isTouching(jones)){
          RockGrp[i].destroy();
          lives-=1;
        }
      }
      for(var i = 0; i < TreeGrp.length; i++){
        if(TreeGrp[i].isTouching(jones)){
          TreeGrp[i].destroy();
          lives-=1;
        }
      }
      for(var i = 0; i < SpellGrp.length; i++){
        if(SpellGrp[i].isTouching(jones)){
          SpellGrp[i].destroy();
          lives-=1;
        }
      }

    }

    textSize(35);
    text("Score: "+score,250,650);
    text("Lives: "+lives,1200,650);

    if(lives===0){
      TreeGrp.destroyEach();
    RockGrp.destroyEach();
    WitchGrp.destroyEach();
    SpellGrp.destroyEach();
    PotionGrp.destroyEach();
    jones.destroy();
    bottomGround.destroy();
      gameState=2;

    }



  }
  else if(gameState===0){
    background(bgImg);
    fill("black");
    stroke("white");
    rect(windowWidth-500,200,400,400);
    fill("white");
    noStroke();
    textSize(35);
    textFont("Edwardian Script ITC");
    text("Hello World",windowWidth-370,250);
    text("Welcome to the game!\n Run Jones Run!", windowWidth-420,280);
    text("Press Enter to Start",windowWidth-420,360);
    text("Use Right arrow key to shoot", windowWidth-450,400);
    text("Use SpaceBar to jump",windowWidth-420,440);
    text("You have only 3 lives",windowWidth-420,480);
    textSize(45);
    textFont("Algerian");
    text("ENJOY!",windowWidth-380,550);

    if(keyDown("enter")){
      gameState=1;
    }   
  }
  else{
    background("white");
    
    gameOver = createSprite(windowWidth/2,windowHeight/2,windowWidth, windowHeight);
    gameOver.scale = 3;
    gameOver.addImage(goimg);
    drawSprites();    
  }

}

function treeSpawn() {
  if (frameCount % 120 === 0) {
    tree = createSprite(windowWidth + 20, 410, 20, 40);
    tree.addImage(treeImg);
    tree.scale = 0.5;
    tree.velocityX = -5;
    tree.shapeColor = "red";
    tree.lifetime = 350;
    tree.debug = false;
    TreeGrp.add(tree);
  }
}

function rockSpawn() {
  if (frameCount % 200 === 0) {
    rock = createSprite(windowWidth + 20, 430, 20, 40);
    rock.addImage(rockImg);
    rock.scale = 0.2;
    rock.velocityX = -9;
    rock.shapeColor = "blue";
    rock.lifetime = 200;
    rock.debug = false;
    RockGrp.add(rock);
  }
}

function witchSpawn() {
  if (frameCount % 150 === 0) {
    witch = createSprite(windowWidth + 20, Math.round(random(100, 330)), 20, 40);
    witch.addImage(witchImg);
    witch.scale = 0.2;
    witch.velocityX = -8;
    witch.shapeColor = "green";
    witch.lifetime = 270;
    witch.debug = false;
    WitchGrp.add(witch);
  }
}

function attack(WitchGrp) {
  for (var i = 0; i < WitchGrp.length; i += 1) {
    if (frameCount % 150 === 0) {
      spell = createSprite(WitchGrp[i].x, WitchGrp[i].y, 10, 10);
      spell.addImage(spellImg);
      spell.scale = 0.2;
      spell.velocityX = -15;
      spell.shapeColor = "yellow";
      SpellGrp.add(spell);
    }
  }
}

function potionSpawn(){
  if (frameCount % 80 === 0) {
    potion = createSprite(windowWidth + 20, 430, 20, 40);
    potion.addImage(potionImg);
    potion.scale = 0.2;
    potion.velocityX = -13;
    potion.shapeColor = "orange";
    potion.lifetime = 200;
    potion.debug = false;
    PotionGrp.add(potion);
  }
}
