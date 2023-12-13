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

const findDiffInStrings = (s1, s2) => {
	// console.log(`comparing ${s1} and ${s2}`)
	let diff = 0
	for (let i = 0; i < s1.length; i++) {
		if (s1[i] !== s2[i]) diff++
	}
	// console.log(`diff is ${diff}`)
	return diff
}

const validMirrorWithSmudges = (line, startIndex) => {
	let isValidMirror = true
	let smudges = startIndex ? 0 : 1
	for (let offset = 1; offset <= startIndex; offset++) {
		if (
			(startIndex && startIndex - offset < 0) ||
			startIndex + 1 + offset >= line.length
		) {
			break
		}
		// console.log(`line is ${line[startIndex - offset]}`)
		const diff = findDiffInStrings(
			line[startIndex - offset],
			line[startIndex + 1 + offset]
		)
		// console.log(diff)
		if (diff === 1) {
			smudges++
		}
		if (
			line[startIndex - offset] !== line[startIndex + 1 + offset] &&
			smudges !== 1
		) {
			isValidMirror = false
			break
		}
	}
	return isValidMirror && smudges === 1
}

const secondLevel = () => {
	res = 0
	data.forEach((pattern) => {
		let rows = pattern.split('\n')

		let transposed = []
		for (let y in rows) {
			for (let x in rows[y]) {
				transposed[x] = transposed[x] || ''
				transposed[x] += rows[y][x]
			}
		}

		res += checkMirrors(rows, 100)
		res += checkMirrors(transposed, 1)

		function checkMirrors(input, multiplier) {
			for (let i = 0; i < input.length - 1; i++) {
				let diff = 0

				for (let j = 0; j <= Math.min(i, input.length - i - 2); j++)
					diff += input[i - j]
						.split('')
						.filter(
							(char, index) => char !== input[i + 1 + j][index]
						).length

				if (diff === 1) {
					return (i + 1) * multiplier
				}
			}
			return 0
		}
	})

	console.log('Second level solution:\t', res)
}

secondLevel()
