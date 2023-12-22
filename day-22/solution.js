const { readData, printMap, DIR, LCM, PriorityQueue } = require('../utils')

const data = readData('input.txt')

class Brick {
	constructor(start, end) {
		this.start = start
		this.end = end
	}
}

let res = 0
let bricks = []

const sortBricks = (a, b) => a.start[2] - b.start[2]

const overlaps = (a, b) => {
	return (
		Math.max(a.start[0], b.start[0]) <= Math.min(a.end[0], b.end[0]) &&
		Math.max(a.start[1], b.start[1]) <= Math.min(a.end[1], b.end[1])
	)
}

const firstLevel = () => {
	data.forEach((line, i) => {
		if (line.length){
			const [start, end] = line.split('~').map((val) => val.split(',').map(Number))
			bricks.push(new Brick(start, end))
		}
	})
	bricks.sort(sortBricks)
	bricks.forEach((brick, i) => {
		let maxZ = 1
		for (let x = 0; x < i; x++) {
			const check = bricks[x]
			if (overlaps(brick, check)) {
				maxZ = Math.max(maxZ, check.end[2] + 1)
			}
		}
		const diff = brick.end[2] - brick.start[2]
		brick.start[2] = maxZ
		brick.end[2] = maxZ + diff
	})
	bricks.sort(sortBricks)

	const holds = {}
	const heldBy = {}
	bricks.forEach((brick, i) => {
		holds[i] = new Set()
		heldBy[i] = new Set()
	})
	bricks.forEach((upper, j) => {
		for (let i = 0; i < j; i++) {
			const lower = bricks[i]
			if (overlaps(upper, lower) && upper.start[2] - lower.end[2] === 1) {
				holds[i].add(j)
				heldBy[j].add(i)
			}
		}
	})
	const safeToDisintegrate = new Set()
	for (let i = 0; i < bricks.length; i++){
		if (Array.from(holds[i]).every(val => {
			return heldBy[val].size >= 2
		})) {
			safeToDisintegrate.add(i)
		}
	}
	res = safeToDisintegrate.size
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	res = 0
	console.log('Second level solution:\t', res)
}

firstLevel()
// secondLevel()
