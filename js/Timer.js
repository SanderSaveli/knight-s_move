export default class Timer {
	constructor(callBack) {
		this.player1Display = document.getElementById('player1-timer')
		this.player2Display = document.getElementById('player2-timer')
		this.callBack = callBack // Функция обратного вызова, вызываемая при истечении времени таймера

		this.timer1 = null // Таймер первого игрока
		this.timer2 = null // Таймер второго игрока

		this.activePlayer = 1 // Активный игрок (1 или 2)
	}

	startTimer() {
		this.stopTimers()

		if (this.activePlayer === 1) {
			this.player1Display.textContent = '00:30'
			this.timer1 = setInterval(() => {
				this.updateTimer(this.player1Display, this.timer1)
			}, 1000)
		} else {
			this.player2Display.textContent = '00:30'
			this.timer2 = setInterval(() => {
				this.updateTimer(this.player2Display, this.timer2)
			}, 1000)
		}
	}

	switchTimer() {
		this.stopTimers()

		this.activePlayer = this.activePlayer === 1 ? 2 : 1

		// Обновление времени для другого игрока
		if (this.activePlayer === 1) {
			this.updateTimer(this.player1Display, this.timer1)
		} else {
			this.updateTimer(this.player2Display, this.timer2)
		}

		// Запуск таймера для нового активного игрока
		this.startTimer()
	}

	stopTimers() {
		clearInterval(this.timer1)
		clearInterval(this.timer2)
	}

	restartTimers() {
		this.player1Display.textContent = '00:30'
		this.player2Display.textContent = '00:30'
	}

	updateTimer(displayElement, timer) {
		let time = displayElement.textContent.split(':')
		let minutes = parseInt(time[0])
		let seconds = parseInt(time[1])

		if (seconds === 0) {
			if (minutes === 0) {
				clearInterval(timer)
				if (this.callBack) {
					this.callBack()
				}
				return
			}
			minutes--
			seconds = 59
		} else {
			seconds--
		}
		const formattedTime = `${this.formatTime(minutes)}:${this.formatTime(
			seconds
		)}`
		console.log(formattedTime)
		displayElement.textContent = formattedTime // Обновление текстового поля с таймером
		return formattedTime
	}

	formatTime(time) {
		return time < 10 ? `0${time}` : time
	}
}
