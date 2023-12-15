const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')

let res = 0

const firstLevel = () => {
	let transposed = []
	for (let y in data) {
		for (let x in data[y]) {
			transposed[x] = transposed[x] || ''
			transposed[x] += data[y][x]
		}
	}

	transposed.forEach((line, y) => {
		let parts = line.split('#')
		for (let x = 0; x < parts.length; x++) {
			parts[x] = parts[x].split('').sort().reverse().join('')
		}

		transposed[y] = parts.join('#')
	})

	transposed.forEach((line) => {
		for (let i = 0; i < line.length; i++) {
			if (line[i] === 'O') {
				res += line.length - i
			}
		}
	})
	console.log('First level solution:\t', res)
}

const transpose = (matrix) => {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < y; x++) {
			const temp = matrix[y][x]
			matrix[y][x] = matrix[x][y]
			matrix[x][y] = temp
		}
	}

	matrix.forEach((line) => {
		line = line.reverse()
	})
}

const cycle = (grid) => {
	let transposed = []
	grid.forEach((line, i) => {
		transposed[i] = []
		for (let x = 0; x < line.length; x++) {
			transposed[i][x] = line[x]
		}
	})

	transpose(transposed)

	for (let i = 0; i < 4; i++) {
		transposed.forEach((line, y) => {
			let parts = line.join('').split('#')
			for (let x = 0; x < parts.length; x++) {
				parts[x] = parts[x].split('').sort().join('')
			}
			transposed[y] = parts.join('#').split('')
		})
		if (i < 3) transpose(transposed)
	}

	return transposed
}

const calcLoad = (transposed) => {
	transposed.forEach((line, y) => {
		const rocks = line.reduce((acc, val) => acc + (val === 'O'), 0)
		res += rocks * (transposed.length - y)
	})
}

const secondLevel = () => {
	res = 0
	const seen = new Set()
	const cache = []

	let transposed = []
	data.forEach((line, i) => {
		transposed[i] = []
		for (let x = 0; x < line.length; x++) {
			transposed[i][x] = line[x]
		}
	})

	let i = 1
	cache.push(transposed)
	for (; i < 10000000000; i++) {
		transposed = cycle(transposed)
		if (seen.has(transposed.toString())) {
			break
		} else {
			seen.add(transposed.toString())
			cache.push([...transposed])
		}
	}
	let first = 0
	for (let i = 0; i < cache.length; i++) {
		if (JSON.stringify(cache[i]) === JSON.stringify(transposed)) {
			first = i
			break
		}
	}
	transposed = cache[(1000000000 - first) % (i - first) + first]
	calcLoad(transposed)


	console.log('Second level solution:\t', res)
}

firstLevel()
secondLevel()
