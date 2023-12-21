const { readData, printMap, DIR, LCM, PriorityQueue } = require('../utils')
const assert = require('assert')

const input = 'input.txt'
const data = readData(input)

let res = 0

const fill = (grid, s) => {
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
	return finalPoints.size
}

const parseData = () => {
	let grid = []
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
	return { grid, s }
}

const firstLevel = (grid, s) => {
	res = fill(grid, s)
	console.log('First level solution:\t', res)
}

// Level 2 code came from HyperNeutrino's video
// https://youtu.be/9UOMZSL0JTg?si=it8lhiGrMAsMz764
const secondLevel = (grid, s) => {
	res = 0
	// Check grid is square
	assert(grid.length === grid[0].length)
	const size = grid.length
	const half = Math.floor(size / 2)
	const { y, x, steps } = s
	// Check the starting point `s` is at the center of the grid.
	assert(y === x && y === half)
	assert(steps % size == half)

	const gridWidth = Math.floor(steps / size) - 1
	const odd = (Math.floor(gridWidth / 2) * 2 + 1) ** 2
	const even = (Math.floor((gridWidth + 1) / 2) * 2) ** 2

	const oddPoints = fill(grid, { y, x, steps: size * 2 + 1 })
	const evenPoints = fill(grid, { y, x, steps: size * 2 })

	/* These lines of code are calculating the number of points filled in four corner regions of the grid. */
	const corner_t = fill(grid, { y: size - 1, x, steps: size - 1 })
	const corner_b = fill(grid, { y: 0, x, steps: size - 1 })
	const corner_l = fill(grid, { y, x: size - 1, steps: size - 1 })
	const corner_r = fill(grid, { y, x: 0, steps: size - 1 })

	/* The code is calculating the number of points filled in four small triangular regions in the grid. */
	const small_tr = fill(grid, { y: size - 1, x: 0, steps: Math.floor(size / 2) - 1 })
	const small_br = fill(grid, { y: 0, x: 0, steps: Math.floor(size / 2) - 1 })
	const small_tl = fill(grid, { y: size - 1, x: size - 1, steps: Math.floor(size / 2) - 1 })
	const small_bl = fill(grid, { y: 0, x: size - 1, steps: Math.floor(size / 2) - 1 })

	/* The code is calculating the number of points filled in four large triangular regions in the grid. */
	const large_tr = fill(grid, { y: size - 1, x: 0, steps: Math.floor((size * 3) / 2) - 1 })
	const large_br = fill(grid, { y: 0, x: 0, steps: Math.floor((size * 3) / 2) - 1 })
	const large_tl = fill(grid, { y: size - 1, x: size - 1, steps: Math.floor((size * 3) / 2) - 1 })
	const large_bl = fill(grid, { y: 0, x: size - 1, steps: Math.floor((size * 3) / 2) - 1 })

	res =
		odd * oddPoints +
		even * evenPoints +
		corner_t +
		corner_b +
		corner_l +
		corner_r +
		(gridWidth + 1) * (small_tr + small_br + small_tl + small_bl) +
		gridWidth * (large_tr + large_br + large_tl + large_bl)

	console.log('Second level solution:\t', res)
}

const maxSteps = input === 'sample.txt' ? 6 : 64
const { grid, s } = parseData()
firstLevel(grid, s)
secondLevel(grid, { ...s, steps: 26501365 })
