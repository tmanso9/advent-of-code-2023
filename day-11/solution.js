const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')

const galaxyMap = []

const linesWithoutGalaxies = []
data.forEach((line, i) => {
	galaxyMap.push(Array.from(line))
	if (!line.includes('#')) {
		linesWithoutGalaxies.push(i)
	}
})

const colsWithoutGalaxies = []
const positions = []

for (let x = 0; x < galaxyMap[0].length; x++) {
	let galaxiesFound = 0
	for (let i = 0; i < galaxyMap.length; i++) {
		if (galaxyMap[i][x] === '#') {
			galaxiesFound++
			positions.push({ y: i, x })
		}
	}
	if (!galaxiesFound) colsWithoutGalaxies.push(x)
}

const minDistance = async (pos, dest, sumValue) => {
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

		neighbors.forEach((neighbor, i) => {
			const { y, x } = neighbor

			if (
				y >= 0 &&
				y < galaxyMap.length &&
				x >= 0 &&
				x < galaxyMap[y].length &&
				!visited[y][x]
			) {
				let added = 0
				switch(i){
					case 0:
					case 1:
						if (linesWithoutGalaxies.includes(y)) added = sumValue - 1
						break
					case 2:
					case 3:
						if (colsWithoutGalaxies.includes(x)) added = sumValue - 1
						break
				}
				queue.push({
					y,
					x,
					dist: current.dist + 1 + added
				})
				visited[y][x] = true
			}
		})
	}
	return -1
}

const calculateShortestPaths = async (sumValue) => {
	const promises = []

	positions.forEach((pos, i) => {
		console.log(`${((i / positions.length) * 100).toFixed(2)} %`)
		for (let z = i + 1; z < positions.length; z++) {
			const dest = positions[z]
			promises.push(minDistance(pos, dest, sumValue))
		}
	})

	return promises
}

const firstLevel = () => {
	calculateShortestPaths(2).then((promises) => {
		Promise.all(promises).then((shortestPaths) => {
			console.log(
				'First level solution:\t',
				shortestPaths.reduce((acc, val) => acc + val)
			)
		})
	})
}
const secondLevel = () => {
	calculateShortestPaths(1000000).then((promises) => {
		Promise.all(promises).then((shortestPaths) => {
			console.log(
				'First level solution:\t',
				shortestPaths.reduce((acc, val) => acc + val)
			)
		})
	})
}

firstLevel()
secondLevel()
