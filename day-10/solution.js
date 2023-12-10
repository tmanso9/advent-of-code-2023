const { readData } = require('../utils/helper')

const data = readData('input.txt')
let start = {}

const D = {
	N: 0,
	S: 1,
	E: 2,
	W: 3
}

const dir = [
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
	{ x: 1, y: 0 },
	{ x: -1, y: 0 }
]

const getLinks = (v) => {
	switch (v) {
		case '|':
			return [D.S, D.N]
		case '-':
			return [D.W, D.E]
		case 'L':
			return [D.N, D.E]
		case 'J':
			return [D.N, D.W]
		case '7':
			return [D.S, D.W]
		case 'F':
			return [D.S, D.E]
	}
	return []
}

let map = data.map((line, y) =>
	line.split('').map((v, x) => {
		if (v === 'S') start = { x, y }
		return {
			v,
			links: getLinks(v)
		}
	})
)

const allowed = []
if (start.x > 0 && map[start.y][start.x - 1].links.includes(D.E))
	allowed.push(D.W)
if (
	start.x < map[start.y].length - 1 &&
	map[start.y][start.x + 1].links.includes(D.W)
)
	allowed.push(D.E)
if (start.y > 0 && map[start.y - 1][start.x].links.includes(D.S))
	allowed.push(D.N)
if (start.y < map.length - 1 && map[start.y + 1][start.x].links.includes(D.N))
	allowed.push(D.S)
map[start.y][start.x].links = allowed

const queue = []
queue.push({ p: start, steps: 0 })

while (queue.length) {
	const current = queue.shift()
	if (
		map[current.p.y][current.p.x].steps === undefined ||
		map[current.p.y][current.p.x].steps > current.steps
	) {
		map[current.p.y][current.p.x].steps = current.steps
		map[current.p.y][current.p.x].links.forEach((link) => {
			queue.push({
				p: {
					x: current.p.x + dir[link].x,
					y: current.p.y + dir[link].y
				},
				steps: current.steps + 1
			})
		})
	}
}

const firstLevel = () => {
	const mapWithLoop = map.flat().map(val => val.steps === undefined ? 0 : val.steps)
	const maxSteps = Math.max(...mapWithLoop)
	console.log(maxSteps)
	console.log('First level solution:\t', maxSteps)
}

firstLevel()