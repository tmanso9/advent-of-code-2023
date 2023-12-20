const LCM = (arr, n) => {
	const GCD = (a, b) => {
		let x = Math.abs(a)
		let y = Math.abs(b)
		while (y) {
			const t = y
			y = x % y
			x = t
		}
		return x
	}

	let ans = arr[0]

	for (let i = 0; i < n; i++) {
		ans = (arr[i] * ans) / GCD(arr[i], ans)
	}

	return ans
}

module.exports = { LCM }