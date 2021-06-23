var dog,sadDog,happyDog;
var foodObj;

// We need to add this.
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;

var database;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
 
}

function setup() {
  createCanvas(1000,400);
 
  database= firebase.database();
  console.log(database);

  foodObj=new Food(100,300);

// Add the following
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  
 

feed = createButton("Feed the dog")
feed.position(700,105);
feed.mousePressed(feedDog);

addFood = createButton("Add food")
addFood.position(800,105);
addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  
  foodObj.display();

  //add the following:
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
dog.addImage(happyDog)
//dog.y-=115;
//dog.x-=650;

//add the following
if(foodObj.getFoodStock()<= 0){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0)

}else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
}
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

//function to add food in stock
function addFoods(){
foodS++;
database.ref('/').update({
Food:foodS
})
}