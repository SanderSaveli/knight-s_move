import BoardDrawer from './BoardDrawer.js'
import showGameResult from './showWinPopup.js'
import gameConfig from './gameConfig.js'
import Timer from './Timer.js'
const timer = new Timer(gameEnd)
const drawer = new BoardDrawer()
const rows = localStorage.getItem('FieldSize')
const columns = localStorage.getItem('FieldSize')
console.log(rows)
let player = 'Player1'
let opponent = 'Player2'
let turn
let moveNumber = 0
let horsePos = { x: 3, y: 3 }
let board = generateBoard(rows, columns)
let cellsToMove

drawer.drawBoard(board)

const horseIMG = new Image()
horseIMG.onload = function () {
	drawer.drawImageOnCanvas(horseIMG, horsePos.x, horsePos.y, 1)
}
horseIMG.src = 'horse.svg'

const canvas = document.getElementById('canvas')
const canvasBorder = document.getElementById('canvasBorder')

gameStart()

function gameStart() {
	turn = player
	board = generateBoard(rows, columns)
	horsePos = { x: Math.floor(columns / 2), y: Math.floor(rows / 2) }
	drawFrame()
	canvasBorder.style.boxShadow = '0 0 10px 10px #9747ff'
	canvas.addEventListener('click', ClickOnCell)
	timer.restartTimers()
	timer.startTimer()
}

function changeTurn() {
	turn = turn == player ? opponent : player
	if (turn == player) {
		canvasBorder.style.boxShadow = '0 0 10px 10px #9747ff'
	} else {
		canvasBorder.style.boxShadow = '0 0 10px 10px #bf3bc4'
	}
	moveNumber++
	timer.switchTimer()
}

function gameEnd() {
	showGameResult(moveNumber % 2 == 0 ? 'Игрок 2' : 'Игрок 1', gameStart)
	canvas.removeEventListener('click', ClickOnCell)
	timer.stopTimers()
}

function ClickOnCell(event) {
	let clickedX = event.clientX - canvas.offsetLeft
	let clickedY = event.clientY - canvas.offsetTop
	for (let i = 0; i < board.length; i++) {
		let circlePos = drawer.coordinateToCanvasPos(i, 0)
		if (clickedX > circlePos.x && clickedX < circlePos.x + drawer.cellWidth) {
			for (let j = 0; j < board[i].length; j++) {
				let circlePos = drawer.coordinateToCanvasPos(i, j)
				if (
					clickedY > circlePos.y &&
					clickedY < circlePos.y + drawer.cellHeight
				) {
					sendMakeMoveRequest(
						generateDataForMakeMoveRequest(board, horsePos, { x: i, y: j })
					)
					break
				}
			}
			break
		}
	}
}

function generateBoard(width, height) {
	let board = new Array()
	for (let x = 0; x < width; x++) {
		board.push([])
		for (let y = 0; y < height; y++) {
			board[x].push(false)
		}
	}
	return board
}

function drawCellsToMove() {
	cellsToMove.forEach(element => {
		drawer.drawValidCell(element[0], element[1])
	})
}

function generateDataForGetAllMoveRequest() {
	return {
		board: board,
		cellFrom: {
			x: horsePos.x,
			y: horsePos.y,
		},
	}
}
function generateDataForMakeMoveRequest(board, cellFrom, cellTo) {
	return {
		board: board,
		cellFrom: {
			x: horsePos.x,
			y: horsePos.y,
		},
		cellTo: {
			x: cellTo.x,
			y: cellTo.y,
		},
	}
}

function sendMakeMoveRequest(data) {
	sendRequestToServer(data, '/php/makeMoveController.php', makeMoveCallback)
}

function sendValidMoveRequest(data) {
	sendRequestToServer(data, '/php/getMoveController.php', getAllMoveCallback)
}

function sendRequestToServer(data, url, callbackFunc) {
	let xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				//если запрос принят успешно вызываем функцию- обработчик
				const processedData = JSON.parse(xhr.responseText)
				callbackFunc(processedData)
			} else {
				console.error('Ошибка при запросе: ' + xhr.status)
			}
		}
	}

	// Отправляем POST запрос на серверный контроллер с массивом данных в виде JSON
	xhr.open('POST', url, true)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.send(JSON.stringify(data))
}

function getAllMoveCallback(data) {
	cellsToMove = data.cellsToMove
	if (cellsToMove.length == 0) {
		gameEnd()
	}
	drawCellsToMove()
}

function drawFrame() {
	drawer.drawBoard(board)
	sendValidMoveRequest(generateDataForGetAllMoveRequest())
	drawer.drawImageOnCanvas(horseIMG, horsePos.x, horsePos.y, 1)
}

function makeMoveCallback(data) {
	board = data.board
	if (horsePos != data.knightPos) {
		horsePos = data.knightPos
		changeTurn()
	}
	drawFrame()
}

window.addEventListener('resize', () => {
	drawFrame()
})

document.getElementById('giveUp').addEventListener('click', gameEnd)
