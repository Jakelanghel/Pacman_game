const scoreDisplay = document.getElementById('score')
const mobileUpBtn = document.getElementById('mobile-up-btn')
const mobileDownBtn = document.getElementById('mobile-down-btn')
const mobileLeftBtn = document.getElementById('mobile-left-btn')
const mobileRightBtn = document.getElementById('mobile-right-btn')

const width = 28
const grid = document.querySelector('.grid')
const squares = [];
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,1,1,1,1,1,1,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 349, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 350, 500)
]

//starting position of pacman 
let pacmanCurrentIndex = 490;

let score = 0;

createBoard();
squares[pacmanCurrentIndex].classList.add('pacman', "pacman-right")
document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);
mobileUpBtn.addEventListener("mousedown", mobileUp);
mobileDownBtn.addEventListener("mousedown", mobileDown);
mobileLeftBtn.addEventListener("mousedown", mobileLeft);
mobileRightBtn.addEventListener("mousedown", mobileRight);



function startGame() {
    // reset board
    createBoard();
    // reset pacman, ghosts, and score
    resetGame();
    // Hide startScreen
    hideStartScreen();
    // Draw ghosts on onto board
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add("ghost")
    });
    //move the ghosts
    ghosts.forEach(ghost => moveGhost(ghost))

}

function hideStartScreen() {
    const startScreen = document.getElementById("startScreen");
    startScreen.style.display = "none";
}

function checkForGameOver() {
    const currentPos = squares[pacmanCurrentIndex];

    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if(currentPos.classList.contains("ghost") && !currentPos.classList.contains("scared-ghost")) {
        //for each ghost - we need to stop it moving
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove eventlistener from our control function
        document.removeEventListener("keyup", control);
        //tell user the game is over
        const startScreen = document.getElementById("startScreen");
        const endGameMsg = document.getElementById("startTitle");
        const msg = `GAME OVER!!!
                    score: ${score}`
        endGameMsg.textContent = msg;
        startScreen.style.display = "block";
        startBtn.textContent = "Play again";

        
        
    }
    
    
}

function createBoard() {

    // Create Board

    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty

    for( let i = 0; i < layout.length; i++) {
        // Create square
        const square = document.createElement("div");
        // Add square to grid
        grid.appendChild(square);
        // push square to squares array
        squares.push(square);
        // check 
        if(layout[i] === 0) {
            squares[i].classList.add("pac-dot");
        }else if(layout[i] === 1) {
            squares[i].classList.add("wall");
        }else if(layout[i] === 2) {
            squares[i].classList.add("ghost-lair");
        }else if(layout[i] === 3) {
            squares[i].classList.add("power-pellet");
        }else if(layout[i] === 4) {
            squares[i].classList.add("empty");
        }
    }
}

function control(e) {

    switch(e.key) {
        case "ArrowUp":
        moveUp();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;

        case "ArrowDown":
        moveDown();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;

        case "ArrowLeft":
        moveToLeft();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;

        case "ArrowRight":
        moveToRight();
        eatPacDot();
        eatPowerPellet()
        eatGhost();
        checkForGameOver();
        break;
    }
}

function mobileUp() {
    moveUp();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function mobileDown() {
    moveDown();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function mobileLeft() {
    moveToLeft();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function mobileRight() {
    moveToRight();
    eatPacDot();
    eatPowerPellet()
    checkForGameOver();
}

function moveUp() {
    // set variable for pacmans next position
    const nextIndex = pacmanCurrentIndex - width;
    // squares[pacmanCurrentIndex].classList.add('pacman-up')
    // check to make sure pacmans next position is not off board and is not a wall
    if(nextIndex >= 0 && !squares[nextIndex].classList.contains("wall")) {
        // move pacman up one position
        squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
        pacmanCurrentIndex = nextIndex;
        squares[pacmanCurrentIndex].classList.add("pacman-up", "pacman");
    }
}

function moveDown() {
    // set variables for pacmans next index, next position on board, and last possible down position
    const nextIndex = pacmanCurrentIndex + width;
    const nextPos = squares[nextIndex];
    const lastIndex = width * width;

    // check to make sure pacmans next position is not off board 
    if(nextIndex < lastIndex) {
        // check for wall
        if(nextPos.classList.contains("wall")){
            console.log("HIT A WALL")
        // check for ghost lair
        }else if(nextPos.classList.contains("ghost-lair")){
            console.log("GHOST_LAIR");
        }else {
             // move pacman down 
             squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
             pacmanCurrentIndex = nextIndex;
             squares[pacmanCurrentIndex].classList.add("pacman-down", "pacman");
        }
    }
}

function moveToLeft() {
    // set variables for pacmans next position and last possible left position
    const lastIndex = pacmanCurrentIndex % width;
    const nextIndex = pacmanCurrentIndex - 1;
    

    // check to make sure pacmans next position is not off board && is not a wall
    if(lastIndex !== 0 && !squares[nextIndex].classList.contains("wall")) {
        // move pacman to left one position 
        squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
        pacmanCurrentIndex = nextIndex;
        squares[pacmanCurrentIndex].classList.add("pacman-left", "pacman");
        // check to see if pacman is going thru tunnel
        if(pacmanCurrentIndex === 364) {
            // move pacman accros the board
            squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
            pacmanCurrentIndex = 391;
            squares[pacmanCurrentIndex].classList.add("pacman-left", "pacman");
    }
}


    
    
}

function moveToRight() {
    // set variables for pacmans next position & the boards last right position
    const nextIndex = pacmanCurrentIndex + 1;
    const lastIndex = pacmanCurrentIndex % width;

    
    // check to make sure pacmans next position is not off board && is not a wall
    if(lastIndex < width - 1 && !squares[nextIndex].classList.contains("wall")) {
        // move pacman to the next right position
        squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
        pacmanCurrentIndex = nextIndex;
        squares[pacmanCurrentIndex].classList.add("pacman-right", "pacman");

        // check to see if pacman is going thru tunnel
        if(pacmanCurrentIndex === 391) {
            // move pacman accros the board
            squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
            pacmanCurrentIndex = 364;
            squares[pacmanCurrentIndex].classList.add("pacman-right", "pacman");
        }
    }
}

function eatPacDot() {
    const currentPos = squares[pacmanCurrentIndex];

    if(currentPos.classList.contains("pac-dot")) {
        currentPos.classList.remove("pac-dot");
        score ++;
        scoreDisplay.textContent = score;
    }
}

function eatPowerPellet() {
    let currentPos = squares[pacmanCurrentIndex];

    if(currentPos.classList.contains("power-pellet")) {
        currentPos.classList.remove("power-pellet");
        score += 10;
        scoreDisplay.textContent = score;
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 10000);
    }
}

function eatGhost() {
    if(squares[pacmanCurrentIndex].classList.contains("scare-ghost")) {
        squares[ghost.currentIndex].classList.remove('scared-ghost', 'ghost', ghost.className)
        score += 100;
        scoreDisplay.textContent = score;
        ghost.currentIndex = ghost.startIndex;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
    }
}

function moveGhost(ghost) {
    const directions = [ -1, +1, -width, +width ]
    let len = directions.length;
    let randDirection = Math.floor(Math.random() * len)
    let direction = directions[randDirection];

    ghost.timerId = setInterval(function() {
        //if the next square does NOT contain a wall and does not contain a ghost
        let nextIndex = ghost.currentIndex + direction;
        let nextPos = squares[nextIndex];
        if(!nextPos.classList.contains("wall") && !nextPos.classList.contains("ghost")){
             //remove any ghost
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost")
            //add direction to current Index
            ghost.currentIndex += direction
            //add ghost class
            squares[ghost.currentIndex].classList.add(ghost.className)
            squares[ghost.currentIndex].classList.add("ghost")
        }else {
            randDirection = Math.floor(Math.random() * len)
            direction = directions[randDirection]
        }

        //if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
            if(squares[ghost.currentIndex].classList.contains("pacman")) {
                squares[ghost.currentIndex].classList.remove('scared-ghost', 'ghost', ghost.className)
                score += 100;
                scoreDisplay.textContent = score;
                ghost.currentIndex = ghost.startIndex;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
            }
        }
        checkForGameOver();
    }, ghost.speed )
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false);
}

function resetGame() {

    score = 0;
    scoreDisplay.textContent = 0;
    squares[pacmanCurrentIndex].classList.remove("pacman-left", "pacman-right", "pacman-up", "pacman-down", "pacman");
    pacmanCurrentIndex = 490;
    squares[pacmanCurrentIndex].classList.add("pacman-right", "pacman");

    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove("ghost")
    });

    ghosts.forEach(ghost => {
        ghost.currentIndex = ghost.startIndex;
    })
}















