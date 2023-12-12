const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')

let res = 0

const count = (line, records) => {
	if (!line.length) {
		return !records.length ? 1 : 0
	}

	if (!records.length) {
		return line.indexOf('#') === -1 ? 1 : 0
	}

	let result = 0

	if (line[0] === '.' || line[0] === '?') {
		result += count(line.substr(1), records)
	}

	if (line[0] === '#' || line[0] === '?') {
		if (
			line.length >= records[0] &&
			line.substr(0, records[0]).indexOf('.') === -1 &&
			(line.length === records[0] || line[records[0]] !== '#')
		) {
			result += count(line.substr(records[0] + 1), records.slice(1))
		}
	}
	return result
}

const firstLevel = () => {
	for (line of data) {
		let [springs, records] = line.toString().split(' ')
		records = records.split(',').map(Number)
		res += count(springs, records)
	}
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	res = 0
	console.log('Second level solution:\t', res)
}

firstLevel()
// secondLevel()
