const { readData } = require('../utils/helper')

const data = readData('input.txt')
let partNumbers = []

const isSymbol = (letter) => {
	return !/\d/.test(letter) && letter !== '.'
}

const checkValidPart = (line, startIndex, endIndex) => {
	let isValid = false
	const prevLine = line - 1
	let prevIndex = startIndex - 1
	const nextLine = line + 1
	let nextIndex = endIndex + 1
	if (line >= 0) {
		if (
			(startIndex - 1 >= 0 && isSymbol(data[line][startIndex - 1])) ||
			(endIndex + 1 < data[line].length &&
				isSymbol(data[line][endIndex + 1]))
		) {
			isValid = true
		} if (prevLine >= 0) {
			prevIndex = startIndex - 1
			while (prevIndex <= nextIndex) {
				if (
					prevIndex >= 0 &&
					prevIndex < data[prevLine].length &&
					isSymbol(data[prevLine][prevIndex])
				) {
					isValid = true
					break
				}
				prevIndex++
			}
		} if (nextLine < data.length) {
			prevIndex = startIndex - 1

			while (prevIndex <= nextIndex) {
				if (
					prevIndex >= 0 &&
					prevIndex < data[nextLine].length &&
					isSymbol(data[nextLine][prevIndex])
				) {
					isValid = true
					break
				}
				prevIndex++
			}
		}
	}
	return isValid
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
		if (checkValidPart(i, acc, endIndex)) {
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

firstLevel()

