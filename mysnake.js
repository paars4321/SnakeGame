
const foodSound = new Audio('./food.mp3');
const gameOverSound = new Audio('./gameover.mp3');
const moveSound = new Audio('./move.mp3');
const musicSound = new Audio('./music.mp3');
const clickSound = new Audio('./click.wav');
musicSound.play();


function dis_none()
{
    // console.log(";lknb")
    musicSound.pause();
    clickSound.play()
    musicSound.play();
    document.getElementById("first").style.display="none";
    document.getElementById("gaming_display").style.display="block";

  
}
let setspeed=5;
function level1()
{
   document.getElementById('level1').style.backgroundColor='yellow';
   document.getElementById('level2').style.backgroundColor='rgb(190 175 227)';
   document.getElementById('level3').style.backgroundColor='rgb(190 175 227)';
   setspeed=5;
   clickSound.play()
}

function level2()
{
   document.getElementById('level2').style.backgroundColor='yellow';
   document.getElementById('level1').style.backgroundColor='rgb(190 175 227)';
   document.getElementById('level3').style.backgroundColor='rgb(190 175 227)';
   setspeed=7;
   clickSound.play()
}

function level3()
{
   document.getElementById('level3').style.backgroundColor='yellow';
   document.getElementById('level2').style.backgroundColor='rgb(190 175 227)';
   document.getElementById('level1').style.backgroundColor='rgb(190 175 227)';
   setspeed=9;
   clickSound.play()
}


let bx=1,by=0,f=0;
function up()
{
   f=1;
   moveSound.play()
  bx=0;
  by=-1;
}

function down()
{
   f=1;
   moveSound.play()
  bx=0;
  by=1;
}

function left()
{
   f=1;
   moveSound.play()
   bx=-1;
   by=0;
}

function right()
{
   f=1;
   moveSound.play()
   bx=1;
   by=0;
}

//////////////////////////////////////////////////////////////////////////////////////////


function start_the_game()
{
   musicSound.pause();
   clickSound.play()
   musicSound.play();

   document.getElementById("start").style.display="none";

let lastPaintTime = 0;
let snakeIndex=[{x:10,y:12}];
let currentDirection={x:1,y:0};
let foodPostion={x:5,y:15};
let score=0;




let food;
function snakeFood()
{
 food=document.createElement('div');
 a=2;
 b=16;
 foodPostion = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
 food.style.gridRowStart=foodPostion.y;
 food.style.gridColumnStart=foodPostion.x;
 food.classList.add('food');
//  return food;
}

snakeFood();


function colision()
{
   if(snakeIndex[0].x<=0 || snakeIndex[0].x>=18 ||snakeIndex[0].y<=0||snakeIndex[0].y>=18 )
   return 1;

   for(i=1;i<snakeIndex.length;i++)
    if(snakeIndex[0].x==snakeIndex[i].x && snakeIndex[0].y==snakeIndex[i].y)
    return 1;

  
   return 0;
}

 function main(ctime)      // step:2
{
    window.requestAnimationFrame(main);
    
       
    if((ctime - lastPaintTime)/1000 < 1/setspeed){
        return;
    }
    lastPaintTime = ctime;
    // console.log(ctime);

  gameEngine();  
}

function gameEngine()    
{
   if(colision())
   {
      gameOverSound.play();
      alert("GAME IS OVER !!!")
      snakeIndex=[{x:5, y:8}];
      score=0;
      document.getElementById('score').innerHTML="Score: "+score;
     

      if(confirm("Do you want to paly again!!!"))
      {

      }
      else
      {
      currentDirection.x=0;
      currentDirection.y=0;
      }
      //lastPaintTime=-10000;
      // window.cancelAnimationFrame(paras);
      // process.exit(1);
      // confirm("Do you wan to continue!!!")
      // fail;
      // document.getElementById("start").style.display="block";
   }

   if(snakeIndex[0].x==foodPostion.x && snakeIndex[0].y==foodPostion.y)
   {
      musicSound.pause();
     foodSound.play()
     musicSound.play();
      snakeIndex.unshift({x:foodPostion.x + currentDirection.x, y:foodPostion.y + currentDirection.y});
      score++;
      document.getElementById('score').innerHTML="Score: "+score;
      snakeFood();
   }



   // Moving the snake
   for (let i = snakeIndex.length - 2; i>=0; i--) { 
      snakeIndex[i+1].x = snakeIndex[i].x;
      snakeIndex[i+1].y = snakeIndex[i].y;
  }


   board.innerHTML = "";                //step:3
   // console.log(board.innerHTML)
   if(f)
{
   currentDirection.x=bx;
   currentDirection.y=by;
}
   snakeIndex[0].y +=currentDirection.y;
   snakeIndex[0].x +=currentDirection.x;

   snakeIndex.forEach((e,index)=>         //step:3
   {
      snakeElement= document.createElement("div");
      snakeElement.style.gridRowStart=e.y;
      snakeElement.style.gridColumnStart=e.x;
      

      if(index==0)
      snakeElement.classList.add('head');

      else
      snakeElement.classList.add('tail');

      board.appendChild(snakeElement);
      board.appendChild(food);
   
   })



   
}

let paras=window.requestAnimationFrame(main); //step:1

window.addEventListener('keydown',(e)=>
{                                            //step:4
   if(e.key=='ArrowUp')
   {
      currentDirection.x=0;
      currentDirection.y=-1;
      
    moveSound.play()
   
      
   }

   else if(e.key=='ArrowDown')
   {
      currentDirection.x=0;
      currentDirection.y=1;
      
      moveSound.play()
   }

   if(e.key=='ArrowLeft')
   {
      currentDirection.x=-1;
      currentDirection.y=0;
      
      moveSound.play()
   }

   if(e.key=='ArrowRight')
   {
      currentDirection.x=1;
      currentDirection.y=0;

      moveSound.play()
      
   }
})


}