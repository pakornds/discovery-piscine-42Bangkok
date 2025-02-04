if [ $# -eq 0 ]; then
	echo "No arguments supplied"
fi
c=0
for i in $*; do
	echo $i
	c=$((c+1))
	if [ $c -ge 3 ]; then
		break
	fi
done
