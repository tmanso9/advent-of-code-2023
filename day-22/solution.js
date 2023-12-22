const { readData, printMap, DIR, LCM, PriorityQueue } = require('../utils')

class Brick {
	constructor(start, end) {
		this.start = start
		this.end = end
	}
}

const sortBricks = (a, b) => a.start[2] - b.start[2]

const overlaps = (a, b) => {
	return (
		Math.max(a.start[0], b.start[0]) <= Math.min(a.end[0], b.end[0]) &&
		Math.max(a.start[1], b.start[1]) <= Math.min(a.end[1], b.end[1])
	)
}

const buildBricksFromData = (data) => {
	let bricks = []
	data.forEach((line, i) => {
		if (line.length) {
			const [start, end] = line.split('~').map((val) => val.split(',').map(Number))
			bricks.push(new Brick(start, end))
		}
	})
	return bricks
}

const dropBricks = (bricks) => {
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
}

const buildAndDrop = (data) => {
	let bricks = buildBricksFromData(data)
	bricks.sort(sortBricks)
	dropBricks(bricks)
	return bricks
}

const buildRelationships = (bricks) => {
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
	return { holds, heldBy }
}

const calcActions = (bricks, holds, heldBy) => {
	const safeToDisintegrate = new Set()
	let fallenBricks = 0
	for (let i = 0; i < bricks.length; i++) {
		if (
			Array.from(holds[i]).every((val) => {
				return heldBy[val].size >= 2
			})
		) {
			safeToDisintegrate.add(i)
		} else {
			const queue = []
			const fall = new Set()
			for (elem of holds[i]) {
				if (heldBy[elem].size === 1) {
					queue.push(elem)
					fall.add(elem)
				}
			}
			while (queue.length) {
				const curr = queue.shift()
				for (elem of holds[curr]) {
					if (!fall.has(elem)) {
						// Check if all supports of the elem are falling bricks
						if (Array.from(heldBy[elem]).every((val) => fall.has(val))) {
							fall.add(elem)
							queue.push(elem)
						}
					}
				}
			}
			fallenBricks += fall.size
		}
	}
	return { safeToDisintegrate, fallenBricks }
}

const firstLevel = (res) => {
	console.log('First level solution:\t', res)
}

const secondLevel = (res) => {
	console.log('Second level solution:\t', res)
}

const main = () => {
	const data = readData('input.txt')
	const bricks = buildAndDrop(data)
	const { holds, heldBy } = buildRelationships(bricks)
	const { safeToDisintegrate, fallenBricks } = calcActions(bricks, holds, heldBy)
	firstLevel(safeToDisintegrate.size)
	secondLevel(fallenBricks)
}

main()
