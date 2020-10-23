var ball, ball2;
var position, database, position2;

function setup(){
    createCanvas(500,500);
    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";

    ball2 = createSprite(250,250,10,10);
    ball2.shapeColor = "blue";

    database = firebase.database();
    //console.log(database)
    var ball2Position = database.ref('ball/position2')
    ball2Position.on("value", readPosition2, showError)
    var ballPosition = database.ref('ball/position');
    ballPosition.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW))
    {
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    if(keyDown("d"))
    {
        writePosition2(-1,0);
    }
    else if(keyDown("a")){
        writePosition2(1,0);
    }
    else if(keyDown("w")){
        writePosition2(0,-1);
    }
    else if(keyDown("s")){
        writePosition2(0,+1);
    }
    drawSprites();
}

function writePosition(x, y) 
{
    database.ref('ball/position').set(
        {
            'x':position.x+x,
            'y':position.y+y
        }
        )    
}

function writePosition2(x, y)
{
    database.ref('ball/position2').set(
        {
            'x':position2.x+x,
            'y':position2.y+y
        }
        )
}

function readPosition(data) 
{
    position = data.val();
    ball1.x = position.x;
    ball1.y = position.y;
}

function readPosition2(data)
{
    position2 = data.val();
    ball2.x = position2.x;
    ball2.y = position2.y;
}


function showError()
{
    console.log("error");
}