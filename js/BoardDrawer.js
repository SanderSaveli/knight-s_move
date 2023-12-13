export default class BoardDrawer {
	constructor() {
		this.canvas = document.getElementById('canvas')
		this.ctx = canvas.getContext('2d')
		this.padding = 10
		this.emptyCellColor = '#24272e'
		this.lockCellColor = '#484b59'
		this.validMoveColor = '#9747ff'
		this.borderRadius = 10
		this.drawBoard = this.drawBoard.bind(this)
	}
	resizeCanvas() {
		const canvasStyle = getComputedStyle(this.canvas)
		const canvasWidth = parseInt(canvasStyle.getPropertyValue('width'), 10)
		const canvasHeight = parseInt(canvasStyle.getPropertyValue('height'), 10)

		this.canvas.width = canvasWidth
		this.canvas.height = canvasHeight

		const columns = this.board.length
		const rows = this.board[0].length
		const availableWidth = this.canvas.width - (columns + 1) * this.padding
		const availableHeight = this.canvas.height - (rows + 1) * this.padding

		this.cellWidth = availableWidth / columns
		this.cellHeight = availableHeight / rows
	}

	drawBoard(board) {
		this.board = board
		const columns = board.length
		const rows = board[0].length
		this.resizeCanvas()
		const canvasWidth = this.canvas.width
		const canvasHeight = this.canvas.height
		this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)

		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				const x = i * (this.cellWidth + this.padding) + this.padding
				const y = j * (this.cellHeight + this.padding) + this.padding

				this.ctx.beginPath()
				if (board[i][j]) {
					this.ctx.fillStyle = this.lockCellColor
				} else {
					this.ctx.fillStyle = this.emptyCellColor
				}
				this.drawRoundedSquare(
					this.ctx,
					x,
					y,
					this.cellWidth,
					this.cellHeight,
					this.borderRadius
				)
				this.ctx.fill()
				this.ctx.closePath()
			}
		}
	}

	drawValidCell(x, y) {
		this.ctx.beginPath()
		this.ctx.fillStyle = this.validMoveColor
		const X = x * (this.cellWidth + this.padding) + this.padding
		const Y = y * (this.cellHeight + this.padding) + this.padding
		this.drawRoundedSquare(
			this.ctx,
			X,
			Y,
			this.cellWidth,
			this.cellHeight,
			this.borderRadius
		)
		this.ctx.fill()
		this.ctx.closePath()
	}

	drawRoundedSquare(ctx, x, y, width, height, radius) {
		ctx.beginPath()
		ctx.moveTo(x + radius, y)
		ctx.lineTo(x + width - radius, y)
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
		ctx.lineTo(x + width, y + height - radius)
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
		ctx.lineTo(x + radius, y + height)
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
		ctx.lineTo(x, y + radius)
		ctx.quadraticCurveTo(x, y, x + radius, y)
		ctx.closePath()
	}

	coordinateToCanvasPos(X, Y) {
		const canvasX = X * (this.cellWidth + this.padding) + this.padding
		const canvasY = Y * (this.cellHeight + this.padding) + this.padding

		return { x: canvasX, y: canvasY }
	}

	drawImageOnCanvas(image, x, y, cellPercent) {
		let pos = this.coordinateToCanvasPos(x, y)
		const width = this.cellWidth * cellPercent
		const height = this.cellHeight * cellPercent
		this.ctx.drawImage(image, pos.x, pos.y, width, height)
	}
}
