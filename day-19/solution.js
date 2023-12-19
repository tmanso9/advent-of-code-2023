const { readData, printMap, DIR, PriorityQueue } = require('../utils')

const data = readData('input.txt')

let res = 0

const firstLevel = () => {
	let [workflowInputs, partRatingInputs] = data
		.join('\n')
		.split('\n\n')
		.map((section) => section.split('\n'))
	const workflows = new Map()
	for (line of workflowInputs) {
		const name = line.substr(0, line.indexOf('{'))
		const ruleInput = line
			.substr(line.indexOf('{'))
			.replaceAll(/[{}]/g, '')
			.split(',')
		const rules = []
		for (const rule of ruleInput) {
			let part, right, op, final, dest, compareFn
			if (!rule.includes(':')) {
				final = true
				dest = rule
			} else {
				;[part, op, right, dest] = rule
					.match(/([xmas])([<>])(\d+):(\w+)/)
					.splice(1)
				final = false
				// console.log(part, op, right, dest)
				right = parseInt(right)
				compareFn = new Function('part', `return part ${op} ${right}`)
			}
			rules.push({ final, dest, compareFn, part })
		}
		workflows.set(name, rules)
	}
	// console.log(workflows)
	const partRatings = []
	for (const partRating of partRatingInputs) {
		const parts = partRating.replaceAll(/[{}]/g, '').split(',')
		// console.log(parts)
		let rating = {}
		parts.forEach((part) => {
			let [name, val] = part.split('=')
			rating[`${name}`] = parseInt(val)
		})
		partRatings.push(rating)
	}

	const accepted = []
	partRatings.forEach((rating) => {
		const queue = []
		let rejected = false
		let ratingOk = false
		queue.push(workflows.get('in'))
		while (queue.length && !rejected && !ratingOk) {
			const curr = queue.shift()
			for (const rule of curr) {
				if (ratingOk || queue.length || rejected) break
				if (rule.final) {
					if (rule.dest === 'A') {
						if (!accepted.includes(rating)) {
							accepted.push(rating)
						}
						ratingOk = true
					} else if (rule.dest === 'R') {
						rejected = true
					} else {
						queue.push(workflows.get(rule.dest))
					}
				} else {
					if (rule.compareFn(rating[rule.part]) === true) {
						if (rule.dest === 'A') {
							if (!accepted.includes(rating)) {
								accepted.push(rating)
							}
							ratingOk = true
						} else if (rule.dest === 'R') {
							rejected = true
						} else {
							queue.push(workflows.get(rule.dest))
						}
					}
				}
			}
		}
	})
	res = accepted.reduce((acc, val) => {
		return acc + val.x + val.m + val.a + val.s
	}, 0)
	console.log('First level solution:\t', res)
}

const secondLevel = () => {
	console.log('Second level solution:\t', res)
}

firstLevel()
// secondLevel()
