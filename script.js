const grid=document.querySelector('.grid');        //select grid class for append the child
const scoreDisplay=document.querySelector('#score');

const blockwidth=100;
const blockheight=20;
const boardwidth=600;
const boardheight=300;
const balldiameter=20;
let timerid;          //store the setinterval function
let xDirection=2;
let yDirection=2;
let score=0;

const userStart=[230,10];  //for center purpose left=230 and bottom=10
let currentposition=userStart

const ballstart=[270,40];
let ballcurrentposition=ballstart;  //for ball move purpose

class block{
    constructor(xAxis,yAxis){
    this.bottomLeft=[xAxis,yAxis];                         //left=xAxis,bottom=yAxis
    this.bottomRight=[xAxis+blockwidth,yAxis];
    this.topLeft=[xAxis,yAxis+blockheight];
    this.topRight=[xAxis+blockwidth,yAxis+blockheight];
    }
}
const blocks=[
    new block(10,270),new block(120,270),new block(230,270),new block(340,270),new block(450,270),new block(10,240),new block(120,240),new block(230,240),new block(340,240),new block(450,240),
    new block(10,210),new block(120,210),new block(230,210),new block(340,210),new block(450,210),
]
//  pass value to class with constructor
console.log(blocks[0]);

//add multiple blocks
function addBlocks()
{
for(let i=0;i<blocks.length;i++)
{
   const block=document.createElement("div");         //create the new element div through document.createElement
   block.classList.add('block');                      //add class block to div
   block.style.left=blocks[i].bottomLeft[0] + 'px';     //get value value from block
   block.style.bottom=blocks[i].bottomLeft[1] + 'px';
   grid.appendChild(block);                      // append to root div
}
}
addBlocks();


//create user div
const user=document.createElement('div');
user.classList.add('user');  
drawuser();  
grid.appendChild(user);


function drawuser()
{
    user.style.left=currentposition[0] + 'px';        
    user.style.bottom=currentposition[1] + 'px';
}
 
//draw the ball
function drawball()
{
    ball.style.left=ballcurrentposition[0] + 'px';
    ball.style.bottom=ballcurrentposition[1] + 'px';
    // console.log('heoo');
}


// user move
function moveuser(e)
{
    switch(e.key)
    {
        case 'ArrowLeft':
            if(currentposition[0]>0){
                currentposition[0]-=10;
                drawuser();
                break;
            }
        case 'ArrowRight':
            if(currentposition[0]<boardwidth-blockwidth)   //600-100=500
            {
               currentposition[0]+=10;
               drawuser();
               break;
            }    

    }
}
document.addEventListener('keydown',moveuser);   //addEventlistener is use to listen the keyboard pressed by user and keep goes with moveuser function


// create ball
const ball=document.createElement('div');
ball.classList.add('ball');
ball.style.left=ballcurrentposition[0] + 'px';
ball.style.bottom=ballcurrentposition[1] + 'px';
grid.appendChild(ball);

//move ball
function movieball()
{
    ballcurrentposition[0]+=xDirection;
    ballcurrentposition[1]+=yDirection;  //increment both left and bottom by 2 for moving purpose
    drawball();  //call moving function
    checkforcollision();
}
timerid=setInterval(movieball,30); //
 
//check the collision of ball
function checkforcollision()
{
    //check for collisions
    for(let i=0; i<blocks.length; i++)
    {
       
          if(
            (ballcurrentposition[0] > blocks[i].bottomLeft[0] && ballcurrentposition[0] < blocks[i].bottomRight[0]) && ((ballcurrentposition[1] + balldiameter) > blocks[i].bottomLeft[1] && ballcurrentposition[1] < blocks[i].topLeft[1])
            )  //condition for ball hit the block div
            {
                const allblock=Array.from(document.querySelectorAll('.block'));  //condition satisfy blocks are store in array
                allblock[i].classList.remove('block');
                blocks.splice(i,1);   //antha particular index alone remove la so use splice.if not use splice delete element from matching index to end
                changeDirection();
                score++;
                scoreDisplay.innerHTML=score;
                // console.log(allblock);
                if(blocks.length === 0)   // each one hit the block decrement the block length //once user scored full score that time we need to stop the by using inbuilt function clearinterval
                {
                    scoreDisplay.innerHTML='YOU WIN THE GAME';
                    clearInterval(timerid);
                    document.removeEventListener('keydown',moveuser);
                }
            }
    }
 if(ballcurrentposition[0]>=(boardwidth-balldiameter) || ballcurrentposition[1]>=(boardheight-balldiameter) ||ballcurrentposition[0]<=0)    // x axis of ball and its value is >= 600-20.change the direction by calling method. 
 {
    changeDirection();
 }

 //check for user collection
 if(
    (ballcurrentposition[0] > currentposition[0] && ballcurrentposition[0] < currentposition[0] + blockwidth)
 && (ballcurrentposition[1] > currentposition[1] && ballcurrentposition[1] < currentposition[1] + blockheight)
 )  //check, Is ball is between the user div?

 {
    console.log('thani');
    changeDirection();
 }
 //check for game over
 if(ballcurrentposition[1]<=0)
 {
        clearInterval(timerid)      //ball missed by user,its bottom become 0px,according to game its means game over
        // scoreDisplay.innerHTML="OOPS,YOU MISSED THE BALL:("; //display the user lost
        document.removeEventListener('keydown',moveuser);
        console.log('hi');
        scoreDisplay.innerHTML = 'YOU LOST:() TRY AGAIN '; 
}
}
function changeDirection()
{
        if(xDirection === 2 && yDirection === 2)      //simply we initialize the xdirection and ydirection variable for enter into the condition
        {                                
            yDirection=-2                            // goes to below condtion
            return                       
        } 
        if(xDirection===2&&yDirection===-2)
        {
            xDirection=-2                            //goes to below condtion
            return
        } 
        if(xDirection===-2&&yDirection===-2)
        {
            yDirection=2;
            return
        }
        if(xDirection===-2&&yDirection===2)
        {
            xDirection=2;
            return
        }

                                     
}