const { readData } = require('../utils/helper')

const data = readData('input.txt')
let partNumbers = []
const possibleGears = []
const finalGears = []

const isSymbol = (letter) => {
	return !/\d/.test(letter) && letter !== '.'
}

const isGear = (letter) => letter === '*'

const checkValidPart = (line, startIndex, endIndex) => {
	const prevLine = line - 1
	let prevIndex = startIndex - 1
	const nextLine = line + 1
	let nextIndex = endIndex + 1
	if (line >= 0) {
		if (startIndex - 1 >= 0 && isSymbol(data[line][startIndex - 1])){
			return {
				isValid: true,
				isGear: {
					isGear: isGear(data[line][startIndex - 1]),
					row: line,
					col: startIndex - 1
				}
			}
		}
		if (endIndex + 1 < data[line].length &&
				isSymbol(data[line][endIndex + 1])) {
			return {
				isValid: true,
				isGear: {
					isGear: isGear(data[line][endIndex + 1]),
					row: line,
					col: endIndex + 1
				}
			}
		}
		if (prevLine >= 0) {
			prevIndex = startIndex - 1
			while (prevIndex <= nextIndex) {
				if (
					prevIndex >= 0 &&
					prevIndex < data[prevLine].length &&
					isSymbol(data[prevLine][prevIndex])
				) {
					return {
						isValid: true,
						isGear: {
							isGear: isGear(data[prevLine][prevIndex]),
							row: prevLine,
							col: prevIndex
						}
					}
				}
				prevIndex++
			}
		}
		if (nextLine < data.length) {
			prevIndex = startIndex - 1

			while (prevIndex <= nextIndex) {
				if (
					prevIndex >= 0 &&
					prevIndex < data[nextLine].length &&
					isSymbol(data[nextLine][prevIndex])
				) {
					return {
						isValid: true,
						isGear: {
							isGear: isGear(data[nextLine][prevIndex]),
							row: nextLine,
							col: prevIndex
						}
					}
				}
				prevIndex++
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
	// console.log(line)
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
	console.dir(validGears, { 'maxArrayLength': null })
	const sumGearRatios = validGears.reduce((acc, value) => {
		const gearRatio = value.numbers[0] * value.numbers[1]
		return acc + gearRatio
	}, 0)
	
	console.log(`Second level solution:\t${sumGearRatios}`)
}

firstLevel()
secondLevel()
