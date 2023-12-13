const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt').join('\n').split('\n\n')

let res = 0

const validMirror = (line, startIndex) => {
	let isValidMirror = true
	for (let offset = 1; offset <= startIndex; offset++) {
		if (startIndex - offset < 0 || startIndex + 1 + offset >= line.length) {
			break
		}
		if (line[startIndex - offset] !== line[startIndex + 1 + offset]) {
			isValidMirror = false
			break
		}
	}
	return isValidMirror
}

const flipMatrix = (matrix) => {
	let [row] = matrix
	return row.map((value, column) => matrix.map((row) => row[column]))
}

const firstLevel = () => {
	const horizontalLines = []
	const verticalLines = []
	data.forEach((pattern, i) => {
		const fullPattern = pattern.split('\n')
		for (let y = 0; y < fullPattern.length - 1; y++) {
			if (fullPattern[y] === fullPattern[y + 1]) {
				if (validMirror(fullPattern, y)) horizontalLines.push(y + 1)
			}
		}
	})
	res += horizontalLines.reduce((acc, val) => acc + val * 100, 0)
	const toMatrix = data.map((pattern) =>
		pattern.split('\n').map((line) => line.split(''))
	)
	toMatrix.forEach((pattern) => {
		const matrixTransposed = flipMatrix(pattern)
			.join('\n')
			.replaceAll(',', '')
		const fullPattern = matrixTransposed.split('\n')
		for (let y = 0; y < fullPattern.length - 1; y++) {
			if (fullPattern[y] === fullPattern[y + 1]) {
				if (validMirror(fullPattern, y)) verticalLines.push(y + 1)
			}
		}
	})
	res += verticalLines.reduce((acc, val) => acc + val, 0)
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	console.log('Second level solution:\t', res)
}

firstLevel()
// secondLevel()
