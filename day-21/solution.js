const { readData, printMap, DIR, LCM, PriorityQueue } = require('../utils')

const input = 'input.txt'
const data = readData(input)

let res = 0

const firstLevel = (sample = false) => {
	let grid = []
	const maxSteps = sample ? 6 : 64
	let s = { y: 0, x: 0, steps: maxSteps }
	data.forEach((line, y) => {
		grid[y] = []
		for (let x = 0; x < line.length; x++) {
			if (line[x] === 'S') {
				s.y = y
				s.x = x
			}
			grid[y][x] = line[x]
		}
	})
	const possibleDirs = Array.from(Object.values(DIR))
	const finalPoints = new Set()
	const seen = new Set()
	const queue = [s]
	while (queue.length) {
		const curr = queue.shift()
		const { y, x, steps } = curr
		if (
			y < 0 ||
			x < 0 ||
			y >= grid.length ||
			x >= grid[y].length ||
			steps < 0 ||
			grid[y][x] === '#' ||
			seen.has(`${y}-${x}`)
		)
			continue
		seen.add(`${y}-${x}`)
		if (steps % 2 === 0) finalPoints.add(`${y}-${x}`)
		possibleDirs.forEach((dir) => {
			queue.push({ y: y + dir.y, x: x + dir.x, steps: steps - 1 })
		})
	}
	console.log('First level solution:\t', finalPoints.size)
}

const secondLevel = () => {
	console.log('Second level solution:\t', res)
}

firstLevel(input === 'sample.txt')
// secondLevel()
