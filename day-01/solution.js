const { readData } = require('../utils/helper')

const data = readData('input.txt')
const total = []

const firstLevel = () => {
	for (line of data) {
		const numbers = line.match(/\d/g)
		const sum =
			parseInt(numbers[0]) * 10 + parseInt(numbers[numbers.length - 1])
		total.push(sum)
	}

	const finalAnswer = total.reduce((acc, current) => {
		return acc + current
	}, 0)
	console.log('First level solution:\t', finalAnswer)
}

const possibleNumbers = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine'
]

const allSpeltOutNumbers = (line) => {
	const indices = possibleNumbers.reduce((acc, number) => {
		let start = line.indexOf(number)

		while (start != -1) {
			const end = start + number.length
			acc.push({ number, start })
			start = line.indexOf(number, end)
		}
		return acc
	}, [])

	return indices.length ? indices : null
}

const secondLevel = () => {
	for (line of data) {
		const numbers = line.match(/\d/g)
		let firstNumber = parseInt(numbers[0])
		let lastNumber = parseInt(numbers[numbers.length - 1])
		let firstDigitIndex = line.indexOf(numbers[0])
		let lastDigitIndex = line.lastIndexOf(numbers[numbers.length - 1])

		const indices = allSpeltOutNumbers(line)
		if (indices) {
			indices.forEach((entry) => {
				if (entry.start < firstDigitIndex) {
					firstDigitIndex = entry.start
					firstNumber = possibleNumbers.indexOf(entry.number) + 1
				}
				if (entry.start > lastDigitIndex) {
					lastDigitIndex = entry.start
					lastNumber = possibleNumbers.indexOf(entry.number) + 1
				}
			})
		}
		const sum = firstNumber * 10 + lastNumber
		total.push(sum)
	}
	const finalAnswer = total.reduce((acc, number) => acc + number, 0)
	console.log('Second level solution:\t', finalAnswer)
}

firstLevel()
total.splice(0, total.length)
secondLevel()
