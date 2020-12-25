var gamestate = 0;
var john,introscreen,beachsprite,beach_background,johnimage,portal_1,underwater,swimming,swimmingleft,netsprite,netimage,netrightimage;
var turtle_animation, turtlesprite, cruiseship, cruiseimage,cruise2image,cruise3image,trash,trashimage,shipgroup,rock,rock2,rock3,rockimage;
var coin,coinimage

var sea_urchin,sea_urchin_img,sea_urchin2,score

score = 0;

function preload()
{
introscreen = loadImage("images/introturtle.jpg");
//cruiseship image
cruiseimage = loadImage("images/cruiseship.png");	
cruise2image = loadImage("images/cruiseship2.png");
cruise3image = loadImage("images/cruiseship3.png");		 
trashimage = loadImage("images/garbage.png");
coinimage = loadImage("images/timecoin.png")
beachsprite = loadImage("images/beachbackground.jpg");
johnimage = loadAnimation("images/scubaboybeach.png");
sea_urchin_img = loadImage("images/seaurchin.png")
netimage = loadImage("images/net_left.png")
netrightimage = loadImage("images/net_right.png")
swimming = loadAnimation("images/scuba1.png","images/scuba2.png","images/scuba3.png","images/scuba4.png","images/scuba5.png" )
swimmingleft = loadAnimation("images/flipscuba1.png","images/flipscuba2.png","images/flipscuba3.png","images/flipscuba4.png","images/flipscuba5.png" )
rockimage = loadImage("images/rock.png");
//turtle animation
turtle_animation = loadAnimation("images/turtle1.png", "images/turtle2.png", "images/turtle3.png", "images/turtle4.png")

underwater = loadImage("images/underwater.jpg")


}

function setup() {
	createCanvas(displayWidth,displayHeight);
	background(200);

  beach_background = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
  beach_background.addImage(beachsprite)
  beach_background.scale = 1.2
  beach_background.visible = false; 
  john = createSprite(700,500,50,120);
  john.addAnimation("standing",johnimage)
  john.addAnimation("swimming",swimming)
  john.addAnimation("swimmingleft",swimmingleft)
  
  //make the ship group
 shipgroup = new Group();
 
  //turtle sprite
  turtlesprite = createSprite(displayWidth,500,70,40);
  turtlesprite.addAnimation("turtle_animation",turtle_animation)

  //create the net sprite to assign the net variable to it. 
  netsprite = createSprite(john.x+30,john.y,50,20);
  netsprite.addImage(netimage)

  rock = createSprite(displayWidth/4,displayHeight/1.2,20,150);
  rock.addImage(rockimage)
  rock.scale = 3
  rock.visible = false;

  rock2 = createSprite(displayWidth/1.2,displayHeight/1.2,30,100);
  rock2.addImage(rockimage)
  rock2.scale = 2
  rock2.visible = false;

  rock3 = createSprite(displayWidth/2,displayHeight/1.2,30,170);
  rock3.addImage(rockimage)
  rock3.scale = 4
  rock3.visible = false;

  coin = createSprite(displayWidth/3,displayHeight - 100,50,50)
  coin.addImage(coinimage)
  coin.scale = 0.2
  coin.visible = false;

  john.scale = 0.35
  john.visible=false;
  netsprite.visible = false;
  portal_1 = createSprite(displayWidth/2 + displayWidth/3, displayHeight-400,30,200)
  portal_1.visible = false;
  turtlesprite.visible = false;
  
  sea_urchin = createSprite(displayWidth/8,displayHeight-60,20,20);
  sea_urchin.addImage(sea_urchin_img)
  sea_urchin.scale = 0.8
  sea_urchin.visible = false;

  sea_urchin2 = createSprite(displayWidth/1.5,displayHeight/2,20,20);
  sea_urchin2.addImage(sea_urchin_img)
  sea_urchin2.scale = 0.8
  sea_urchin2.visible = false;


	//Create the Bodies Here.

  
}


let s = 'This game was created to bring awareness about ocean pollution. In this game, you will have to use arrow keys \n to move up,down,left, and right. To use your net and bring the turtles to safety. Catch the floating plastic\n by making it touch the net. If you can get all the plastic before time is up, the turtle is saved! However,\n if the turtle even touches a piece of plastic, the game is over.'

function draw() 
{
  rectMode(CENTER);
  background(rgb(13,219,216));
 
  
  if(gamestate===0)
  {


      background(introscreen);
      
      textSize(40);
      fill(50,200,50)
      text("Save The Turtles!", displayWidth/2.5, displayHeight/10 - 30);

      fill(200,50,50)
      textSize(30); 
      text(s,displayWidth/2-750, displayHeight/8);
      text("Press space to continue.",displayWidth/2-140, displayHeight/4 + 100); 

      if(keyDown("SPACE"))
        {
          gamestate=1;
        }

  }

 


  if(gamestate===1){
background(rgb(200,100,50))
beach_background.visible=true;
john.visible=true;

//portal_1.visible = true;
textSize(40);
text("Press right arrow to move John to the right in order to get to the next level.",200,200);

if (keyDown(RIGHT_ARROW)){
john.x = john.x+4;
}

if (keyDown(LEFT_ARROW)){
  john.x = john.x-4;
}

}

if (john.x === portal_1.x){
gamestate = 2

}

//console.log(gamestate)

 

//Gamestate 2

if (gamestate===2)
{
beach_background.visible = false;
rock.visible = true;
rock2.visible=true;
rock3.visible=true;
sea_urchin.visible = true;
sea_urchin2.visible = true;
coin.visible = true;
text("score:" + score, displayWidth/2,displayHeight/8);
console.log(mouseY)
console.log(mouseX)
console.log(score);
//net settings
netsprite.visible = true;
netsprite.x = john.x +30;
netsprite.y = john.y
netsprite.scale = 0.2;

//turtle info:
//make the turtle show up
turtlesprite.visible = true;
turtlesprite.x = turtlesprite.x-0.5

spawnships();
spawn_trash();
//spawn_trash();
//cruiseship.visible = true;
//cruiseship.scale = 0.7
//cruiseship.velocityX = 4;

/*if(cruiseship.x === displayWidth)
{
cruiseship.velocityX = -4;
}*/

//underwater background setting
image(underwater,0,0,displayWidth,displayHeight);

john.changeAnimation("swimming",swimming)

if(keyDown(RIGHT_ARROW))
{
  john.changeAnimation("swimming",swimming) 
  john.x = john.x + 5

  //right facing net instructions
  netsprite.x = john.x + 100;
  netsprite.y = john.y+50;
  netsprite.addImage(netrightimage);

}

if(keyDown(LEFT_ARROW))
{
  john.changeAnimation("swimmingleft",swimmingleft)
  john.x = john.x - 5
  netsprite.x = john.x - 100;
  netsprite.y = john.y+50
  netsprite.addImage(netimage)
}

if(keyDown(UP_ARROW))
{
  john.angle = 70
  john.y = john.y -10;
}

if(keyDown(DOWN_ARROW))
{
  john.angle = -70
  john.y = john.y +10;
}

if(john.isTouching(sea_urchin))
{
score= score-0.1

}

if(john.isTouching(sea_urchin2))
{
score= score-0.1

}

if(john.isTouching(rock))
{
score= score-0.1

}

if(john.isTouching(rock2))
{
score= score-0.1

}

if(john.isTouching(rock3))
{
score= score-0.1

}

if (john.isTouching(coin)){
  score = score+50;
  coin.destroy();
}


john.scale = 1

if(john.isTouching(turtlesprite))
{
turtlesprite.x = turtlesprite.x+30;
}


//set john's maximum height limit for play state
if(john.y <= 250)
{
john.y = 250;
}

//set john's minimum height limit for playstate

if(john.y>=760)
{
john.y = 750;
}


//set john's minimum x limit for playstate
if(john.x <= 0)
{
john.x = 40;
}

//set john's maximum x limit for playstate
if(john.x >= displayWidth)
{
john.x = displayWidth - 40;
}




}  


  


  drawSprites();
 
}

function spawnships() {
  if(frameCount % 280 === 0) {
    cruiseship = createSprite(displayWidth/4.5,displayHeight/6,100,40);
   
    //cruiseship.velocityX = -(6 + 3*score/100);
    
    cruiseship.velocityX = 4;
    
    //generate random obstacles
    
    var p = Math.round(random(1,2));
    if(p ===1)
    {
      cruiseship.x = 0
      cruiseship.velocityX = 5;
      
      var r = Math.round(random(1,2));
      
      if(r===1)
      {
        cruiseship.addImage(cruiseimage)
      }

      if(r===2)
      {
        cruiseship.addImage(cruise2image)
      }
      
    }
    
    if (p===2)
    {
      cruiseship.x = displayWidth
      cruiseship.velocityX = -5;
      cruiseship.addImage(cruise3image)
    }

    /*var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: cruiseship.addImage(cruiseimage);
              break;
      case 2: cruiseship.addImage(cruise2image);
              break;
      case 3: cruiseship.addImage(cruise3image);
              break;

      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    cruiseship.scale = 0.6;
    cruiseship.lifetime = 300;

    shipgroup.add(cruiseship)
    }

    
}

function spawn_trash()
     {

      if(frameCount % 100 === 0) {
        
        trash = createSprite(shipgroup.x,shipgroup.y,20,20);
        trash.velocityX = shipgroup.velocityX;
        trash.velocityY = 3;
        trash.addImage(trashimage);
        trash.scale = 0.2
      }
      
     }
     

