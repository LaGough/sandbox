const empty = 0;
const sand = 1;
const brick = 2;
const water_left = 3;
const water_right = 4;
const steam_left = 5;
const steam_right = 6;
const earth = 7;
const fire = 8;

if (localStorage.getItem('k') == undefined)
{
    localStorage.setItem('sz',950);
    localStorage.setItem('k',10);  
}

function init() { 
    var k = +localStorage.getItem('k');
    var sz = +localStorage.getItem('sz');
    var steamCounter = 500;
    var earthCounter = 500;
    var fireCounter = 4;
    var brickCounter = 25;
    var isDrag = false; 

    document.getElementById("k").setAttribute('value',k);
    document.getElementById("sz").setAttribute('value',sz); 

    var canvas = document.getElementById("board");
	    canvas.width = sz;
	    canvas.height = sz;
	var ctx = canvas.getContext("2d");
	    ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);  

    var board = new Array(Math.floor(canvas.width/k));
    for (var i=0;i<board.length;i++)
    {
        board[i] = new Array(Math.floor(canvas.height/k));
        for (var j = 0;j < board[i].length;j++)
            board[i][j] = empty;
    }

    var steamArr = new Array(Math.floor(canvas.width/k));
    for (var i=0;i<steamArr.length;i++)
    {
        steamArr[i] = new Array(Math.floor(canvas.height/k));
        for (var j = 0;j < steamArr[i].length;j++)
            steamArr[i][j] = empty;
    }

    var earthArr = new Array(Math.floor(canvas.width/k));
    for (var i=0;i<earthArr.length;i++)
    {
        earthArr[i] = new Array(Math.floor(canvas.height/k));
        for (var j = 0;j < earthArr[i].length;j++)
            earthArr[i][j] = empty;
    }

    var fireArr = new Array(Math.floor(canvas.width/k));
    for (var i=0;i<fireArr.length;i++)
    {
        fireArr[i] = new Array(Math.floor(canvas.height/k));
        for (var j = 0;j < fireArr[i].length;j++)
            fireArr[i][j] = empty;
    }

    var brickArr = new Array(Math.floor(canvas.width/k));
    for (var i=0;i<brickArr.length;i++)
    {
        brickArr[i] = new Array(Math.floor(canvas.height/k));
        for (var j = 0;j < brickArr[i].length;j++)
            brickArr[i][j] = empty;
    }

    canvas.addEventListener('mousedown', function(event) 
    {
        if (event.button == 0)
            isDrag = true;
        else
            isClear = true;
    });

    canvas.addEventListener('mouseover', function (event)
    {
        isDrag = false;
    });

    canvas.addEventListener('mouseup', function(event) 
    {
        isDrag = false;
    });

    canvas.addEventListener('touchstart', function(event)
    {
        isDrag = true;
    })

    canvas.addEventListener('touchstart', function(event) 
    {
        isDrag = true;
    });


    canvas.addEventListener('touchend', function(event) 
    {
        isDrag = false;
    });

    canvas.addEventListener('touchmove', function(event)
    {
        if (isDrag)
        {
            touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
            touchPosition = { x: touchStart.x, y: touchStart.y };
            var x = Math.floor(touchPosition.x/k);
            var y = Math.floor(touchPosition.y/k);
            addParticleToTheBoard(board,x,y,fireArr)
        }
    });

    canvas.addEventListener('mousemove',function(event)
    {
        if (isDrag)
        {
            var x = Math.floor(event.offsetX/k);
            var y = Math.floor(event.offsetY/k);
            addParticleToTheBoard(board,x,y, fireArr);
        }
    });
  
    var stepIntervalID = setInterval(()=>step(board,steamArr, steamCounter, earthArr, earthCounter, fireArr, fireCounter, brickArr, brickCounter),0);
    var drawIntervalID = setInterval(()=>draw(board,ctx,k,fireArr),0);
}

function addParticleToTheBoard(board,x,y,fireArr)
{
    var particle = document.getElementById('particle').value;
    if (particle == 'Ластик')
        for (var i = x-1;i<x+1;i++)
            for (var j = y - 1;j<y+1;j++)
                board[i][j] = empty;
    else
        for (var i = x-5;i<x+5;i++)
            for (var j = y - 5;j<y+5;j++)
            {
                if ((i>0) && (i<board[0].length-1) && (j<board.length-1) && (j>0))
                {
                    if (particle == 'Огонь')
                        if (Math.random() > 0.95)
                            fireArr[i][j] = 1;
                    if (board[i][j] == 0)   
                        if (Math.random() > 0.9) 
                        {
                            if (particle == 'Песок')
                                board[i][j] = sand;
                            else if (particle == 'Кирпич')
                                board[i][j] = brick;
                            else if (particle == 'Вода')
                            {
                                if (Math.random() > 0.5)
                                    board[i][j] = water_left;
                                else
                                    board[i][j] = water_right;
                            }
                            else if (particle == 'Пар')
                            {
                                if (Math.random() > 0.5)
                                    board[i][j] = steam_left;
                                else
                                    board[i][j] = steam_right;
                            }
                            else if (particle == 'Земля')
                                board[i][j] = earth;
                        }
                }
            } 
}

function SetK_Sz()
{
    let k = document.getElementById("k").value;
    let sz = document.getElementById("sz").value;
    localStorage.setItem('sz',sz);
    localStorage.setItem('k',k);
    location.reload();
}

function draw(board,ctx,k, fireArr)
{
    for (var i=0;i<board.length;i++)
        for (var j=0;j<board[i].length;j++)
        {
            switch (board[i][j])
            {
                case empty: ctx.fillStyle = "black"; break;
                case sand: ctx.fillStyle = "yellow"; break;
                case brick: ctx.fillStyle = "#800000"; break;
                case water_left: ctx.fillStyle = "blue"; break;
                case water_right: ctx.fillStyle = "blue"; break;
                case steam_left: ctx.fillStyle = "gray"; break;
                case steam_right: ctx.fillStyle = "gray"; break;
                case earth: ctx.fillStyle = "#964b00"; break;
            }
            if (fireArr[i][j]>empty)
                ctx.fillStyle = "#FDA50F";
            ctx.fillRect(i*k,j*k,k,k);
        }
            
}

function step(board,steamArr,steamCounter, earthArr, earthCounter, fireArr, fireCounter, brickArr, brickCounter)
{
    //down
    for(var j=board[0].length-1;j>0;j--)
        for(var i=1;i<board.length-1;i++)
        {
            switch (board[i][j-1])
            {
            case sand:
                //to earth
                if (board[i][j-2] == water_left || board[i][j-2] == water_right || board[i+1][j-2] == water_left || board[i+1][j-2] == water_right || board[i-1][j-2] == water_left || board[i-1][j-2] == water_right || board[i+1][j-1] == water_left || board[i+1][j-1] == water_right || board[i-1][j-1] == water_left || board[i-1][j-1] == water_right)
                    earthArr[i][j-1] = earthArr[i][j-1]+1; 
                if (earthArr[i][j-1]>earthCounter)
                {
                    board[i][j-1] = 7;
                    earthArr[i][j-1] = empty;
                }

                //to brick
                if (fireArr[i][j-1] > 0)
                    brickArr[i][j-1] = brickArr[i][j-1]+1;
                if (brickArr[i][j-1]>brickCounter)
                {
                    brickArr[i][j-1] = empty;
                    board[i][j-1] = brick;
                }

                if ((board[i][j] == empty) || (board[i][j] == water_left) || (board[i][j] == water_right))
                {
                    var buf = board[i][j];
                    board[i][j] = board[i][j-1];
                    board[i][j-1] = buf;

                    buf = earthArr[i][j];
                    earthArr[i][j] = earthArr[i][j-1];
                    earthArr[i][j-1] = buf;
                }
                else if ((board[i-1][j] == empty) || (board[i-1][j] == water_left) || (board[i-1][j] == water_right))
                {
                    var buf = board[i-1][j];
                    board[i-1][j] = board[i][j-1];
                    board[i][j-1] = buf;

                    buf = earthArr[i-1][j];
                    earthArr[i-1][j] = earthArr[i][j-1];
                    earthArr[i][j-1] = buf;
                }
                else if ((board[i+1][j] == empty) || (board[i+1][j] == water_left) || (board[i+1][j] == water_right))
                {
                    var buf = board[i+1][j];
                    board[i+1][j] = board[i][j-1];
                    board[i][j-1] = buf;

                    buf = earthArr[i+1][j];
                    earthArr[i+1][j] = earthArr[i][j-1];
                    earthArr[i][j-1] = buf;
                }
                break;
            
            case water_left:
                if ((board[i][j] == empty) || (board[i][j] == steam_left) || (board[i][j] == steam_right))
                {
                    var buf = board[i][j];
                    board[i][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i-1][j] == empty)  || (board[i-1][j] == steam_left) || (board[i-1][j] == steam_right))
                {
                    var buf = board[i-1][j];
                    board[i-1][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i+1][j] == empty) || (board[i+1][j] == steam_left) || (board[i+1][j] == steam_right))
                {
                    var buf = board[i+1][j];
                    board[i+1][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i-1][j-1] == empty) || (board[i-1][j-1] == steam_left) || (board[i-1][j-1] == steam_right))
                {
                    board[i][j-1] = board[i-1][j-1];
                    board[i-1][j-1] = water_right;
                }
                else if ((board[i+1][j-1] == empty) || (board[i+1][j+1] == steam_left) || (board[i+1][j+1] == steam_right))
                {
                    var buf = board[i+1][j-1];
                    board[i+1][j-1] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                break;

            case water_right:
                if ((board[i][j] == empty) || (board[i][j] == steam_left) || (board[i][j] == steam_right))
                {
                    var buf = board[i][j];
                    board[i][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i-1][j] == empty)  || (board[i-1][j] == steam_left) || (board[i-1][j] == steam_right))
                {
                    var buf = board[i-1][j];
                    board[i-1][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i+1][j] == empty) || (board[i+1][j] == steam_left) || (board[i+1][j] == steam_right))
                {
                    var buf = board[i+1][j];
                    board[i+1][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i+1][j-1] == empty) || (board[i+1][j+1] == steam_left) || (board[i+1][j+1] == steam_right))
                {
                    var buf = board[i+1][j-1];
                    board[i+1][j-1] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i-1][j-1] == empty) || (board[i-1][j-1] == steam_left) || (board[i-1][j-1] == steam_right))
                {
                    board[i][j-1] = board[i-1][j-1];
                    board[i-1][j-1] = water_left;
                }
                break;
                
            case earth: //earth
                if ((board[i][j] == empty) || (board[i][j] == water_left) || (board[i][j] == water_right))
                {
                    var buf = board[i][j];
                    board[i][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i-1][j] == empty) || (board[i-1][j] == water_left) || (board[i-1][j] == water_right))
                {
                    var buf = board[i-1][j];
                    board[i-1][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                else if ((board[i+1][j] == empty) || (board[i+1][j] == water_left) || (board[i+1][j] == water_right))
                {
                    var buf = board[i+1][j];
                    board[i+1][j] = board[i][j-1];
                    board[i][j-1] = buf;
                }
                break;
            } 
            if (fireArr[i][j-1] > empty)
            {
                fireArr[i][j-1] = fireArr[i][j-1] + 1;
                if (fireArr[i][j-1] >= fireCounter)
                    fireArr[i][j-1] = empty;
            }
        }    

    //up
    for(var j=0;j<board[0].length-1;j++)
        for(var i=1;i<board.length-1;i++)
        {
            switch (board[i][j])
            {
                case steam_left:
                    steamArr[i][j] += 1;
                    if (steamArr[i][j]>steamCounter)
                    {
                        if (Math.random()>0.5)
                            board[i][j] = water_left;
                        steamArr[i][j] = empty;
                    }
                    if (board[i][j-1] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i][j-1];
                        board[i][j-1] = buf;
                        
                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i][j-1];
                        steamArr[i][j-1] = buf;
                    }
                    else if (board[i-1][j-1] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i-1][j-1];
                        board[i-1][j-1] = buf;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i-1][j-1];
                        steamArr[i+1][j-1] = buf;
                    }
                    else if (board[i+1][j-1] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i+1][j-1];
                        board[i+1][j-1] = buf;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i+1][j-1];
                        steamArr[i+1][j-1] = buf;
                    }
                    else if (board[i-1][j] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i-1][j];
                        board[i-1][j] = steam_right;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i-1][j];
                        steamArr[i-1][j] = buf;
                    }
                    else if (board[i+1][j] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i+1][j];
                        board[i+1][j] = buf;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i+1][j];
                        steamArr[i+1][j] = buf
                    }
                    break;

                case steam_right:
                    steamArr[i][j] += 1;
                    if (steamArr[i][j]>steamCounter)
                    {
                        if (Math.random()>0.5)
                            board[i][j]=water_right;
                        steamArr[i][j]=empty;
                    }
                    else if (board[i][j-1] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i][j-1];
                        board[i][j-1] = buf;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i][j-1];
                        steamArr[i][j-1] = buf
                    }
                    else if (board[i-1][j-1] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i-1][j-1];
                        board[i-1][j-1] = buf;


                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i-1][j-1];
                        steamArr[i-1][j-1] = buf
                    }
                    else if (board[i+1][j-1] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i+1][j-1];
                        board[i+1][j-1] = buf;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i+1][j-1];
                        steamArr[i+1][j-1] = buf
                    }
                    else if (board[i+1][j] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i+1][j];
                        board[i+1][j] = buf;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i+1][j];
                        steamArr[i+1][j] = buf;
                    }
                    else if (board[i-1][j] == empty)
                    {
                        var buf = board[i][j];
                        board[i][j] = board[i-1][j];
                        board[i-1][j] = steam_left;

                        buf = steamArr[i][j];
                        steamArr[i][j] = steamArr[i-1][j];
                        steamArr[i-1][j] = buf
                    }
                    break;
            }
        }       
}