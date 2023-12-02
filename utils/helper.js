const fs = require('fs')

const readData = () => {
	const data = fs.readFileSync('input.txt', 'utf-8')
	const inputArray = data.split('\n')
	return inputArray
}

module.exports = { readData }
