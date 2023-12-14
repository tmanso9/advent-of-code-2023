const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')

let res = 0

const firstLevel = () => {
	let transposed = []
	for (let y in data) {
		for (let x in data[y]) {
			transposed[x] = transposed[x] || ''
			transposed[x] += data[y][x]
		}
	}

	transposed.forEach((line, y) => {
		let parts = line.split('#')
		for (let x = 0; x < parts.length; x++) {
			parts[x] = parts[x].split('').sort().reverse().join('')
		}

		transposed[y] = parts.join('#')
		// console.log(transposed[y])
	})

	transposed.forEach((line) => {
		for (let i = 0; i < line.length; i++) {
			if (line[i] === 'O') {
				res += line.length - i
			}
		}
	})
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	res = 0
	console.log('Second level solution:\t', res)
}

firstLevel()
// secondLevel()
