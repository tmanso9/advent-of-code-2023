if [ $# -eq 0 ]; then
	echo "Usage:"
	echo "	./new-day.sh <day-of-challenge>"
	echo ""
	echo "Example: to create the day-24 folder and files"
	echo "	./new-day.sh 24"
else
	length=${#1}

	if [ "$length" -eq 1 ]; then
		day="0$1"
	else
		day="$1"
	fi

	echo "Creating folder and files..."
	mkdir "day-$day"
	touch "day-$day/solution.js"
	touch "day-$day/sample.txt"
	touch "day-$day/input.txt"
	solutionJSContents=$(cat day-${day}/solution.js)
	if [ -z "$solutionJSContents" ]; then
		echo "const { readData, printMap, PriorityQueue } = require('../utils')" >> "day-$day/solution.js"
		echo "" >> "day-$day/solution.js"
		echo "const data = readData('sample.txt')" >> "day-$day/solution.js"
		echo "" >> "day-$day/solution.js"
		echo 'let res = 0' >> "day-$day/solution.js"
		echo "" >> "day-$day/solution.js"
		echo "const firstLevel = () => {" >> "day-$day/solution.js"
		echo '\tconsole.log("First level solution:\\t", res)' >> "day-$day/solution.js"
		echo "}" >> "day-$day/solution.js"
		echo "" >> "day-$day/solution.js"
		echo "const secondLevel = () => {" >> "day-$day/solution.js"
		echo '\tconsole.log("Second level solution:\\t", res)' >> "day-$day/solution.js"
		echo "}" >> "day-$day/solution.js"
		echo "" >> "day-$day/solution.js"
		echo "firstLevel()" >> "day-$day/solution.js"
		echo "secondLevel()" >> "day-$day/solution.js"
	fi

	echo "All done!"
fi