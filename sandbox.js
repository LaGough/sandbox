if (localStorage.getItem('k') == undefined)
{
    localStorage.setItem('sz',950);
    localStorage.setItem('k',10);  
}

function init() { 
    let k = +localStorage.getItem('k');
    let sz = +localStorage.getItem('sz');
    let steamCounter = 100;
    document.getElementById("k").setAttribute('value',k);
    document.getElementById("sz").setAttribute('value',sz); 

    var canvas = document.getElementById("board");
	    canvas.width = sz;
	    canvas.height = sz;
	var ctx = canvas.getContext("2d");
	    ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);  
    
    var isDrag = false; 
    var board = new Array(Math.floor(canvas.width/k));
    for (var i=0;i<board.length;i++)
    {
        board[i] = new Array(Math.floor(canvas.height/k));
        for (var j = 0;j < board[i].length;j++)
            board[i][j] = 0;
    }

    var steam = new Array(Math.floor(canvas.width/k));
    for (var i=0;i<steam.length;i++)
    {
        steam[i] = new Array(Math.floor(canvas.height/k));
        for (var j = 0;j < steam[i].length;j++)
            steam[i][j] = 0;
    }

    canvas.addEventListener('mousedown', function(event) 
    {
        isDrag = true;
    });

    canvas.addEventListener('mouseup', function(event) 
    {
        isDrag = false;
    });

    canvas.addEventListener('mousemove',function(event)
    {
        if (isDrag)
        {
            var x = Math.floor(event.offsetX/k);
            var y = Math.floor(event.offsetY/k);
            for (var i = x-5;i<x+5;i++)
                for (var j = y - 5;j<y+5;j++)
                {
                    if ((i>0) && (i<board[0].length-1) && board[i][j] == 0)
                        if (Math.random() > 0.9) 
                        {
                            var particle = document.getElementById('particle').value;
                            if (particle == 'Песок')
                                board[i][j] = 1;
                            else if (particle == 'Кирпич')
                                board[i][j] = 2;
                            else if (particle == 'Вода')
                            {
                                if (Math.random() > 0.5)
                                    board[i][j] = 3;
                                else
                                    board[i][j] = 4;
                            }
                            else if (particle == 'Пар')
                                board[i][j] = 5;
                        }
                }
        }
    });
    ////
    canvas.addEventListener('touchstart', function(event) 
    {
        isDrag = true;
    });

    canvas.addEventListener('touchend', function(event) 
    {
        isDrag = false;
    });

    canvas.addEventListener('touchmove',function(event)
    {
        if (isDrag)
        {
            var x = Math.floor(event.offsetX/k);
            var y = Math.floor(event.offsetY/k);
            for (var i = x-5;i<x+5;i++)
                for (var j = y - 5;j<y+5;j++)
                {
                    if ((i>0) && (i<board[0].length-1) && board[i][j] == 0)
                        if (Math.random() > 0.9) 
                        {
                            var particle = document.getElementById('particle').value;
                            if (particle == 'Песок')
                                board[i][j] = 1;
                            else if (particle == 'Кирпич')
                                board[i][j] = 2;
                            else if (particle == 'Вода')
                            {
                                if (Math.random() > 0.5)
                                    board[i][j] = 3;
                                else
                                    board[i][j] = 4;
                            }
                            else if (particle == 'Пар')
                                board[i][j] = 5;
                        }
                }
        }
    });
    var stepIntervalID = setInterval(()=>step(board,steam, steamCounter),0);
    var drawIntervalID = setInterval(()=>draw(board,ctx,k),0);
}

function SetK_Sz()
{
    let k = document.getElementById("k").value;
    let sz = document.getElementById("sz").value;
    localStorage.setItem('sz',sz);
    localStorage.setItem('k',k);
    location.reload();
}

function draw(board,ctx,k)
{
    for (var i=0;i<board.length;i++)
        for (var j=0;j<board[i].length;j++)
        {
            switch (board[i][j])
            {
                case 0: ctx.fillStyle = "black"; break;
                case 1: ctx.fillStyle = "yellow"; break;
                case 2: ctx.fillStyle = "red"; break;
                case 3: ctx.fillStyle = "blue"; break;
                case 4: ctx.fillStyle = "blue"; break;
                case 5: ctx.fillStyle = "gray"; break;
                case 6: ctx.fillStyle = "gray"; break;
            }
            ctx.fillRect(i*k,j*k,k,k);
        }
            
}

function step(board,steam,steamCounter)
{
    //down
    for(var j=board[0].length-1;j>0;j--)
        for(var i=1;i<board.length-1;i++)
        {
            switch (board[i][j-1])
            {
            case 1: //sand
                if (board[i][j] == 0)
                {
                    board[i][j] = 1;
                    board[i][j-1] = 0;
                }
                else if (board[i-1][j] == 0)
                {
                    board[i-1][j] = 1;
                    board[i][j-1] = 0;
                }
                else if (board[i+1][j] == 0)
                {
                    board[i+1][j] = 1;
                    board[i][j-1] = 0;
                }
                break;
            
            case 3: //water left
                if (board[i][j] == 0)
                {
                    board[i][j] = 3;
                    board[i][j-1] = 0;
                }
                else if (board[i-1][j] == 0)
                {
                    board[i-1][j] = 3;
                    board[i][j-1] = 0;
                }
                else if (board[i+1][j] == 0)
                {
                    board[i+1][j] = 3;
                    board[i][j-1] = 0;
                }
                else if (board[i-1][j-1] == 0)
                {
                    board[i-1][j-1] = 4;
                    board[i][j-1] = 0;
                }
                else if (board[i+1][j-1] == 0)
                {
                    board[i+1][j-1] = 3;
                    board[i][j-1] = 0;
                }
                break;

            case 4: //water right
                if (board[i][j] == 0)
                {
                    board[i][j] = 4;
                    board[i][j-1] = 0;
                }
                else if (board[i-1][j] == 0)
                {
                    board[i-1][j] = 4;
                    board[i][j-1] = 0;
                }
                else if (board[i+1][j] == 0)
                {
                    board[i+1][j] = 4;
                    board[i][j-1] = 0;
                }
                else if (board[i+1][j-1] == 0)
                {
                    board[i+1][j-1] = 4;
                    board[i][j-1] = 0;
                }
                else if (board[i-1][j-1] == 0)
                {
                    board[i-1][j-1] = 3;
                    board[i][j-1] = 0;
                }
                break;
            } 
        }    

    //up
    for(var j=1;j<board[0].length;j++)
        for(var i=1;i<board.length-1;i++)
        {
            switch (board[i][j])
            {
                case 5: //steam left
                    if (steam[i][j]>steamCounter)
                    {
                        if (Math.random()>0.5)
                            board[i][j]=3;
                        steam[i][j] = 0;
                    }
                    else if (board[i][j-1] == 0)
                    {
                        board[i][j-1] = 5;
                        board[i][j] = 0;

                        steam[i][j-1] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i-1][j-1] == 0)
                    {
                        board[i-1][j-1] = 5;
                        board[i][j] = 0;

                        steam[i-1][j-1] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i+1][j-1] == 0)
                    {
                        board[i+1][j-1] = 5;
                        board[i][j] = 0;

                        steam[i+1][j-1] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i-1][j] == 0)
                    {
                        board[i-1][j] = 6;
                        board[i][j] = 0;

                        steam[i-1][j] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i+1][j] == 0)
                    {
                        board[i+1][j] = 5;
                        board[i][j] = 0;
                        
                        steam[i+1][j] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else
                    {
                        steam[i][j] += 1;
                    }
                    break;

                case 6: //steam right
                    if (steam[i][j]>steamCounter)
                    {
                        if (Math.random()>0.5)
                            board[i][j]=4;
                        steam[i][j]=0;
                    }
                    else if (board[i][j-1] == 0)
                    {
                        board[i][j-1] = 6;
                        board[i][j] = 0;

                        steam[i][j-1] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i-1][j-1] == 0)
                    {
                        board[i-1][j-1] = 6;
                        board[i][j] = 0;

                        steam[i-1][j-1] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i+1][j-1] == 0)
                    {
                        board[i+1][j-1] = 6;
                        board[i][j] = 0;

                        steam[i+1][j-1] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i+1][j] == 0)
                    {
                        board[i+1][j] = 6;
                        board[i][j] = 0;

                        steam[i+1][j] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else if (board[i-1][j] == 0)
                    {
                        board[i-1][j] = 5;
                        board[i][j] = 0;

                        steam[i-1][j] = steam[i][j]+1;
                        steam[i][j] = 0;
                    }
                    else
                    {
                        steam[i][j] += 1;
                    }
                    break;
            }
        }
        
}