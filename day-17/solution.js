const { readData, printMap, DIR } = require('../utils/helper')
const { PriorityQueue } = require('../utils/PriorityQueue')

class heatPriorityQueue extends PriorityQueue {
	parent(index) {
		return this.heap[this.getParentIndex(index)].heatLoss
	}

	leftChild(index) {
		return this.heap[this.getLeftChildIndex(index)].heatLoss
	}

	rightChild(index) {
		return this.heap[this.getRightChildIndex(index)].heatLoss
	}

	heapifyUp() {
		let index = this.heap.length - 1
		while (
			this.hasParent(index) &&
			this.parent(index) > this.heap[index].heatLoss
		) {
			this.swap(this.getParentIndex(index), index)
			index = this.getParentIndex(index)
		}
	}

	heapifyDown() {
		let index = 0
		while (this.hasLeftChild(index)) {
			let smallerChildIndex = this.getLeftChildIndex(index)
			if (
				this.hasRightChild(index) &&
				this.rightChild(index) < this.leftChild(index)
			) {
				smallerChildIndex = this.getRightChildIndex(index)
			}
			if (
				this.heap[index].heatLoss <
				this.heap[smallerChildIndex].heatLoss
			) {
				break
			} else {
				this.swap(index, smallerChildIndex)
			}
			index = smallerChildIndex
		}
	}

	print() {
		let str = ''
		for (let i = 0; i < this.heap.length; i++) {
			str += this.heap[i].heatLoss + ' '
		}
		console.log(str)
	}
}

const dijkstra = (input, min, max) => {
	const seen = new Set()
	const pq = new heatPriorityQueue()
	pq.add({ heatLoss: 0, row: 0, col: 0, dirRow: 0, dirCol: 0, steps: 0 })

	while (pq.heap.length > 0) {
		const { heatLoss, row, col, dirRow, dirCol, steps } = pq.remove()
		const storePosition = `[${row}][${col}], (${dirRow})(${dirCol}), ${steps}`

		if (
			row === input.length - 1 &&
			col === input[row].length - 1 &&
			steps >= min
		) {
			return heatLoss
		}

		if (seen.has(storePosition)) continue
		seen.add(storePosition)

		if (steps < max && !(dirRow === 0 && dirCol === 0)) {
			newRow = row + dirRow
			newCol = col + dirCol
			if (
				newRow >= 0 &&
				newRow < input.length &&
				newCol >= 0 &&
				newCol < input[newRow].length
			)
				pq.add({
					heatLoss: heatLoss + input[newRow][newCol],
					row: newRow,
					col: newCol,
					dirRow,
					dirCol,
					steps: steps + 1
				})
		}
		
		if (steps && steps < min) continue
		
		const possibleDirections = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0]
		]

		for (const [newDirRow, newDirCol] of possibleDirections) {
			if (
				!(newDirRow === dirRow && newDirCol === dirCol) &&
				!(newDirRow === -dirRow && newDirCol === -dirCol)
			) {
				newRow = row + newDirRow
				newCol = col + newDirCol
				if (
					newRow >= 0 &&
					newRow < input.length &&
					newCol >= 0 &&
					newCol < input[newRow].length
				)
					pq.add({
						heatLoss: heatLoss + input[newRow][newCol],
						row: newRow,
						col: newCol,
						dirRow: newDirRow,
						dirCol: newDirCol,
						steps: 1
					})
			}
		}
	}
	console.log(seen)
	return 0
}

const processData = (data) => {
	const input = []
	data.forEach((line, y) => {
		if (line.length) {
			input[y] = line.split('').map(Number)
		}
	})

	return input
}

const firstLevel = (input) => {
	const res = dijkstra(input, 0, 3)
	console.log('First level solution:\t', res)
}

const secondLevel = (input) => {
	const res = dijkstra(input, 4, 10)
	console.log('Second level solution:\t', res)
}

const main = () => {
	const data = readData('input.txt')
	const input = processData(data)
	firstLevel(input)
	secondLevel(input)
}

main()
