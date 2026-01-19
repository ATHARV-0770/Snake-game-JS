// alert("Js is running")


let movesound = new Audio('Assest/move.mp3');
let inputDir = { x: 1, y: 0 };
let foodsound = new Audio("Assest/food.mp3");
let gameover = new Audio('Asset/gameover.mp3');
let lastTime = 0;
let speed = 9;
let snakeArr = [{ x: 13, y: 17 }];
let food = { x: 8, y: 8 };
let score =0;

// preload sound 
movesound.preload = "auto";
foodsound.preload = "auto";
gameover.preload = "auto";

// Game function 
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 < 1 / speed) {
        return;
    };
    lastTime = ctime;
    
    gameEngine();


}

function gameEngine() {
    //  Display food and snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    // Displays food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


    // COLLISION

    
    function isCollide(snake){
        for(let i=1; i< snake.length; i++){
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                return true;
            }
        }

        if(snake[0].x >18 || snake[0].x <1 || snake[0].y >18 || snake[0].y <1){
            return true;
        }
        return false;
    }


    if(isCollide(snakeArr)){
        gameover.volume =0.2;
        gameover.play();
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER !!!!! Press any key to continue")
        movesound.pause();
        food = {
            x: Math.floor(1 + 17*Math.random()),
            y: Math.floor(1 + 17*Math.random())
        };
        snakeArr = [{ x: 13, y: 17 }];
        score = 0;
    }

    if(snakeArr[0].x=== food.x && snakeArr[0].y === food.y){
        score +=1;
        if(score>hiscoreval){
            hiscoreval= score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = "Hi Score: " + hiscoreval;
            
        }
        scorebox.innerHTML = "Score: " + score;
        foodsound.currentTime = 0;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        // foodsound.play();
        let a= 1;
        let b= 18;
        food = { x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b - a)*Math.random())};
    }

    // Moving the snake 
    for(let i=snakeArr.length - 2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;





}




// Main logic startsv here 
let hiscore = localStorage.getItem("hiscore");
if (hiscore === 0) {
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscorebox.innerHTML = "Hi Score: " + hiscore;
}


window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    e.preventDefault();
    // inputDir = { x: 0, y: 1 }
    function playmovesound(){
        const s = movesound.cloneNode();
        s.volume = 0.3;
        s.play();
    }
    switch (e.key) {
        case "ArrowUp":
            console.log(e.key);
            if(inputDir.y === 0){
            inputDir={x:0, y: -1}};
            break;

        case "ArrowDown":
            console.log(e.key);
            if(inputDir.y === 0){
            inputDir={x: 0, y: 1}};
            break;

        case "ArrowRight":
            console.log(e.key);
            if(inputDir.x === 0){
            inputDir.x = 1;
            inputDir.y = 0;}
            break;

        case "ArrowLeft":
            console.log(e.key);
            if(inputDir.x === 0){
            inputDir.x = -1;
            inputDir.y = 0;}
            break;
    }

});
