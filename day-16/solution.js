const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')
const seen = new Map()
const queue = []

const DIR = {
	left: { y: 0, x: -1 },
	right: { y: 0, x: 1 },
	up: { y: -1, x: 0 },
	down: { y: 1, x: 0 }
}
let res = 0

const firstLevel = () => {
	const first = { p: { y: 0, x: 0 }, dir: DIR.right }
	queue.push(first)
	while (queue.length) {
		const current = queue.shift()
		const { x, y } = current.p
		const toCheck = `${y}-${x}`
		const inSeen = seen.has(toCheck)
		let beenThere = false
		if (inSeen) {
			beenThere = seen.get(toCheck).includes(current.dir)
		}
		if (x < 0 || y < 0 || y >= data.length || x >= data[y].length || (inSeen && beenThere)) continue
		let value = []
		if (seen.has(toCheck)) {
			value = seen.get(toCheck)
			value.push(current.dir)
		} else {
			value.push(current.dir)
		}
		seen.set(toCheck, value)
		switch (data[y][x]) {
			case '|':
				if (current.dir === DIR.left || current.dir === DIR.right) {
					queue.push({
						p: { y: y + DIR.up.y, x: x + DIR.up.x },
						dir: DIR.up
					})
					queue.push({
						p: { y: y + DIR.down.y, x: x + DIR.down.x },
						dir: DIR.down
					})
				} else {
					queue.push({
						p: { y: y + current.dir.y, x: x + current.dir.x },
						dir: current.dir
					})
				}
				break
			case '-':
				if (current.dir === DIR.up || current.dir === DIR.down) {
					queue.push({
						p: { y: y + DIR.left.y, x: x + DIR.left.x },
						dir: DIR.left
					})
					queue.push({
						p: { y: y + DIR.right.y, x: x + DIR.right.x },
						dir: DIR.right
					})
				} else {
					queue.push({
						p: { y: y + current.dir.y, x: x + current.dir.x },
						dir: current.dir
					})
				}
				break
			case '/':
				if (current.dir === DIR.right) {
					queue.push({
						p: { y: y + DIR.up.y, x: x + DIR.up.x },
						dir: DIR.up
					})
				} else if (current.dir === DIR.left) {
					queue.push({
						p: { y: y + DIR.down.y, x: x + DIR.down.x },
						dir: DIR.down
					})
				} else if (current.dir === DIR.up) {
					queue.push({
						p: { y: y + DIR.right.y, x: x + DIR.right.x },
						dir: DIR.right
					})
				} else {
					queue.push({
						p: { y: y + DIR.left.y, x: x + DIR.left.x },
						dir: DIR.left
					})
				}
				break
			case '\\':
				if (current.dir === DIR.right) {
					queue.push({
						p: { y: y + DIR.down.y, x: x + DIR.down.x },
						dir: DIR.down
					})
				} else if (current.dir === DIR.left) {
					queue.push({
						p: { y: y + DIR.up.y, x: x + DIR.up.x },
						dir: DIR.up
					})
				} else if (current.dir === DIR.up) {
					queue.push({
						p: { y: y + DIR.left.y, x: x + DIR.left.x },
						dir: DIR.left
					})
				} else {
					queue.push({
						p: { y: y + DIR.right.y, x: x + DIR.right.x },
						dir: DIR.right
					})
				}
				break
			default:
				queue.push({
					p: { y: y + current.dir.y, x: x + current.dir.x },
					dir: current.dir
				})
		}
	}
	// console.log(seen)
	res = seen.size

	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	console.log('Second level solution:\t', res)
}

firstLevel()
// secondLevel()
