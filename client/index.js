
/*
* Author: Dustin Shropshire
* Issues:
*1)can fire at same time however on keyup fireing stops until you press fire
* key down again or another movement key down again.
*
*2) need fluid movement.
*/

/*
* for eneimes i can use a array and for each for drawing
* then when a colusion is detected ill set that position to null
* have a null check in foreach method so if its null it does nothing
*
*/

var bgMusic = document.getElementById('background-music');
bgMusic.muted = false;


//make sure we understand context
var ctx = document.getElementById('canvas').getContext('2d');
var bulletsArray =[];
var userStarShipPosition = [600 / 2 - 25, 550];
var numOfAmmo = 45;
var keys =[];
var missileSound = new sound("./tempAssets/missile-shot.mp3");
//var backgroundMusic = new sound("./tempAssets/alien-dream.wav");
var userShip = new Image(45,45);
var ammo = new Image(26,24);
var spaceBackground = new Image(600,600);
var ammoLoaded = false;
var shipReadyForBattle = false;
var backgroundReady = false;
ammo.src = "./tempAssets/ammo.png";
userShip.src = "./tempAssets/starships.png";
userShip.onload =function(){

    shipReadyForBattle = true;

};
ammo.onload=function(){

  ammoLoaded = true;
};
spaceBackground.onload=function(){

    backgroundReady = true;

};


//document.body.appendChild(userShip);

function start(){
//in here we could start by drawing a press start animation
//then when they press start we can load everything up that way game doesnt start
//right away

  //backgroundMusic.play();
  window.requestAnimationFrame(draw);

}


function draw(){


  ctx.clearRect(0,0,600,600);
  //ctx.fillRect(userStarShipPosition[0],userStarShipPosition[1],25,25);
  if(backgroundReady){
    ctx.drawImage(spaceBackground,0,0);
  }

  if(shipReadyForBattle){
    ctx.drawImage(userShip,userStarShipPosition[0],userStarShipPosition[1]);
  }

  if(ammoLoaded){

  bulletsArray.forEach(function(e){

    //ctx.fillRect(e.pos[0] + 20,e.pos[1],10,10);
    ctx.drawImage(ammo,e.pos[0] + 20, e.pos[1]);
    e.pos[1] -= 10;

    })
  }

  //we are going to forEach draw our enimies array and do some logic
  // they are going to slowly move down the screen left to right


  //make sure we understand this before writing article
  window.requestAnimationFrame(draw);
}

start();

//might benifit from having keylisteners call something like settimeout to redraw
//understanding event listners
document.addEventListener('keydown', function(event){

  const keyName = event.key;
  // console.log(event.keyCode);
  keys[event.keyCode] = true;

  // if(keyName === "ArrowLeft"){
  //
  //   userStarShipPosition[0] -= 20;
  // }
  // if(keyName === "ArrowRight"){
  //
  //   userStarShipPosition[0] += 20;
  // }
  // if(keyName === "z"){
  //
  //   //may not be best way to do this because when playing for long leads to huge array object
  //   if(numOfAmmo > 0){
  //     bulletsArray.push({'ID': 1, "pos": [userStarShipPosition[0],userStarShipPosition[1] - 10]});
  //   }
  //     numOfAmmo -= 1;
  //   }

  //this works for tutorial but event emitters would be better for none  blocking so less jumpy drawing
    if(keys[90]){
      if(numOfAmmo > 0){
          missileSound.play();
          bulletsArray.push({'ID': 1, "pos": [userStarShipPosition[0],userStarShipPosition[1] - 10]});
        }
          numOfAmmo -= 1;
    }
    if(keys[37] && userStarShipPosition[0] > 0){

      userStarShipPosition[0] -= 20;
    }
    if(keys[39] && userStarShipPosition[0] < 600 - 45){
      userStarShipPosition[0] += 20;
    }




});

document.addEventListener('keyup', function(event){

  keys[event.keyCode] = false;

});


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");

    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
