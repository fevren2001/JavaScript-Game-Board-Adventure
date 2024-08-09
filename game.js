// Arrow Keys are used for moving around.
// Space bar is used for digging.



// Function to save the game state to localStorage
function saveGameState() {
    const gameState = {
        remainingSteps: remainingSteps,
        remainingWater: remainingWater,
        characterName: characterName,
        roundNumber: roundNumber,
        playerPosition: playerPosition,
        gameBoard: gameBoard,
        clue1Digged: clue1Digged,
        clue2Digged: clue2Digged,
        clue3Digged: clue3Digged,
        item1Found: item1Found,
        item2Found: item2Found,
        item3Found: item3Found
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Function to load the game state from localStorage
function loadGameState() {
    const savedGameState = localStorage.getItem('gameState');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        remainingSteps = gameState.remainingSteps;
        remainingWater = gameState.remainingWater;
        characterName = gameState.characterName;
        roundNumber = gameState.roundNumber;
        playerPosition = gameState.playerPosition;
        gameBoard = gameState.gameBoard;
        clue1Digged = gameState.clue1Digged;
        clue2Digged = gameState.clue2Digged;
        clue3Digged = gameState.clue3Digged;
        item1Found = gameState.item1Found;
        item2Found = gameState.item2Found;
        item3Found = gameState.item3Found;
    }
}

// Call the loadGameState function when the script initializes
// loadGameState();




// Hide the canvas
document.getElementById('gameCanvas').style.display = 'none';
document.getElementById('topCanvas').style.display = 'none';

// Define variables for remaining steps and remaining water
let remainingSteps = 3;
let remainingWater = 5;
let characterName = "Player"
let roundNumber = 1;


// Set the initial time (1 minute = 60 seconds)
let timerSeconds = 60;

// Function to update the timer
function updateTimer() {
    timerSeconds--; // Decrement timer
    drawThirdSection()
    if (timerSeconds === 0) {
        // If timer reaches 0, trigger game over
        drawGameOver();
        clearInterval(timerInterval); // Stop the timer interval
    }
    saveGameState()
}

// Start the timer interval



document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);
});

// Get the youWonCanvas and its context
const youWonCanvas = document.getElementById('youWonCanvas');
const youWonCtx = youWonCanvas.getContext('2d');

// Function to draw the "You Won" message
function drawYouWon() {
    // Clear the canvas
    youWonCtx.clearRect(0, 0, youWonCanvas.width, youWonCanvas.height);

    // Set text style
    youWonCtx.fillStyle = 'black';
    youWonCtx.font = 'bold 24px Arial';

    // Calculate position to center the text horizontally and vertically
    const text = 'You Won!';
    const textWidth = youWonCtx.measureText(text).width;
    const x = (youWonCanvas.width - textWidth) / 2;
    const y = youWonCanvas.height / 2;

    // Draw the "You Won" message
    youWonCtx.fillText(text, x, y);
}

// Get the gameOverCanvas and its context
const gameOverCanvas = document.getElementById('gameOverCanvas');
const gameOverCtx = gameOverCanvas.getContext('2d');

// Function to draw the "Game Over" message
function drawGameOver() {
    // Clear the canvas
    gameOverCtx.clearRect(0, 0, gameOverCanvas.width, gameOverCanvas.height);

    // Set text style
    gameOverCtx.fillStyle = 'black';
    gameOverCtx.font = 'bold 24px Arial';

    // Calculate position to center the text horizontally and vertically
    const text = 'Game Over';
    const textWidth = gameOverCtx.measureText(text).width;
    const x = (gameOverCanvas.width - textWidth) / 2;
    const y = gameOverCanvas.height / 2;

    // Draw the "Game Over" message
    gameOverCtx.fillText(text, x, y);
}





// Define constants for tile types
const SAND_TILE = "sand";
const OASIS_TILE = "oasis";
const DROUGHT_TILE = "drought";
const FAKE_OASIS_TILE = "fakeOasis"
const OASIS_AFTER_DIG = "oasisAfterDig"
const NOT_REVEALED_ITEM1 = "notRevealedItem1"
const NOT_REVEALED_ITEM2 = "notRevealedItem2"
const NOT_REVEALED_ITEM3 = "notRevealedItem3"

const REVEALED_ITEM1 = "revealedItem1"
const REVEALED_ITEM2 = "revealedItem2"
const REVEALED_ITEM3 = "revealedItem3"

const CLUE1 = "clue1"
const CLUE2 = "clue2"
const CLUE3 = "clue3"

const NOT_REVEALED_CLUE1 = "notRevealedClue1"
const NOT_REVEALED_CLUE2 = "notRevealedClue2"
const NOT_REVEALED_CLUE3 = "notRevealedClue3"

let clue1Digged = 0
let clue2Digged = 0
let clue3Digged = 0

let item1Found = 0;
let item2Found = 0;
let item3Found = 0;


// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 100; // Size of each tile in pixels

const topCanvas = document.getElementById('topCanvas');
const topCtx = topCanvas.getContext('2d');

// Set the width and height of the top canvas
const canvasWidth = topCanvas.width;
const canvasHeight = topCanvas.height;

// Define the dimensions of each area
const numAreas = 3;
const areaWidth = canvasWidth / numAreas;

// Set the colors for each area
const areaColors = ['lightblue', 'lightgreen', 'lightgrey', 'lightcoral', 'lightsalmon'];

// Define initial player position (center of the board)
let playerPosition = { x: 2, y: 2 };

function changeWaterLevelGlobalVariable(number) {
    remainingWater = number
    saveGameState()

}
function changePlayerNameGlobalVariable(name) {
    characterName = name
    saveGameState()

}
function changeTimerGlobalVariable(value){
    timerSeconds = value
    saveGameState()

}
function startGame() {
    // Hide the main menu canvas
    const playerName = document.getElementById('playerName').value;
    const waterLevel = parseInt(document.getElementById('waterLevel').value, 10);
    const seconds = parseFloat(document.getElementById('timerLength').value)


    const menuContainer = document.getElementById('menuContainer');
    menuContainer.style.display = 'none';
    // Show the game canvas
    gameCanvas.style.display = 'block';
    topCanvas.style.display = 'block';
    changeWaterLevelGlobalVariable(waterLevel)
    changePlayerNameGlobalVariable(playerName)
    changeTimerGlobalVariable(seconds)
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
    drawAllSections(playerName)
    saveGameState()

}

function drawAllSections(characterName) {
    drawFirstSection(characterName)
    drawSecondSection()
    drawThirdSection()
    drawFourthSection()
    drawFifthSection()
    saveGameState()

}

function drawFirstSection(characterName) {
    let x = 0 * areaWidth;
    let y = 0;
    let width = areaWidth;
    let height = canvasHeight / 2;

    // Set the color for the current area
    topCtx.fillStyle = 'lightblue';

    // Draw the area
    topCtx.fillRect(x, y, width, height);

    // Draw Player 1 text
    topCtx.fillStyle = 'black';
    topCtx.font = '14px Arial';
    topCtx.fillText(characterName, x + 50, y + 20); // Adjust position as needed

    // Draw water bottle
    const waterBottleImg = new Image();
    waterBottleImg.src = 'Assets/Water.png';
    waterBottleImg.onload = function () {
        topCtx.drawImage(waterBottleImg, x + 10, y + 30, 30, 30); // Adjust position and size as needed

        // Draw water bottle quantity
        topCtx.fillStyle = 'black';
        topCtx.font = '12px Arial';
        topCtx.fillText(remainingWater, x + 50, y + 50); // Adjust position as needed
    };

    // Draw counter
    const counterImg = new Image();
    counterImg.src = 'Assets/Action Points.png';
    counterImg.onload = function () {
        topCtx.drawImage(counterImg, x + 10, y + 65, 30, 30); // Adjust position and size as needed

        // Draw counter quantity
        topCtx.fillStyle = 'black';
        topCtx.font = '12px Arial';
        topCtx.fillText(remainingSteps, x + 50, y + 85); // Adjust position as needed
    };

    saveGameState()

}
// 1

//  2
function drawSecondSection() {
    let x = 0 * areaWidth;
    let y = canvasHeight / 2;
    let width = areaWidth;
    let height = canvasHeight / 2;

    // Set the color for the current area
    topCtx.fillStyle = 'lightgreen';

    // Draw the area
    topCtx.fillRect(x, y, width, height);
    saveGameState()

}

let seconds = 0; // Define the seconds variable somewhere in your code

// 3
function drawThirdSection() {
    let x = 1 * areaWidth;
    let y = 0;
    let width = areaWidth;
    let height = canvasHeight;

    // Set the color for the current area
    topCtx.fillStyle = 'lightgrey';

    // Draw the area
    topCtx.fillRect(x, y, width, height);

    const roundText = 'Round ' + roundNumber;
    const roundTextWidth = topCtx.measureText(roundText).width;
    const roundTextX = x + (width - roundTextWidth) / 2; // Center horizontally for round text

    // Draw round number
    topCtx.fillStyle = 'black';
    topCtx.font = '16px Arial';
    topCtx.fillText(roundText, roundTextX, y + 20); // Draw round text on the canvas

    const timerText = 'Time: ' + formatTime(timerSeconds);
    const timerTextWidth = topCtx.measureText(timerText).width;
    const timerTextX = x + (width - timerTextWidth) / 2; // Center horizontally for timer text
    topCtx.fillText(timerText, timerTextX, y + 40); // Draw timer text on the canvas below the round number
    saveGameState()

}


// Function to format time (convert seconds to MM:SS format)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    saveGameState()

}
// 4 
function drawFourthSection() {
    let x = 2 * areaWidth;
    let y = 0;
    let width = areaWidth;
    let height = canvasHeight / 2;

    // Set the color for the current area
    topCtx.fillStyle = 'lightcoral';

    // Draw the area
    topCtx.fillRect(x, y, width, height);
    saveGameState()

}

// 5
function drawFifthSection() {
    let x = 2 * areaWidth;
    let y = canvasHeight / 2;
    let width = areaWidth;
    let height = canvasHeight / 2;

    // Set the color for the current area
    topCtx.fillStyle = 'lightsalmon';

    // Draw the area
    topCtx.fillRect(x, y, width, height);
    saveGameState()

}

// Example usage
let gameBoard = initializeBoard();


// Load oasis image
const oasisImg = new Image();
oasisImg.src = 'Assets/Oasis marker.png'; // Adjust the path to your "oasis.png" file
oasisImg.onload = function () {
    placeOases(gameBoard); // Place oases on the board
    drawBoard(); // Draw the game board
    drawPlayer(); // Draw the player's figure
};

// Load mirage image
const oasisAfterDig = new Image();
oasisAfterDig.src = 'Assets/Oasis.png'; // Adjust the path to your "mirage.png" file

// Load drought image
const droughtImg = new Image();
droughtImg.src = 'Assets/Drought.png'; // Adjust the path to your "drought.png" file

// Load ITEM 1 PIC
const item1Img = new Image();
item1Img.src = 'Assets/Item 1.png'

// Load ITEM 2 PIC
const item2Img = new Image();
item2Img.src = 'Assets/Item 2.png'

// Load ITEM 3 PIC
const item3Img = new Image();
item3Img.src = 'Assets/Item 3.png'

// Load Clue 1 PIC
const clue1Img = new Image();
clue1Img.src = 'Assets/Item 1 - clue.png'

// Load Clue 2 PIC
const clue2Img = new Image();
clue2Img.src = 'Assets/Item 2 - clue.png'

// Load Clue 3 PIC
const clue3Img = new Image();
clue3Img.src = 'Assets/Item 3 - clue.png'


// Function to initialize the game board
function initializeBoard() {
    // Initialize an empty 5x5 board
    let board = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            // Add sand tile to each position initially
            row.push(SAND_TILE);
        }
        board.push(row);
    }
    return board;
}


function drawGameBoard() {
    // Draw the game board
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            let tileColor = "#deb887"; // Default sand color (burlywood)

            let x = j * (TILE_SIZE + 2); // Calculate x position with gap between tiles
            let y = i * (TILE_SIZE + 2); // Calculate y position with gap between tiles
            ctx.fillStyle = tileColor;
            ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        }
    }
    saveGameState()

}

function drawOasis() {
    // Draw the oasis
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === OASIS_TILE) {
                // Draw oasis image on the canvas at the selected position
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(oasisImg, x, y, TILE_SIZE, TILE_SIZE);
            }
            // even though this is fake oasis, we still draw oasis image. We will change it when we dig
            if (gameBoard[i][j] === FAKE_OASIS_TILE) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(oasisImg, x, y, TILE_SIZE, TILE_SIZE);
            }
            if (gameBoard[i][j] === DROUGHT_TILE) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(droughtImg, x, y, TILE_SIZE, TILE_SIZE);
            }
            if (gameBoard[i][j] === OASIS_AFTER_DIG) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(oasisAfterDig, x, y, TILE_SIZE, TILE_SIZE);
            }
            if (gameBoard[i][j] === REVEALED_ITEM1) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(item1Img, x, y, TILE_SIZE, TILE_SIZE);
            }
            if (gameBoard[i][j] === REVEALED_ITEM2) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(item2Img, x, y, TILE_SIZE, TILE_SIZE);
            }
            if (gameBoard[i][j] === REVEALED_ITEM3) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(item3Img, x, y, TILE_SIZE, TILE_SIZE);
            }

            if (gameBoard[i][j] === NOT_REVEALED_ITEM1) {
                let tileColor = "#deb887"; // Default sand color (burlywood)
                let x = j * (TILE_SIZE + 2); // Calculate x position with gap between tiles
                let y = i * (TILE_SIZE + 2); // Calculate y position with gap between tiles
                ctx.fillStyle = tileColor;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }
            if (gameBoard[i][j] === NOT_REVEALED_ITEM2) {
                let tileColor = "#deb887"; // Default sand color (burlywood)
                let x = j * (TILE_SIZE + 2); // Calculate x position with gap between tiles
                let y = i * (TILE_SIZE + 2); // Calculate y position with gap between tiles
                ctx.fillStyle = tileColor;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }
            if (gameBoard[i][j] === NOT_REVEALED_ITEM3) {
                let tileColor = "#deb887"; // Default sand color (burlywood)
                let x = j * (TILE_SIZE + 2); // Calculate x position with gap between tiles
                let y = i * (TILE_SIZE + 2); // Calculate y position with gap between tiles
                ctx.fillStyle = tileColor;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }

            if (gameBoard[i][j] === CLUE1) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(clue1Img, x, y, TILE_SIZE, TILE_SIZE);
            }

            if (gameBoard[i][j] === CLUE2) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(clue2Img, x, y, TILE_SIZE, TILE_SIZE);
            }

            if (gameBoard[i][j] === CLUE3) {
                let x = j * (TILE_SIZE + 2);
                let y = i * (TILE_SIZE + 2);
                ctx.drawImage(clue3Img, x, y, TILE_SIZE, TILE_SIZE);
            }

            if (gameBoard[i][j] === NOT_REVEALED_CLUE1) {
                let tileColor = "#deb887"; // Default sand color (burlywood)
                let x = j * (TILE_SIZE + 2); // Calculate x position with gap between tiles
                let y = i * (TILE_SIZE + 2); // Calculate y position with gap between tiles
                ctx.fillStyle = tileColor;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }

            if (gameBoard[i][j] === NOT_REVEALED_CLUE2) {
                let tileColor = "#deb887"; // Default sand color (burlywood)
                let x = j * (TILE_SIZE + 2); // Calculate x position with gap between tiles
                let y = i * (TILE_SIZE + 2); // Calculate y position with gap between tiles
                ctx.fillStyle = tileColor;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }

            if (gameBoard[i][j] === NOT_REVEALED_CLUE3) {
                let tileColor = "#deb887"; // Default sand color (burlywood)
                let x = j * (TILE_SIZE + 2); // Calculate x position with gap between tiles
                let y = i * (TILE_SIZE + 2); // Calculate y position with gap between tiles
                ctx.fillStyle = tileColor;
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
            }


        }
    }
    saveGameState()

}


// Function to draw board (including oasis and player)
function drawBoard() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGameBoard();
    drawOasis();
    saveGameState()

}

const NUM_OASES = 4;

// Function to randomly place oases on the board, ensuring one of them is fake
function placeOases(board) {
    let fakeOasisPlaced = false; // Flag to track if fake oasis is placed
    for (let i = 0; i < NUM_OASES; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 5);
            col = Math.floor(Math.random() * 5);
        } while (board[row][col] !== SAND_TILE); // Ensure placing oasis on a sand tile

        console.log("The " + i + ". oasis is placed on: " + row + " " + col)
        // If fake oasis is not placed yet, place it
        if (!fakeOasisPlaced) {
            board[row][col] = FAKE_OASIS_TILE; // Mark as fake oasis
            fakeOasisPlaced = true; // Set flag to true
        } else {
            board[row][col] = OASIS_TILE; // Place a real oasis
        }
    }
    let row, col;

    do {
        row = Math.floor(Math.random() * 3) + 1 // random number between 2 and 4
        col = Math.floor(Math.random() * 3) + 1 // random number between 2 and 4
    } while (board[row][col] !== SAND_TILE);
    let item1Row, item1Col;
    item1Row = row;
    item1Col = col;
    board[row][col] = NOT_REVEALED_ITEM1

    do {
        row = Math.floor(Math.random() * 3) + 1 // random number between 2 and 4
        col = Math.floor(Math.random() * 3) + 1 // random number between 2 and 4
    } while (board[row][col] !== SAND_TILE);
    let item2Row, item2Col;
    item2Row = row;
    item2Col = col;
    board[row][col] = NOT_REVEALED_ITEM2

    do {
        row = Math.floor(Math.random() * 3) + 1 // random number between 2 and 4
        col = Math.floor(Math.random() * 3) + 1 // random number between 2 and 4
    } while (board[row][col] !== SAND_TILE);
    let item3Row, item3Col;
    item3Row = row;
    item3Col = col;
    board[row][col] = NOT_REVEALED_ITEM3


    // FOR THE CLUES. THE LOCATION CAN ONLY BE ON THE SIDES

    let item1clue1Row, item1clue1Col, item2clue1Row, item2clue1Col, item3clue1Row, item3clue1Col;
    function getRandom04() {
        // Generate a random number between 0 and 1
        var randomNumber = Math.random();

        // Map the random number to 0 or 4
        if (randomNumber < 0.5) {
            return 0;
        } else {
            return 4;
        }
    }
    let counter = 0
    do {
        item1clue1Row = getRandom04() // random number either 0 or 4
        item1clue1Col = item1Col
        counter += 1
        // console.log(item1clue1Row + " " + item1clue1Col)
    } while (board[item1clue1Row][item1clue1Col] !== SAND_TILE && counter < 100);
    console.log("Clue 1 is set here = " + item1clue1Row + " " + item1clue1Col)
    board[item1clue1Row][item1clue1Col] = NOT_REVEALED_CLUE1

    do {
        counter += 1
        item1clue1Col = getRandom04()
        item1clue1Row = item1Row
        // console.log("item1 clue : " +item1clue1Row + " " + item1clue1Col)

    } while (board[item1clue1Row][item1clue1Col] !== SAND_TILE && counter < 100)

    console.log("Clue 1 is set here = " + item1clue1Row + " " + item1clue1Col)

    board[item1clue1Row][item1clue1Col] = NOT_REVEALED_CLUE1


    // Let's do the same for clue 2

    do {
        item2clue1Row = getRandom04() // random number either 2 or 4
        item2clue1Col = item2Col
        counter += 1
        // console.log("item2 clue : " + item2clue1Row + " " + item2clue1Col)
    } while (board[item2clue1Row][item2clue1Col] !== SAND_TILE && counter < 100);
    console.log("Clue 2 is set here = " + item2clue1Row + " " + item2clue1Col)

    board[item2clue1Row][item2clue1Col] = NOT_REVEALED_CLUE2

    do {
        item2clue1Row = item2Row // random number either 2 or 4
        item2clue1Col = getRandom04()
        counter += 1
        // console.log("item2 clue : " + item2clue1Row + " " + item2clue1Col)
    } while (board[item2clue1Row][item2clue1Col] !== SAND_TILE && counter < 100);
    board[item2clue1Row][item2clue1Col] = NOT_REVEALED_CLUE2
    console.log("Clue 2 is set here = " + item2clue1Row + " " + item2clue1Col)

    // Let's do the same for clue 3

    do {
        item3clue1Row = getRandom04() // random number either 2 or 4
        item3clue1Col = item3Col
        counter += 1
        // console.log("item3 clue : " + item3clue1Row + " " + item3clue1Col)
    } while (board[item3clue1Row][item3clue1Col] !== SAND_TILE && counter < 100);
    board[item3clue1Row][item3clue1Col] = NOT_REVEALED_CLUE3
    console.log("Clue 3 is set here = " + item3clue1Row + " " + item3clue1Col)

    do {
        item3clue1Row = item3Row // random number either 2 or 4
        item3clue1Col = getRandom04()
        counter += 1
        // console.log("item3 clue : " + item3clue1Row + " " + item3clue1Col)
    } while (board[item3clue1Row][item3clue1Col] !== SAND_TILE && counter < 100);
    board[item3clue1Row][item3clue1Col] = NOT_REVEALED_CLUE3
    console.log("Clue 3 is set here = " + item3clue1Row + " " + item3clue1Col)


    if (counter >= 100) {
        console.log("Please restart the game.")
        restartGame()
    }
    saveGameState()

}

// Load player image
const playerImg = new Image();
playerImg.src = 'assets/Player.png'; // Adjust the path to your "Player.png" file
playerImg.onload = drawPlayer; // Call drawPlayer function after the image is loaded

// Function to draw player on the canvas
function drawPlayer() {
    // Calculate the position of the player's figure on the canvas
    let x = playerPosition.x * (TILE_SIZE + 2);
    let y = playerPosition.y * (TILE_SIZE + 2);
    // Draw the player's figure image on the canvas at the calculated position
    ctx.drawImage(playerImg, x, y, TILE_SIZE, TILE_SIZE);
    saveGameState()

}

// Function to handle player movement
function handlePlayerMovement(event) {

    // Get the key code of the pressed key
    const keyCode = event.keyCode;

    // Check if the pressed key is an arrow key
    if (keyCode >= 37 && keyCode <= 40) {
        // Calculate the new position based on the pressed key
        let newX = playerPosition.x;
        let newY = playerPosition.y;


        // remainingSteps -= 1;
        console.log(remainingSteps)
        let tempX = playerPosition.x;
        let tempY = playerPosition.y;

        if (keyCode === 37) { // Left arrow key
            newX = Math.max(0, newX - 1); // Move left
        } else if (keyCode === 38) { // Up arrow key
            newY = Math.max(0, newY - 1); // Move up
        } else if (keyCode === 39) { // Right arrow key
            newX = Math.min(4, newX + 1); // Move right
        } else if (keyCode === 40) { // Down arrow key
            newY = Math.min(4, newY + 1); // Move down
        }
        // Update player's position
        playerPosition.x = newX;
        playerPosition.y = newY;

        if (tempX !== newX || tempY !== newY) {
            remainingSteps -= 1;
        }

        if (remainingSteps === 0) {
            roundNumber += 1
            remainingWater -= 1
            remainingSteps = 3
        }
    }
    else if (keyCode === 32) { // Spacebar for digging
        remainingSteps -= 1;
        digTile(playerPosition.x, playerPosition.y);
        if (remainingSteps === 0) {
            roundNumber += 1
            remainingWater -= 1
            remainingSteps = 3
        }
    }
    if (remainingWater === 0) {
        document.getElementById('gameCanvas').style.display = 'none';
        document.getElementById('topCanvas').style.display = 'none';
        drawGameOver()
    }

    drawBoard();
    drawPlayer();



    drawFirstSection(characterName);
    drawThirdSection()
    console.log("Round number: " + roundNumber)
    saveGameState()

}

function digTile(x, y) {
    // Check the content of the tile at position (x, y)
    const tileType = gameBoard[y][x];
    if (tileType === OASIS_TILE) {
        // Replace oasis with realOasis.png if it's a real oasis
        gameBoard[y][x] = OASIS_AFTER_DIG;
        remainingWater += 6
        drawFirstSection(characterName);

    } else if (tileType === FAKE_OASIS_TILE) {
        // Replace sand with drought
        gameBoard[y][x] = DROUGHT_TILE;
    } else if (tileType === NOT_REVEALED_ITEM1 && clue1Digged === 2) {
        gameBoard[y][x] = REVEALED_ITEM1
        item1Found = 1;
    } else if (tileType === NOT_REVEALED_ITEM2 && clue2Digged === 2) {
        gameBoard[y][x] = REVEALED_ITEM2
        item2Found = 1;
    } else if (tileType === NOT_REVEALED_ITEM3 && clue3Digged === 2) {
        gameBoard[y][x] = REVEALED_ITEM3
        item3Found = 1;
    } else if (tileType === NOT_REVEALED_CLUE1 && clue1Digged !== 2) {
        clue1Digged += 1
        gameBoard[y][x] = CLUE1
    } else if (tileType === NOT_REVEALED_CLUE2 && clue2Digged !== 2) {
        clue2Digged += 1
        gameBoard[y][x] = CLUE2
    } else if (tileType === NOT_REVEALED_CLUE3 && clue3Digged !== 2) {
        clue3Digged += 1
        gameBoard[y][x] = CLUE3
    }
    // Redraw the game board
    if (item1Found && item2Found && item3Found) {
        document.getElementById('gameCanvas').style.display = 'none';
        document.getElementById('topCanvas').style.display = 'none';
        drawYouWon()

    }

    drawBoard();
    saveGameState()

}

// Function to handle name input
function handleNameInput() {
    const nameInput = document.getElementById('name-input');
    const userName = nameInput.value.trim(); // Trim whitespace from input
    localStorage.setItem('userName', userName); // Store the name in local storage
    saveGameState()

}

// Function to handle start game button click
function handleStartButtonClick() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        // If a name is stored in local storage, proceed to the game
        window.location.href = 'game.html';
    } else {
        // If no name is provided, prompt the user to enter a name
        alert('Please enter your name before starting the game.');
    }
    saveGameState()

}

function initializeGameBoard(characterName) {
    changePlayerNameGlobalVariable(characterName)
    saveGameState()


}

function restartGame() {
    window.location.reload(); // Reload the page
}

// Load water and action points images
const waterImg = new Image();
waterImg.src = 'Assets/Water.png';

const actionPointsImg = new Image();
actionPointsImg.src = 'Assets/Action points.png';




// Add event listener for keyboard input
document.addEventListener('keydown', handlePlayerMovement);

