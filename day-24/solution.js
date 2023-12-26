const { readData, printMap, DIR, LCM, PriorityQueue } = require('../utils')

class Hailstone {
	constructor(id, origin, velocity) {
		this.id = id
		this.origin = origin
		this.velocity = velocity

		this.a = velocity[1]
		this.b = -velocity[0]
		this.c = velocity[1] * origin[0] - velocity[0] * origin[1]
	}

	print() {
		console.log(`Hailstone ${this.id}: a = ${this.a}, b = ${this.b}, c = ${this.c}`)
	}
}

let res = 0

const hailstones = []

const firstLevel = () => {
	data.forEach((line, i) => {
		const [origin, velocity] = line.split(' @ ').map((val) => val.split(', ').map(Number))
		hailstones.push(new Hailstone(i, origin, velocity))
	})
	for (let i = 0; i < hailstones.length - 1; i++) {
		for (let j = i + 1; j < hailstones.length; j++) {
			const hs1 = hailstones[i]
			const hs2 = hailstones[j]
			const [a1, b1, c1] = [hs1.a, hs1.b, hs1.c]
			const [a2, b2, c2] = [hs2.a, hs2.b, hs2.c]
			// Checking if they are parallel
			if (a1 * b2 === b1 * a2) {
				continue
			}
			// Solving for a point in time where coordinates for both stones are the same
			const x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1)
			const y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1)
			// Checking if intersection is in the past
			if (
				hs1.velocity[0] * (x - hs1.origin[0]) < 0 ||
				hs1.velocity[1] * (y - hs1.origin[1]) < 0 ||
				hs2.velocity[0] * (x - hs2.origin[0]) < 0 ||
				hs2.velocity[1] * (y - hs2.origin[1]) < 0
			) {
				continue
			}
			// Checking if it is inside bounds
			if (x < minCollision || y < minCollision || x > maxCollision || y > maxCollision)
				continue
			// All conditions correct, valid intersection
			res++
		}
	}
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	console.log('Second level solution:\t', res)
}

const input = 'input.txt'
const data = readData(input)
const minCollision = input === 'sample.txt' ? 7 : 200000000000000
const maxCollision = input === 'sample.txt' ? 27 : 400000000000000
firstLevel()
// secondLevel()
