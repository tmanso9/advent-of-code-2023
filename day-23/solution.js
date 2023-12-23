const { readData, printMap, DIR, LCM, PriorityQueue } = require('../utils')

const data = readData('input.txt')

let res = 0
const grid = []
const graph = {}

const dirs = {
	'^': [DIR.up],
	'v': [DIR.down],
	'<': [DIR.left],
	'>': [DIR.right],
	'.': [DIR.up, DIR.down, DIR.left, DIR.right]
}

const inBounds = (y, x) => {
	return y >= 0 && x >= 0 && y < grid.length && x < grid[y].length
}

const dfs = (start, end) => {
	const stack = [{ point: start, seen: new Set(), steps: 0 }]
	let max = -Infinity

	while (stack.length > 0) {
		const { point, seen, steps } = stack.pop()

		if (point.y === end.y && point.x === end.x) {
			max = Math.max(max, steps)
			continue
		}

		if (seen.has(JSON.stringify(point))) continue

		seen.add(JSON.stringify(point))

		const neighbours = Array.from(graph[JSON.stringify(point)] || {})
		for (const [nx, weight] of neighbours) {
			const nextPoint = JSON.parse(nx)
			if (!seen.has(nx)) {
				stack.push({ point: nextPoint, seen: new Set([...seen]), steps: steps + weight })
			}
		}
	}

	return max
}

const parseData = () => {
	data.forEach((line, y) => {
		grid[y] = []
		for (let x = 0; x < line.length; x++) {
			grid[y][x] = line[x]
		}
	})

	const start = { y: 0, x: data[0].indexOf('.') }
	const end = { y: grid.length - 1, x: data[grid.length - 1].indexOf('.') }
	const points = [start, end]

	grid.forEach((line, i) => {
		line.forEach((col, j) => {
			if (col === '#') return
			let neighbours = 0
			Object.values(DIR).forEach((dir) => {
				const { y, x } = dir
				const nr = i + y
				const nc = j + x
				if (inBounds(nr, nc) && grid[nr][nc] !== '#') {
					neighbours++
				}
			})
			if (neighbours > 2) points.push({ y: i, x: j })
		})
	})

	return { points, start, end }
}

const blankGraph = () => {
	for (const key in graph) {
		delete graph[key]
	}
	points.forEach((point) => {
		graph[JSON.stringify(point)] = new Map()
	})
}

const fillGraph = (firstLevel = true) => {
	points.forEach((point) => {
		const queue = [{ y: point.y, x: point.x, n: 0 }]
		const visited = new Set()
		visited.add(JSON.stringify(point))

		while (queue.length) {
			const curr = queue.pop()
			const { y, x, n } = curr
			if (
				n !== 0 &&
				points.some((otherPoint) => {
					return otherPoint.y === y && otherPoint.x === x
				})
			) {
				graph[JSON.stringify(point)].set(JSON.stringify({ y, x }), n)
				continue
			}
			const directions = firstLevel ? dirs[grid[y][x]] : dirs['.']
			directions.forEach((dir) => {
				const newY = y + dir.y
				const newX = x + dir.x
				if (
					inBounds(newY, newX) &&
					grid[newY][newX] !== '#' &&
					!visited.has(JSON.stringify({ y: newY, x: newX }))
				) {
					queue.push({ y: newY, x: newX, n: n + 1 })
					visited.add(JSON.stringify({ y: newY, x: newX }))
				}
			})
		}
	})
}

const firstLevel = () => {
	blankGraph()
	fillGraph(true)

	res = dfs(start, end)
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	blankGraph()
	fillGraph(false)

	res = dfs(start, end)
	console.log('Second level solution:\t', res)
}

const { points, start, end } = parseData()
firstLevel()
secondLevel()
