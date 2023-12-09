const { readData } = require('../utils/helper')

const data = readData('sample.txt')

const itemsHistory = []
let sum = 0

for (line of data) {
	itemsHistory.push([line.split(' ').map(Number)])
}

for (item of itemsHistory) {
	while (!item[item.length - 1].every((val) => val === 0)) {
		item.push(
			item[item.length - 1]
				.map((val, i) => {
					if (i > 0) {
						return val - item[item.length - 1][i - 1]
					}
				})
				.filter((val) => val !== undefined)
		)
	}

	item.reverse()
	item.forEach((value, i) => {
		if (i === 0) value.push(0)
		else value.push(value[value.length - 1] + item[i - 1][value.length - 1])
	})

	item.reverse()
	const numOfElems = item[0].length
	sum += item[0][numOfElems - 1]
}

const firstLevel = () => {
	console.log('First level solution:\t', sum)
}

const secondLevel = () => {
	sum = 0

	for (item of itemsHistory) {
		item.reverse()
		item.forEach((elem, index) => {
			elem.reverse()
			if (index === 0) elem.push(0)
			else
				elem.push(
					elem[elem.length - 1] - item[index - 1][elem.length - 1]
				)
		})
		item.forEach((elem) => {
			elem.reverse()
		})
		item.reverse()
		const numOfElems = item[0].length
		sum += item[0][0]
	}

	console.log('Second level solution:\t', sum)
}

firstLevel()
secondLevel()
