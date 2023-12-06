const { readData } = require('../utils/helper')

const data = readData('input.txt')

const almanac = new Map()

const firstLine = data[0].slice(data[0].indexOf(':') + 1)

almanac.set(
	'seed',
	firstLine
		.match(/\d+/g)
		.map(Number)
)
// console.log(...almanac.get('seed'))

for (let i = 2; i < data.length; i++) {
	const line = data[i]
	if (line.includes('map')) {
		const [source, destination] = data[i]
			.slice(0, data[i].length - 4)
			.split('-to-')
			.map((value) => value.trim())
		const ranges = []
		// console.log(source, destination)
		i++
		while (data[i] && data[i].length && !data[i].includes('map')) {
			const [destStart, sourceStart, range] = data[i]
				.split(' ')
				.map(Number)
			ranges.push([destStart, sourceStart, range])
			i++
		}
		// console.log(...almanac)
		const originals = almanac.get(source)
		originals.forEach((value) => {
			const validRange = ranges.find((range) => {
				return value >= range[1] && value < range[1] + range[2]
			})
			// console.log(value, validRange)
			let arr = almanac.get(destination)
			let toAdd
			if (validRange !== undefined) {
				const diff = value - validRange[1]
				toAdd = validRange[0] + diff
			} else {
				toAdd = value
			}
			if (arr !== undefined) {
				arr.push(toAdd)
			} else {
				arr = [toAdd]
			}
			almanac.set(destination, arr)
		})
	}
}

const lowest = almanac.get('location')
const lowestLocation = lowest.sort((a, b) => a - b)[0]
// console.log(...almanac)
console.log(lowestLocation)
