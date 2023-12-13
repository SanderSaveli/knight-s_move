const squares = document.querySelectorAll('.fieldConfig')
import gameConfig from './gameConfig.js'

setSize(7)
document.getElementById('normal').classList.add('selected')

squares.forEach((square, index) => {
	square.addEventListener('click', () => {
		deselectAll()
		square.classList.add('selected')
		switch (square.id) {
			case 'small':
				gameConfig.fieldSize.x = 7
				gameConfig.fieldSize.y = 7
				setSize(7)
				break
			case 'normal':
				gameConfig.fieldSize.x = 9
				gameConfig.fieldSize.y = 9
				setSize(9)
				break
			case 'big':
				gameConfig.fieldSize.x = 11
				gameConfig.fieldSize.y = 11
				setSize(11)
				break
			default:
				break
		}
	})
})

function setSize(value) {
	localStorage.setItem('FieldSize', value)
}

function deselectAll() {
	squares.forEach(square => {
		square.classList.remove('selected')
	})
}
