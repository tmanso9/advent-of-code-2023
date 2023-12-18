const fs = require('fs')

const readData = (fileName) => {
	const data = fs.readFileSync(fileName, 'utf-8')
	const inputArray = data.split('\n')
	return inputArray
}

const printMap = (toPrint) => {
	toPrint.forEach((row) => {
		const values = row.reduce((acc, val) => acc + val, '')
		console.log(values)
	})
}

const DIR = {
	left: { y: 0, x: -1 },
	right: { y: 0, x: 1 },
	up: { y: -1, x: 0 },
	down: { y: 1, x: 0 }
}

module.exports = { readData, printMap, DIR }