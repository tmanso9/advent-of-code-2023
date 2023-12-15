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
	let boxes = []
	input.forEach((val) => {
		const sep = val.match(/[=-]/)
		const label = val.substr(0, sep.index)
		const op = sep[0]
		const modifier = val.substr(sep.index + 1)
		const labelBox = hash(label)
		const alreadyHasIt = boxes[labelBox]
			? boxes[labelBox].find((val) => {
					return val.label === label
			  })
			: false
		switch (op) {
			case '=':
				if (!boxes[labelBox]) boxes[labelBox] = []
				if (alreadyHasIt) {
					alreadyHasIt.val = modifier
				} else {
					boxes[labelBox].push({ label, val: modifier })
				}
				break
			case '-':
				if (!boxes[labelBox]) break
				if (alreadyHasIt) {
					const i = boxes[labelBox].indexOf(alreadyHasIt)
					boxes[labelBox] = boxes[labelBox]
						.slice(0, i)
						.concat(boxes[labelBox].slice(i + 1))
				}
		}
	})

	boxes.forEach((box, i) => {
		if (!box.length) return
		let acc = 0
		box.forEach((elem, x) => {
			let elemTotal = x + 1
			elemTotal *= elem.val
			acc += (i + 1) * elemTotal
		})
		res += acc
	})
	console.log('Second level solution:\t', res)
}

firstLevel()
secondLevel()
