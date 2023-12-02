const fs = require('fs')

const readData = (fileName) => {
	const data = fs.readFileSync(fileName, 'utf-8')
	const inputArray = data.split('\n')
	return inputArray
}

module.exports = { readData }
