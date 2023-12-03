const { readData } = require('../utils/helper')

const data = readData('input.txt')
const partNumbers = []
const possibleGears = []
const finalGears = []

const isSymbol = (letter) => {
	return !/\d/.test(letter) && letter !== '.'
}

const isGear = (letter) => letter === '*'

const checkValidPart = (line, startIndex, endIndex) => {
	const returnStructure = (row, col) => {
		return {
			isValid: true,
			isGear: {
				isGear: isGear(data[row][col]),
				row,
				col
			}
		}
	}

	const foundInAdjacentLine = (row, col) => {
		if (col >= 0 && col < data[row].length && isSymbol(data[row][col])) {
			return true
		}
		return false
	}

	const prevLine = line - 1
	const nextLine = line + 1
	let prevIndex = startIndex - 1
	const nextIndex = endIndex + 1

	if (line >= 0) {
		// same line, previous char
		if (prevIndex >= 0 && isSymbol(data[line][prevIndex])) {
			return returnStructure(line, prevIndex)
		}
		// same line, next char
		if (nextIndex < data[line].length && isSymbol(data[line][nextIndex])) {
			return returnStructure(line, nextIndex)
		}
		// all possible chars in previous line
		if (prevLine >= 0) {
			prevIndex = startIndex - 1
			for (; prevIndex <= nextIndex; prevIndex++) {
				if (foundInAdjacentLine(prevLine, prevIndex)) {
					return returnStructure(prevLine, prevIndex)
				}
			}
		}
		// all possible chars in next line
		if (nextLine < data.length) {
			prevIndex = startIndex - 1
			for (; prevIndex <= nextIndex; prevIndex++) {
				if (foundInAdjacentLine(nextLine, prevIndex)) {
					return returnStructure(nextLine, prevIndex)
				}
			}
		}
	}
	return {
		isValid: false,
		isGear: false
	}
}

for (let i = 0; i < data.length; i++) {
	let line = data[i]
	let startIndex = line.search(/\d/)
	let endIndex
	let acc = 0
	while (startIndex != -1) {
		const number = line.match(/\d+/)
		acc += startIndex
		endIndex = acc + number[0].length - 1
		line = line.slice(startIndex + number[0].length)
		const { isValid, isGear } = checkValidPart(i, acc, endIndex)
		if (isValid) {
			if (isGear.isGear) {
				possibleGears.push({
					row: isGear.row,
					col: isGear.col,
					number: parseInt(number[0])
				})
			}
			partNumbers.push(parseInt(number[0]))
		}
		acc += number[0].length
		startIndex = line.search(/\d/)
	}
}

const firstLevel = () => {
	// console.log(partNumbers)
	const accSum = partNumbers.reduce((acc, value) => acc + value, 0)
	console.log(`First level solution:\t${accSum}`)
}

const findDuplicatePairs = () => {
	const pairMap = new Map()
	const duplicatePairs = []

	for (const gear of possibleGears) {
		const { row, col, number } = gear
		const pairKey = `${row}-${col}`

		if (pairMap.has(pairKey)) {
			pairMap.get(pairKey).numbers.push(number)
		} else {
			pairMap.set(pairKey, { row, col, numbers: [number] })
		}
	}

	for (const pair of pairMap.values()) {
		if (pair.numbers.length == 2) {
			duplicatePairs.push(pair)
		}
	}

	return duplicatePairs
}

const secondLevel = () => {
	// console.log(possibleGears)
	const validGears = findDuplicatePairs()
	// console.dir(validGears, { 'maxArrayLength': null })
	const sumGearRatios = validGears.reduce((acc, value) => {
		const gearRatio = value.numbers[0] * value.numbers[1]
		return acc + gearRatio
	}, 0)

	console.log(`Second level solution:\t${sumGearRatios}`)
}

firstLevel()
secondLevel()
