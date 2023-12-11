const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')

const galaxyMap = []

for (line of data) {
	galaxyMap.push(Array.from(line))
	if (!line.includes('#')) {
		galaxyMap.push(Array.from(line))
	}
}

const colsWithoutGalaxies = []

for (let x = 0; x < galaxyMap[0].length; x++) {
	let galaxiesFound = 0
	for (let i = 0; i < galaxyMap.length; i++) {
		if (galaxyMap[i][x] === '#') {
			galaxiesFound++
			break
		}
	}
	if (!galaxiesFound) colsWithoutGalaxies.push(x)
}

let colsAdded = 0
colsWithoutGalaxies.forEach((val) => {
	galaxyMap.forEach((row) => {
		row.splice(val + colsAdded, 0, '.')
	})
	colsAdded++
})

const positions = []

for (let y = 0; y < galaxyMap.length; y++) {
	for (let x = 0; x < galaxyMap[0].length; x++) {
		if (galaxyMap[y][x] === '#') {
			positions.push({ y, x })
		}
	}
}

const minDistance = async (pos, dest) => {
	const queue = []
	let visited = Array(galaxyMap.length)
	for (let y = 0; y < galaxyMap.length; y++) {
		visited[y] = Array(galaxyMap[y].length)
		for (let x = 0; x < galaxyMap[y].length; x++) {
			visited[y][x] = false
		}
	}
	queue.push({ y: pos.y, x: pos.x, dist: 0 })
	visited[pos.y][pos.x] = true

	while (queue.length) {
		const current = queue.shift()

		if (current.y === dest.y && current.x === dest.x) {
			return current.dist
		}
		const neighbors = [
			{ y: current.y - 1, x: current.x },
			{ y: current.y + 1, x: current.x },
			{ y: current.y, x: current.x - 1 },
			{ y: current.y, x: current.x + 1 }
		]

		for (const neighbor of neighbors) {
			const { y, x } = neighbor

			if (
				y >= 0 &&
				y < galaxyMap.length &&
				x >= 0 &&
				x < galaxyMap[y].length &&
				!visited[y][x]
			) {
				queue.push({
					y,
					x,
					dist: current.dist + 1
				})
				visited[y][x] = true
			}
		}
	}
	return -1
}

const sumNaturalNumbers = (num) => (num * (num + 1)) / 2

const shortestPaths = Array(sumNaturalNumbers(positions.length))

const calculateShortestPaths = async () => {
	const promises = []

	positions.forEach((pos, i) => {
		console.log(`${((i / positions.length) * 100).toFixed(2)} %`)
		for (let z = i + 1; z < positions.length; z++) {
			const dest = positions[z]
			promises.push(minDistance(pos, dest))
		}
	})

	return promises
}

const firstLevel = () => {
	calculateShortestPaths().then((promises) => {
		Promise.all(promises).then((shortestPaths) => {
			console.log(
				'First level solution:\t',
				shortestPaths.reduce((acc, val) => acc + val)
			)
		})
	})
}

firstLevel()
