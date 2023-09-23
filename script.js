let canvas = document.getElementById('game');
const ctx = canvas.getContext('2d'),
ballRadius = 9;
let x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3);
let y = canvas.height - 40;
dx = 2,
dy = -2;

let paddleHeight = 12,
    paddleWidth = 72;


    // start position
    let paddleX = (canvas.width - paddleWidth) / 2;

    //bricks
    let rowCount = 5,
        columnCount = 9,
        brickWidth = 54,
        brickHeight = 18,
        brickPadding = 12,
        topOffset = 40,
        leftOffset = 33,
        score = 0;

        //Bricks array
        let bricks = [];
        for(let c = 0; c < columnCount; c++){
            bricks[c] = [];
            for(let r = 0; r < rowCount; r++){
                bricks[c][r] = { x: 0, y: 0, status: 1};
            }
        }

        //mouse moving eventListenner and function
        document.addEventListener("mousemove", mouseMoveHandler, false);


        // Move paddle width mouse
        function mouseMoveHandler(e){
            var relativeX = e.clientX - canvas.offsetLeft;
            if (relativeX > 0 && relativeX < canvas.width){
                paddleX = relativeX - paddleWidth / 2;
            }
        }

        // Draw paddle
        function drawPaddle(){
            ctx.beginPath();
            ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
            ctx.fillstyle = '#333';
            ctx.fill();
            ctx.closePath
        }

        //draw ball
        function drawBall(){
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }


        // draw bricks

        function drawBricks(){
            for(let c = 0; c < columnCount; c++){
                for(let r = 0; r < rowCount; r++){
                    if(bricks[c][r].status === 1){
                        let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                        let brickY = (r * (brickHeight + brickHeight)) + topOffset;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30 );
                        ctx.fillStyle = '#333';
                        ctx.fill();
                        ctx.closePath();


                    }
                }
            }
        }


        // Track score
        function trackScore(){
            ctx.font = 'bold 16px sans-serif';
            ctx.fillStyle = '#333';
            ctx.fillText('Score : ' + score, 8, 24);
        }

        //Check ball hit bricks
        function hitDetection(){
            for(let c = 0; c < columnCount; c++){
                for(let r = 0; r < rowCount; r++){
                    let b = bricks[c][r];
                    if(b.status === 1){
                        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                            dy = -dy;
                            b.status = 0;
                            score++;
                            //check win
                            if(score === rowCount * columnCount){
                                alert('You win!');
                                document.location.reload();
                            }

                        }
                    }
                } 
            }
        }

        //Main function
        function init(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            trackScore();
            drawBricks();
            drawBall();
            drawPaddle();
            hitDetection();


            // Detect left and right walls
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius){
                dx = -dx;
            }

            //Detect top wall
            if (y + dy < ballRadius){
                dy = -dy;
            }else if (y + dy > canvas.height - ballRadius){
                //detect paddle hit
                if ( x > paddleX && x < paddleX + paddleWidth){
                    dy = -dy;
                }else{
                // if ball dont hit paddle
                alert('You Lose!');
                document.location.reload();
                }
            }

            //bottom wall 
            if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
                dy = -dy;
            }

            x += dx;
            y += dy;
        }

        setInterval(init, 10);
            
    