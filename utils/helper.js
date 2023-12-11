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

module.exports = { readData, printMap }