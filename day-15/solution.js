const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')

let res = 0

const firstLevel = () => {
	const input = data.join('\n').replaceAll("\n", "").split(",")
	input.forEach((val) => {
		res += val.split('').reduce((acc, letter) => {
			acc += letter.charCodeAt(0)
			acc *= 17
			acc %= 256
			return acc
		}, 0)
	})
	console.log("First level solution:\t", res)
}

const secondLevel = () => {
	console.log("Second level solution:\t", res)
}

firstLevel()
// secondLevel()
