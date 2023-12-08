const { readData } = require('../utils/helper')

const data = readData('input.txt')

const maps = new Map()
const instructions = data[0].replaceAll('L', 0).replaceAll('R', 1)
const queue = ['AAA']
let steps = 0

const createMaps = () => {
	for (let i = 2; i < data.length; i++) {
		const line = data[i]
		const [key, uneditedValues] = line.split(' = ')
		const values = uneditedValues
			.replace(/[()]/g, '')
			.split(',')
			.map((val) => val.trim())
		maps.set(key, values)
	}
}

const followMaps = () => {
	while (queue.length > 0) {
		const here = queue.shift()
		const currentMap = maps.get(here)
		const nextStep = currentMap[instructions[steps % instructions.length]]
		steps++

		if (nextStep !== 'ZZZ') {
			queue.push(nextStep)
		}
	}
}

const firstLevel = () => {
	createMaps()
	followMaps()
	console.log('First level solution:\t', steps)
}

firstLevel()
