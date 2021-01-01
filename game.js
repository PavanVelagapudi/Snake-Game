
    //create canvas
    const snake = [
        {x: 150, y:150},
        {x: 140, y:150},
        {x: 130, y:150},
        {x: 120, y:150},
        {x: 110, y:150},
    ];
    let dx = 10;
    let dy = 0;
    let foodX;
    let foodY;
    let score = 0;
    let snakeSpeed = 300;

    const LEFT_KEY = 37;
    const UP_KEY = 38;
    const RIGHT_KEY = 39;
    const DOWN_KEY = 40;

    document.addEventListener("keydown", changeSnakeDirection);
    const scoreText = document.getElementById("score");
    scoreText.innerText = score;

    const canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    
    main();
    generateFood();

    function clearCanvas()
    {
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    function main(){
        if(endGame())
        {
            //clearCanvas();
            ctx.font = "20px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Game Ended!", canvas.width/2, canvas.height/2);
            ctx.fillStyle = "black";
            ctx.font = "15 px Arial";
            ctx.fillText("Score: "+ score, canvas.width/2, canvas.height/2 + 30);
            
            return true;
        }

        setTimeout(function onTick(){
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            main();
        }, snakeSpeed);
    }

    //function to move snake
    function moveSnake()
    {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        

        if(head.x === foodX && head.y === foodY)
        {            
            score += 10;
            document.getElementById("score").innerText = score;

            switch(score)
            {
                case 50:
                    snakeSpeed = 250;
                    break;
                case 100:
                    snakeSpeed = 200;
                    break;
                case 150:
                    snakeSpeed = 150;
                    break;
                case 175:
                    snakeSpeed = 100;
                    break;
                case 200:
                    snakeSpeed = 75;
                    break;
            }

            // const newHead = {x: snake[0].x + dx, y: snake[0].y + dy};
            // snake.unshift(newHead);
            generateFood();
            
        }
        else{
            snake.pop();
        }
    }

    //function to check if the game had ended
    function endGame()
    {
        for(let i = 1; i < snake.length; i++)
        {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
                return true;
        }

        return snake[0].x < 0 || snake[0].y < 0 || snake[0].x > canvas.width - 10 || snake[0].y > canvas.height - 10;
    }

    function generateFood()
    {
        foodX = generateRandom(0, canvas.width - 10);
        foodY = generateRandom(0, canvas.height - 10);

        snake.forEach(part => {
            const isFoodOnSnake = part.x === foodX && part.y === foodY;
            if(isFoodOnSnake)
                generateFood();
        });
    }

    function drawFood()
    {
        ctx.fillStyle = "orange";
        ctx.strokeStyle = "darkred";
        ctx.fillRect(foodX, foodY, 10, 10);
        ctx.strokeRect(foodX, foodY, 10, 10);
    }

    function generateRandom(min, max)
    {
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    //function to change direction of snake
    function changeSnakeDirection(event)
    {
        const keyPressed = event.keyCode;
        
        const isGoingUp = dy === -10;
        const isGoingDown = dy === 10;
        const isGoingLeft = dx === -10;
        const isGoingRight = dx === 10;

        if(keyPressed === LEFT_KEY && !isGoingRight)
        {
            dx = -10;
            dy = 0;
        }
        else if(keyPressed === UP_KEY && !isGoingDown)
        {
            dx = 0;
            dy = -10;
        }
        else if(keyPressed === RIGHT_KEY && !isGoingLeft)
        {
            dx = 10;
            dy = 0;
        }
        else if(keyPressed === DOWN_KEY && !isGoingUp)
        {
            dx = 0;
            dy = 10;
        }
    }

    //function to draw the snake
    function drawSnakePart(snakePart)
    {
        ctx.fillStyle = "lightgreen";
        ctx.strokeStyle = "darkgreen";
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function drawSnake()
    {
        snake.forEach(drawSnakePart);
    }