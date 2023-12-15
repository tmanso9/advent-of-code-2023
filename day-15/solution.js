const { readData, printMap } = require('../utils/helper')

const data = readData('input.txt')
const input = data.join('\n').replaceAll('\n', '').split(',')
let res = 0

const hash = (val) => {
	return val.split('').reduce((acc, letter) => {
		acc += letter.charCodeAt(0)
		acc *= 17
		acc %= 256
		return acc
	}, 0)
}

const firstLevel = () => {
	input.forEach((val) => {
		res += hash(val)
	})
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	res = 0
	const boxes = Array.from({ length: 256 }, () => [])

	input.forEach((val) => {
		const [label, op, modifier] = val
			.match(/([^=-]+)([=-])([^=-]*)/)
			.slice(1)
		const labelBox = hash(label)
		const lensExists = boxes[labelBox].find((val) => val.label === label)

		switch (op) {
			case '=':
				if (lensExists) {
					lensExists.val = modifier
				} else {
					boxes[labelBox].push({ label, val: modifier })
				}
				break
			case '-':
				boxes[labelBox] = boxes[labelBox].filter(
					(val) => val !== lensExists
				)
		}
	})

	boxes.forEach((box, i) => {
		let acc = 0
		box.forEach((elem, x) => {
			let elemTotal = (x + 1) * elem.val
			acc += (i + 1) * elemTotal
		})
		res += acc
	})
	console.log('Second level solution:\t', res)
}

firstLevel()
secondLevel()
