//Create variables here
var dog, happyDog, database, foods, foodStock, dogImage1, dogImage2;
var butFeedPet,butAddFood;
var fedTime, lastFed=12;

function preload()
{
	dogImage1=loadImage("Dog.png")
  dogImage2=loadImage("happydog.png")
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(400,250,20,20)
  dog.scale=0.2;

  database=firebase.database();
  getFoodStock();
  setStock(20);

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  })

  Food1=new food(foods);

  butFeedPet=createButton("FEED PET");
  butFeedPet.position(400,60);
  butFeedPet.mousePressed(feedTheDog);

  butAddFood=createButton("ADD FOOD");
  butAddFood.position(400,100);
  butAddFood.mousePressed(addFood);
  
}


function draw() { 
  background(46, 139, 87);
  drawSprites();
  textSize(20);
  fill ("yellow");
  stroke ("black");
  if(lastFed>12){
            text("last feed: "+lastFed%12 +"PM",350,30);
  }else if(lastFed===12){
          text("last feed: 12 PM",350,30);
      }else if(lastFed===0){
        text("last feed: 12 AM",350,30);
    }else{
    text("last feed: "+lastFed+"AM",350,30)
      }
      
  //text ("Note:press  key to feed pahalvan milk!!!!!!!",10,50);
  
  dog.addImage(dogImage1);
 // console.log("foods in draw"+foods);
  /*if(keyDown(UP_ARROW)){
          writeStock(foods);
          dog.addImage(dogImage2);
         
  }*/
  text ("food left:"+foods,380,450)
  Food1.display();
  
}

function readStock(data){
      foods=data.val();
      //console.log("foods in read stock"+foods);
}

function writeStock(x){
  //console.log("x in write stock"+x)

        if(x<=0){
          x=0;
        }else{
          x=x-1
        }
  setStock(x)

}

function setStock(x){
  database.ref('/food').set(x)
}

function feedTheDog(){
  dog.addImage(dogImage2);
  foods--;
  lastFed=hour();
  Food1.foods=foods;
  Food1.display()
  database.ref('/').update({
  food:foods,
  fedTime:lastFed
  })
}

function addFood(){
  foods++
  /*database.ref('/').update({
  food:foods
  })*/
}

function getFoodStock() {

  foodStock=database.ref('food')
  foodStock.on("value",readStock)

  }
  
function updateFoodStock(food){
      database.ref('/').update ({foodStock:food})

}

function deductFood (){

}