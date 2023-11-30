//Game constants and variables
let veloSnake = { x: 0, y: 0 }
const eat = new Audio("music/food.mp3")
const gameover = new Audio("music/gameover.mp3")
let speed = 10
let lastPaintTime = 0
let snakeArr = [{ x: 13, y: 15 }]
let food = { x: 10, y: 10 }
const board = document.querySelector(".mainbox")
let scorebox = document.querySelector("#scorebox")
let score = 0




//game Function are here
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}



//game over
function isCollide(sarr) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            score = 0;
            scorebox.innerHTML = score
            return true
        }
    }
    if (snakeArr[0].x <= 0 || snakeArr[0].x > 17 || snakeArr[0].y <= 0 || snakeArr[0].y > 17) {
        score = 0;
        scorebox.innerHTML = score
        return true

    }
}

function gameEngine() {
    //updating the snake array and food
    if (isCollide(snakeArr)) {
        gameover.play();
        veloSnake = { x: 0, y: 0 }
        alert('Game over. Press any key ')
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }


    //if snake eaten the food
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        snakeArr.push({ x: snakeArr[0].x + veloSnake.x, y: snakeArr[0].y + veloSnake.y });
        eat.play()
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        for (let i = 1; i < snakeArr.length; i++) {
            if (food.x == snakeArr[i].x && food.y == snakeArr[i].y) {
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
            }
        }
        score = score + 1
        scorebox.innerHTML = score
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += veloSnake.x;
    snakeArr[0].y += veloSnake.y;


    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {

            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')

        }
        board.appendChild(snakeElement);

    })


    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}






///Main logic starts here
window.requestAnimationFrame(main)
document.addEventListener('keydown', e => {
    veloSnake = { x: 0, y: 1 }//start the game
        ;
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp')
            veloSnake.x = 0;
            veloSnake.y = -1;
            break;
        case 'ArrowDown':
            console.log('ArrowDown')
            veloSnake.x = 0;
            veloSnake.y = 1;
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft')
            veloSnake.x = -1;
            veloSnake.y = 0;
            break;
        case 'ArrowRight':
            console.log('ArrowRight')
            veloSnake.x = 1;
            veloSnake.y = 0;
            break;

        default:
            break;
    }
})

