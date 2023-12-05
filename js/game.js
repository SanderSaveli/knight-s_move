const board = generateBoard(5, 5)
const data = generateDataForGetAllMoveRequest(board, [2, 2])
sendValidMoveRequest(data)
sendMakeMoveRequest(generateDataForMakeMoveRequest(board, [0, 0], [2, 1]))

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

function generateDataForGetAllMoveRequest(board, cellFrom) {
	return {
		board: board,
		cellFrom: {
			x: cellFrom[0],
			y: cellFrom[1],
		},
	}
}
function generateDataForMakeMoveRequest(board, cellFrom, cellTo) {
	return {
		board: board,
		cellFrom: {
			x: cellFrom[0],
			y: cellFrom[1],
		},
		cellTo: {
			x: cellTo[0],
			y: cellTo[1],
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
	//обработчик ответа сервера по запросу всех возможных ходов
	console.log('allMove!')
	console.log(data.answerType)
	let cellsToMove = data.cellsToMove
}

function makeMoveCallback(data) {
	//обработчик ответа сервера по запросу совершения хода
	console.log('makeMove!')
	console.log(data.answerType)
	let board = data.board
}
