const { readData } = require('../utils/helper')

const data = readData('input.txt')

const maps = new Map()
const instructions = data[0].replaceAll('L', 0).replaceAll('R', 1)
const queue = []
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
	return steps
}

const setStartingPoint = () => {
	Array.from(maps.keys()).forEach((name) => {
		if (name.charAt(name.length - 1) === 'A') {
			queue.push(name)
		}
	})

	return queue.length
}

const individualRun = (tempQueue) => {
	let moves = 0

	while (tempQueue.length > 0) {
		const here = tempQueue.shift()
		const currentMap = maps.get(here)
		const nextStep = currentMap[instructions[moves % instructions.length]]
		moves++

		if (nextStep.charAt(nextStep.length - 1) !== 'Z') {
			tempQueue.push(nextStep)
		}
	}

	return moves
}

const LCM = (arr, n) => {
	const GCD = (a, b) => {
		let x = Math.abs(a)
		let y = Math.abs(b)
		while (y) {
			const t = y
			y = x % y
			x = t
		}
		return x
	}

	let ans = arr[0]

	for (let i = 0; i < n; i++) {
		ans = (arr[i] * ans) / GCD(arr[i], ans)
	}

	return ans
}

const followGhostMap = () => {
	const solutions = []

	for (let i = 0; i < queue.length; i++) {
		const elem = queue[i]
		solutions.push(individualRun([elem]))
	}

	steps = LCM(solutions, solutions.length)
}

const firstLevel = () => {
	queue.push('AAA')
	followMaps()
	console.log('First level solution:\t', steps)
}

const secondLevel = () => {
	steps = 0
	setStartingPoint()
	followGhostMap()
	console.log('Second level solution:\t', steps)
}

createMaps()
firstLevel()
secondLevel()
