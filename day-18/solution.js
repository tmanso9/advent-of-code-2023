const { readData, printMap, DIR, PriorityQueue } = require('../utils')

const data = readData('input.txt')

let res = 0

const dirs = {
	R: { y: 0, x: 1 },
	D: { y: 1, x: 0 },
	L: { y: 0, x: -1 },
	U: { y: -1, x: 0 }
}

const shoeLaceFormula = (digs) => {
	let area = 0
	for (let i = 0; i < digs.length; i++) {
		let prevI = i - 1
		let nextI = i + 1
		if (i === 0) prevI = digs.length - 1
		if (i === digs.length - 1) nextI = 0
		const val = digs[i].y * (digs[prevI].x - digs[nextI].x)
		area += val
	}
	area = Math.abs(area) / 2
	return area
}

const picksTheorem = (area, boundaryPoints) => {
	return area - boundaryPoints / 2 + 1
}

const firstLevel = () => {
	const digs = [{y: 0, x: 0}]
	let boundaryPoints = 0
	data.forEach((line, i) => {
		let [dir, steps, color] = line.split(' ')
		color = color.substring(1).replace(')', '')
		steps = parseInt(steps)
		dir = dirs[dir]
		const y = digs[digs.length - 1].y
		const x = digs[digs.length - 1].x
		boundaryPoints += steps
		digs.push({y: y + dir.y * steps, x: x + dir.x * steps})
	})
	const area = shoeLaceFormula(digs)
	const interiorArea = picksTheorem(area, boundaryPoints)
	res = boundaryPoints + interiorArea

	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	let digs = [{y: 0, x: 0}]
	let boundaryPoints = 0
	data.forEach(line => {
		const hexa = line.split(' ')[2].substring(1).replace(/[#)]/g, '')
		const dir = Object.values(dirs)[parseInt(hexa[5])]
		const steps = parseInt(hexa.substring(0, 5), 16)
		const y = digs[digs.length - 1].y
		const x = digs[digs.length - 1].x
		boundaryPoints += steps
		digs.push({ y: y + dir.y * steps, x: x + dir.x * steps })
	})

	const area = shoeLaceFormula(digs)
	const interiorArea = picksTheorem(area, boundaryPoints)
	res = boundaryPoints + interiorArea
	console.log('Second level solution:\t', res)
}

// firstLevel()
secondLevel()
