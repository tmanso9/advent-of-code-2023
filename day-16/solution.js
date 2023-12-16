const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')
const queue = []

const DIR = {
	left: { y: 0, x: -1 },
	right: { y: 0, x: 1 },
	up: { y: -1, x: 0 },
	down: { y: 1, x: 0 }
}
let res = 0

const pushToQueue = (y, x, dir) => {
	queue.push({ p: { y, x }, dir })
}

const splitVertically = (y, x) => {
	goUp(y, x)
	goDown(y, x)
}

const splitHorizontally = (y, x) => {
	goLeft(y, x)
	goRight(y, x)
}

const goLeft = (y, x) => {
	pushToQueue(y + DIR.left.y, x + DIR.left.x, DIR.left)
}

const goRight = (y, x) => {
	pushToQueue(y + DIR.right.y, x + DIR.right.x, DIR.right)
}

const goUp = (y, x) => {
	pushToQueue(y + DIR.up.y, x + DIR.up.x, DIR.up)
}

const goDown = (y, x) => {
	pushToQueue(y + DIR.down.y, x + DIR.down.x, DIR.down)
}

const keepGoing = (current) => {
	pushToQueue(
		current.p.y + current.dir.y,
		current.p.x + current.dir.x,
		current.dir
	)
}

const runThroughCave = (first) => {
	const seen = new Map()
	queue.push(first)
	while (queue.length) {
		const current = queue.shift()

		const { x, y } = current.p
		const toCheck = `${y}-${x}`
		let beenThere = false
		if (seen.has(toCheck)) {
			beenThere = seen.get(toCheck).includes(current.dir)
		}

		if (
			x < 0 ||
			y < 0 ||
			y >= data.length ||
			x >= data[y].length ||
			beenThere
		)
			continue

		let value = seen.has(toCheck) ? seen.get(toCheck) : []
		value.push(current.dir)
		seen.set(toCheck, value)

		switch (data[y][x]) {
			case '|':
				current.dir === DIR.left || current.dir === DIR.right
					? splitVertically(y, x)
					: keepGoing(current)
				break
			case '-':
				current.dir === DIR.up || current.dir === DIR.down
					? splitHorizontally(y, x)
					: keepGoing(current)
				break
			case '/':
				current.dir === DIR.right
					? goUp(y, x)
					: current.dir === DIR.left
					? goDown(y, x)
					: current.dir === DIR.up
					? goRight(y, x)
					: goLeft(y, x)
				break
			case '\\':
				current.dir === DIR.right
					? goDown(y, x)
					: current.dir === DIR.left
					? goUp(y, x)
					: current.dir === DIR.up
					? goLeft(y, x)
					: goRight(y, x)
				break
			default:
				keepGoing(current)
		}
	}
	return seen.size
}

const firstLevel = () => {
	const first = { p: { y: 0, x: 0 }, dir: DIR.right }

	res = runThroughCave(first)
	console.log('First level solution:\t', res)
}

const exploreAndSetMax = (y, x, dir) => {
	const first = { p: { y, x }, dir }
	const energized = runThroughCave(first)
	res = Math.max(res, energized)
}

const secondLevel = () => {
	res = 0

	for (let x = 0; x < data[0].length; x++) {
		exploreAndSetMax(0, x, DIR.down)
		exploreAndSetMax(data.length - 1, x, DIR.up)
	}
	for (let y = 0; y < data.length; y++) {
		exploreAndSetMax(y, 0, DIR.right)
		exploreAndSetMax(y, data[y].length - 1, DIR.left)
	}
	console.log('Second level solution:\t', res)
}

firstLevel()
secondLevel()
