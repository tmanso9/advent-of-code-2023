const { readData } = require('../utils/helper')

const createHistory = (item) => {
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
}

const addNextValue = (item) => {
	item.reverse()
	item.forEach((value, i) => {
		if (i === 0) value.push(0)
		else value.push(value[value.length - 1] + item[i - 1][value.length - 1])
	})
	item.reverse()
}

const addPreviousValue = (item) => {
	item.forEach((elem, index) => {
		elem.reverse()
		if (index === 0) elem.push(0)
		else elem.push(elem[elem.length - 1] - item[index - 1][elem.length - 1])
	})
	item.forEach((elem) => {
		elem.reverse()
	})
}

const firstLevel = (itemsHistory) => {
	let sum = 0
	for (item of itemsHistory) {
		addNextValue(item)
		const numOfElems = item[0].length
		sum += item[0][numOfElems - 1]
	}

	console.log('First level solution:\t', sum)
}

const secondLevel = (itemsHistory) => {
	let sum = 0

	for (item of itemsHistory) {
		item.reverse()
		addPreviousValue(item)
		item.reverse()
		sum += item[0][0]
	}

	console.log('Second level solution:\t', sum)
}

const main = () => {
	const data = readData('input.txt')
	const itemsHistory = []
	data.forEach((line) => {
		itemsHistory.push([line.split(' ').map(Number)])
	})

	itemsHistory.forEach(createHistory)
	firstLevel(itemsHistory)
	secondLevel(itemsHistory)
}

main()
