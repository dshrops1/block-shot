
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

//make sure we understand context
var ctx = document.getElementById('canvas').getContext('2d');
var bulletsArray =[];
var userStarShipPosition = [600 / 2 - 25, 550];
var numOfAmmo = 45;
var keys =[];
var userShip = new Image(45,45);
var ammo = new Image(26,24);
var ammoLoaded = false;
var shipReadyForBattle = false;
ammo.src = "./tempAssets/ammo.png";
userShip.src = "./tempAssets/starships.png";
userShip.onload =function(){

    shipReadyForBattle = true;

};
ammo.onload=function(){

  ammoLoaded = true;
}

//document.body.appendChild(userShip);

function start(){

  window.requestAnimationFrame(draw);
}


function draw(){


  ctx.clearRect(0,0,600,600);
  //ctx.fillRect(userStarShipPosition[0],userStarShipPosition[1],25,25);

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


  //make sure we understand this before writing article
  window.requestAnimationFrame(draw);
}

start();


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
          bulletsArray.push({'ID': 1, "pos": [userStarShipPosition[0],userStarShipPosition[1] - 10]});
        }
          numOfAmmo -= 1;
    }
    if(keys[37]){
      userStarShipPosition[0] -= 20;
    }
    if(keys[39]){
      userStarShipPosition[0] += 20;
    }




});

document.addEventListener('keyup', function(event){

  keys[event.keyCode] = false;

});