export default function showGameResult(playerNick, restartCallback) {
	const popup = document.createElement('div')
	const popupRow = document.createElement('div')
	popup.classList.add('popup')

	const resultText = document.createElement('p')
	resultText.textContent = playerNick + ' победил!' // Здесь можно указать реальный результат игры

	const rematchButton = document.createElement('button')
	rematchButton.textContent = 'Реванш'
	rematchButton.addEventListener('click', () => {
		restartCallback()
		hidePopup()
	})

	const menuButton = document.createElement('button')
	menuButton.textContent = 'Выйти в меню'
	menuButton.addEventListener('click', () => {
		window.location.href = '/home.html'
	})

	popup.appendChild(resultText)
	popup.appendChild(popupRow)
	popupRow.appendChild(rematchButton)
	popupRow.appendChild(menuButton)
	document.body.appendChild(popup)
	popup.classList.add('popup')
	popupRow.classList.add('row')

	function hidePopup() {
		document.body.removeChild(popup)
	}
}
