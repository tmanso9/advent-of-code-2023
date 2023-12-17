const { readData, printMap, PriorityQueue } = require('../utils')

class heatPriorityQueue extends PriorityQueue {
	// Returns the heat loss value of the parent node in a heap data structure.
	parent(index) {
		return this.heap[this.getParentIndex(index)].heatLoss
	}

	// Returns the heat loss value of the left child node in a heap data structure.
	leftChild(index) {
		return this.heap[this.getLeftChildIndex(index)].heatLoss
	}

	// Returns the heat loss value of the right child node in a heap data structure.
	rightChild(index) {
		return this.heap[this.getRightChildIndex(index)].heatLoss
	}

	// Maintains the heap property by moving an element up the heap
	// until its parent is smaller than it.
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

/**
 * The `dijkstra` function implements Dijkstra's algorithm to find the minimum heat loss path in a
 * grid, given a minimum and maximum number of steps.
 * @param input - The `input` parameter is a 2D array representing a grid. Each element in the array
 * represents the heat loss at that position in the grid.
 * @param min - The `min` parameter in the `dijkstra` function represents the minimum number of steps
 * required in one direction to reach the destination and before being able to turn in another direction.
 * @param max - The `max` parameter represents the maximum number of steps that can be taken in any
 * direction from a given position.
 * @returns the heat loss value if the destination is reached and the number of steps is greater than
 * or equal to the minimum number of steps required. Otherwise, it returns -1.
 */
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
	console.log('Could not find a path')
	return -1
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
	const minSteps = 0
	const maxSteps = 3
	const res = dijkstra(input, minSteps, maxSteps)
	console.log('First level solution:\t', res)
}

const secondLevel = (input) => {
	const minSteps = 4
	const maxSteps = 10
	const res = dijkstra(input, minSteps, maxSteps)
	console.log('Second level solution:\t', res)
}

const main = () => {
	const data = readData('input.txt')
	const input = processData(data)
	firstLevel(input)
	secondLevel(input)
}

main()
