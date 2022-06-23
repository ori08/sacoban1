'use strict';
const WALL = '☐';
const FLOOR = '0';
const BOX = '⚪';
const TARGET = '*';
const CLOCK = "8"
const GOLD = "9"
const Magnet = "7"
const GLUE = "6"
const WATER = "5"


var gBoard;

var counter = 0
var stepCounter = 100
var freeStep = 10;
var startInterval
var resetInterval

var emptyCell
var emptyCellObsticle


var bonusSwitch = 1
var obsteclesSwitch = 1




var isBonus = true
var isObseticle = true



var score = 0;


var interval_01
var interval_02
var interval_03
var interval_04


var gGame = {
    score: 0,
    isOn: false,
    stepCount: 0,
    collectedTarget: 0,
};

function init() {
    clearIntervals()
    gGame.isOn = true
    resetCounters()
    resetPlayerPos()
    gBoard = createBoard()
    gSacoban = createSacoban()


    interval_01 = setInterval(addBonus, 10000)
    interval_02 = setInterval(clearBonus, 5000)
    interval_03 = setInterval(addObstacles, 10000)
    interval_04 = setInterval(clearObsitcle, 5000)









    printBoard()
}



function createBoard() {
    const size = { x: 9, y: 8 }

    const wall = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 0], [1, 1], [1, 2], [1, 6], [1, 7],
    [2, 0], [2, 6], [2, 7],
    [3, 0], [3, 1], [3, 2], [3, 6], [3, 7],
    [4, 0], [4, 2], [4, 3], [4, 6], [4, 7],
    [5, 0], [5, 2], [5, 7], [5, 7],
    [6, 0], [6, 7],
    [7, 0], [7, 7],
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7]
    ]
    const box = [[2, 3], [3, 4], [4, 4], [6, 1], [6, 3], [6, 4], [6, 5]]

    const target = [[2, 1], [3, 5], [4, 1], [5, 4], [6, 6], [7, 4]]

    var board = createEmpetyBoard(size.x, size.y)
    createWall(board, wall)
    createBox(board, box)
    createTraget(board, target)
    // setSacoban(board)

    return board

}

function createEmpetyBoard(width, height) {
    var board = []
    for (var i = 0; i < width; i++) {
        board[i] = []
        for (var j = 0; j < height; j++) {
            var cell = {
                type: FLOOR,
                gameElement: "null"
            }
            board[i][j] = cell
        }
    }
    return board
}


function createWall(board, wall) {

    for (var i = 0; i < wall.length; i++) {
        var x = wall[i][0]
        var y = wall[i][1]
        var cell = {
            type: WALL,
            gameElement: "null"
        }
        board[x][y] = cell
    }

    return board
}

function createBox(board, box) {

    for (var i = 0; i < box.length; i++) {
        var x = box[i][0]
        var y = box[i][1]
        var cell = {
            type: FLOOR,
            gameElement: BOX
        }
        board[x][y] = cell
    }

    return board
}

function createTraget(board, target) {
    for (var i = 0; i < target.length; i++) {
        var x = target[i][0]
        var y = target[i][1]
        var cell = {
            type: TARGET,
            gameElement: "null"
        }


        board[x][y] = cell
    }
    return board
}

function getBoard() {
    return gBoard
}



function printBoard() {
    var board = getBoard()
    var strHtml = ""

    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j].type
            var cellElement = board[i][j].gameElement

            if (cell === FLOOR) strHtml += `<td class="floor cell " onclick="moveTo(${i},${j})" >`

            if (cell === WALL) strHtml += `<td class="wall cell" onclick="moveTo(${i},${j})" >`
            if (cell === TARGET) strHtml += `<td class="target cell " onclick="moveTo(${i},${j})">`
            if (cellElement === SACOBAN) strHtml += `<img src="pics/Character.png"></img>`
            if (cellElement === BOX) strHtml += `<img src="pics/box.png"></img>`
            if (cellElement === CLOCK) strHtml += `<img src="pics/clock.png"></img>`
            if (cellElement === GOLD) strHtml += `<img src="pics/gold.png"></img>`
            if (cellElement === Magnet) strHtml += `<img src="pics/magnet.png"></img>`
            if (cellElement === GLUE) strHtml += `<img src="pics/glue.png"></img>`
            if (cellElement === WATER) strHtml += `<img src="pics/water.png"></img>`


        }
        strHtml += `</td > `
        strHtml += `</tr > `
    }

    document.querySelector(".table").innerHTML = strHtml

}





function isWin() {
    var board = getBoard()
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type === TARGET && board[i][j].gameElement === BOX) counter++
        }
    }
    if (counter === 6) {
        alert("u win")
        gGame.isOn = false

        init();
        return
    }
    counter = 0;

}




function undo() {
    console.log(undoGamerPos)
    console.log(undoBoard.length)


    if (undoBoard.length - 1 >= 1) {
        undoBoard.pop()
        undoGamerPos.pop()
    }
    gBoard = undoBoard[undoBoard.length - 1]
    gGamerPos = undoGamerPos[undoGamerPos.length - 1]

    printBoard()
}



function updateStepScore() {
    var player = getPlayer()

    if (player.isClock) {
        freeStep--
        if (freeStep === 0) {
            player.isClock = false
            freeStep = 10
        }
    }
    else {
        stepCounter--
        document.querySelector("h1").innerText = stepCounter
    }
}

function resetCounters() {
    document.querySelector("h1").innerText = "100"
    counter = 0;
    stepCounter = 100;

}




function addBonus() {
    console.log(bonusSwitch)
    if (bonusSwitch > 3) bonusSwitch = 1


    if (bonusSwitch === 1) {
        createClock()
        bonusSwitch++
    }
    else if (bonusSwitch === 2) {
        createGold()
        bonusSwitch++
    }
    else if (bonusSwitch === 3) {
        createMagnet()
        bonusSwitch++
    }
}



function createClock() {
    var board = gBoard
    isBonus = true;
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type === FLOOR && board[i][j].gameElement === "null") emptyCells.push({ i: i, j: j })
        }
    }

    emptyCell = emptyCells[getRandomIntInc(0, emptyCells.length - 1)]
    board[emptyCell.i][emptyCell.j].gameElement = CLOCK
    printBoard()



}

function createGold() {
    var board = gBoard
    isBonus = true
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type === FLOOR && board[i][j].gameElement === "null") emptyCells.push({ i: i, j: j })
        }
    }

    emptyCell = emptyCells[getRandomIntInc(0, emptyCells.length - 1)]
    board[emptyCell.i][emptyCell.j].gameElement = GOLD
    printBoard()

}

function createMagnet() {
    var board = gBoard
    isBonus = true
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type === FLOOR && board[i][j].gameElement === "null") emptyCells.push({ i: i, j: j })
        }
    }

    emptyCell = emptyCells[getRandomIntInc(0, emptyCells.length - 1)]
    board[emptyCell.i][emptyCell.j].gameElement = Magnet
    printBoard()

}


function clearBonus() {

    isBonus = !isBonus
    if (isBonus) {
        var board = getBoard()
        board[emptyCell.i][emptyCell.j].gameElement = "null"
        printBoard()
    }
}



function clearObsitcle() {

    isObseticle = !isObseticle
    if (isObseticle) {
        var board = getBoard()
        board[emptyCellObsticle.i][emptyCellObsticle.j].gameElement = "null"
        printBoard()
    }
}




function addObstacles() {
    if (obsteclesSwitch > 2) obsteclesSwitch = 1

    if (obsteclesSwitch === 1) {
        createGlue()
        obsteclesSwitch++
    }
    else if (obsteclesSwitch === 2) {
        createWater()
        obsteclesSwitch++
    }
}


function createGlue() {
    var board = gBoard
    isObseticle = true
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type === FLOOR && board[i][j].gameElement === "null") emptyCells.push({ i: i, j: j })
        }
    }

    emptyCellObsticle = emptyCells[getRandomIntInc(0, emptyCells.length - 1)]
    board[emptyCellObsticle.i][emptyCellObsticle.j].gameElement = GLUE
    printBoard()
}

function createWater() {
    var board = gBoard
    isObseticle = true
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].type === FLOOR && board[i][j].gameElement === "null") emptyCells.push({ i: i, j: j })
        }
    }

    emptyCellObsticle = emptyCells[getRandomIntInc(0, emptyCells.length - 1)]
    board[emptyCellObsticle.i][emptyCellObsticle.j].gameElement = WATER
    printBoard()
}



function getRandomIntInc(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}



function clearIntervals() {
    clearInterval(interval_01)
    clearInterval(interval_02)
    clearInterval(interval_03)
    clearInterval(interval_04)
}





