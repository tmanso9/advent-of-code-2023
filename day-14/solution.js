const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')

let res = 0

const allZerosBefore = ((line, i) => {
	let x = 0
	if (line[i - 1] === '#') return true
	while (line[x] && line[x] === '#') x++
	while (line[x] && x < i) {
		if (line[x] !== 'O') return false
		x++
	}
	return true
})

const moveZeroUp = ((line, i) => {
	let copyLine = line.split('')
	let x = i - 1
	while (x >= 0 && copyLine[x] !== '#') {
		let temp = copyLine[x]
		copyLine[x] = copyLine[i]
		copyLine[i] = temp
		x--
		i--
	}
	return copyLine.join().replaceAll(',', '')
})

const firstLevel = () => {
	let transposed = []
	for (let y in data) {
		for (let x in data[y]) {
			transposed[x] = transposed[x] || ''
			transposed[x] += data[y][x]
		}
	}

	transposed.forEach((line, y) => {
		for (let i = 0; i < line.length; i++) {
			if (line[i] === 'O') {
				let x = i
				while (line[x] === 'O' && !allZerosBefore(line, x)) {
					line = moveZeroUp(line, x)
					x--
				}
			}
		}
		transposed[y] = line
	})

	transposed.forEach((line) => {
		for (let i = 0; i < line.length; i++) {
			if (line[i] === 'O') {
				res += (line.length - i)
			}
		}
	})
	console.log("First level solution:\t", res)
}

const secondLevel = () => {
	res = 0
	console.log("Second level solution:\t", res)
}

firstLevel()
// secondLevel()
