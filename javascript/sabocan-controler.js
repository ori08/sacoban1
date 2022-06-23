'use strict';

var undoBoard = []
var undoGamerPos = []
var isGlue = true

function moveSacoban(ev) {
    if (!isGlue) return

    // First Check if the game is over 
    isWin()
    if (!gGame.isOn) return
    // update the step score
    updateStepScore()



    var board = getBoard()
    var nextPos = getNextLocation(ev)
    var currPos = getSacobanPos()
    var currCell = board[currPos.i][currPos.j]
    var nextCell = board[nextPos.i][nextPos.j].type
    var nextCell_Element = board[nextPos.i][nextPos.j].gameElement




    if (nextCell_Element === GLUE) {
        isGlue = false
        stepCounter -= 10
        setTimeout(wait, 5000)

    }



    //if the next cell is a clock bonus: 
    if (nextCell_Element === CLOCK) {
        var player = getPlayer()
        player.isClock = true;
    }


    //if the next cell is a gold bonus: 
    if (nextCell_Element === GOLD) {
        score += 10
        document.querySelector("h2").innerText = `score: ${score} `

    }




    //if the next cell is a box: 
    if (nextCell_Element === BOX) {
        gGamerPos = nextPos
        var posAfterBox = getNextLocation(ev)
        var cellAfterBox = board[posAfterBox.i][posAfterBox.j]
        var cellBox = board[currPos.i][currPos.j]



        //if the cell after the box is empty traget without box!
        if (cellAfterBox.type === TARGET && cellAfterBox.gameElement != BOX) {

            //update the current cell
            if (cellBox.type === TARGET) cellBox.type = TARGET
            else cellBox.type = FLOOR


            //move the player 

            board[currPos.i][currPos.j].gameElement = "null"
            board[nextPos.i][nextPos.j].gameElement = SACOBAN

            //move the box
            board[posAfterBox.i][posAfterBox.j].gameElement = BOX


            // print the board and save backup to undo
            saveBoardBackup(board)
            printBoard()
            return

        }



        //if the cell after the box is a wall or other box
        else if (cellAfterBox.type === WALL || cellAfterBox.gameElement === BOX) {
            gGamerPos = currPos

            // print the board and save backup to undo
            saveBoardBackup(board)
            printBoard()
            return
        }



        //if the cell after the box is a floor
        else {



            //update the current cell
            if (cellBox.type === TARGET) board[currPos.i][currPos.j].type = TARGET
            else board[currPos.i][currPos.j].type = FLOOR

            //move the player 
            board[currPos.i][currPos.j].gameElement = "null"
            board[nextPos.i][nextPos.j].gameElement = SACOBAN

            //move the box
            board[posAfterBox.i][posAfterBox.j].gameElement = BOX


            // print the board and save backup to undo
            saveBoardBackup(board)
            printBoard()
            return
        }
    }


    //if the next cell is a floor: 
    if (nextCell === FLOOR) {
        gGamerPos = nextPos

        //update the current cell
        if (currCell.type === TARGET) board[currPos.i][currPos.j].type = TARGET
        else board[currPos.i][currPos.j].type = FLOOR

        //move the player 
        board[nextPos.i][nextPos.j].gameElement = SACOBAN
        board[currPos.i][currPos.j].gameElement = "null"

        // print the board and save backup to undo
        saveBoardBackup(board)
        printBoard()
        return
    }


    //if the next cell is a target: 
    if (nextCell === TARGET) {
        gGamerPos = nextPos


        //update the current cell
        if (currCell.type === TARGET) board[currPos.i][currPos.j].type = TARGET
        else board[currPos.i][currPos.j].type = FLOOR

        //move the player 
        board[nextPos.i][nextPos.j].gameElement = SACOBAN
        board[currPos.i][currPos.j].gameElement = "null"


        // print the board and save backup to undo
        saveBoardBackup(board)
        printBoard()
        return
    }
}

function saveBoardBackup(board) {

    var boardBackup = board
    var gamerPosBackup = gGamerPos
    saveToStorage("board", gamerPosBackup)
    saveToStorage("gamer", boardBackup)
    undoBoard.push(loadFromStorage("gamer"))
    undoGamerPos.push(loadFromStorage("board"))

}


function moveTo(i, j) {
    var ev
    var currPos = getSacobanPos()
    var nextLocation = { i: i, j: j }

    if (nextLocation.i - currPos.i === -1 && nextLocation.j === currPos.j)
        ev = { isTrusted: true, key: 'ArrowUp', code: 'ArrowUp' }
    else if (nextLocation.i - currPos.i === 1 && nextLocation.j === currPos.j)
        ev = { isTrusted: true, key: 'ArrowDown', code: 'ArrowDown' }
    else if (nextLocation.i === currPos.i && nextLocation.j - currPos.j === -1)
        ev = { isTrusted: true, key: 'ArrowLeft', code: 'ArrowLeft' }
    else if (nextLocation.i === currPos.i && nextLocation.j - currPos.j === 1)
        ev = { isTrusted: true, key: 'ArrowRight', code: 'ArrowRight' }
    else return




    moveSacoban(ev)

}

function wait() {
    isGlue = true



}