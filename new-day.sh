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
	echo "All done!"
fi