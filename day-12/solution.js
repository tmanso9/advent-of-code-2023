const { readData, printMap } = require('../utils/helper')

const count = (line, records) => {
	if (!line.length) {
		return !records.length ? 1 : 0
	}

	if (!records.length) {
		return line.indexOf('#') === -1 ? 1 : 0
	}

	let key = `${line}-${records}`
	if (cache.has(key)) return cache.get(key)

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

	cache.set(key, result)
	return result
}

const processData = (data) => {
	const springs = []
	const records = []
	for (line of data) {
		let [s, r] = line.toString().split(' ')
		r = r.split(',').map(Number)
		springs.push(s)
		records.push(r)
	}

	return { springs, records }
}

const firstLevel = () => {
	let res = 0
	springs.forEach((spring, i) => {
		res += count(spring, records[i])
	})
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	let res = 0
	cache.clear()
	springs.forEach((spring, i) => {
		spring = (spring + '?').repeat(4) + spring
		const record = Array(5).fill(records[i]).flat()
		res += count(spring, record)
	})
	console.log('Second level solution:\t', res)
}

const data = readData('input.txt')
let cache = new Map()

let { springs, records } = processData(data)
firstLevel(springs, records)
secondLevel(springs, records)
