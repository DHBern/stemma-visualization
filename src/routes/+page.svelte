<script>
	import { extent } from 'd3-array';
	import Canvas from '$lib/Canvas.svelte';
	import items from './dates.json';

	const isLeapYear = function(year) {
    if((year & 3) != 0) return false; // Bitwise AND - is divisible by 4
    return ((year % 100) != 0 || (year % 400) == 0); // Is divisible by 100 and 400
	};

	// Get Day of Year
	const getDOY = function(date) {
		console.log(date)
		const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
		const mn = date.getMonth();
		const dn = date.getDate();
		let dayOfYear = dayCount[mn] + dn;
		if(mn > 1 && isLeapYear(date.getFullYear())) dayOfYear++;
		return dayOfYear;
	};

	/**
 	* A function to convert the data in the date field into a date object.
	* outputs a the number of miliseconds since the epoch for each date to use as x-coordinate.
 	* @param {Object[]} items
	* @param {Object} items[].date
	* @param {number=} items[].date.year
	* @param {number=} items[].date.month
	* @param {number=} items[].date.day
 	*/
	function convertDates (items) {
		// let range = extent(items.map(i => new Date(...Object.values(i.date))));
		let converted = items.map(i => {
			const date = new Date(...Object.values(i.date));
			return {
				...i,
				y: date.getFullYear(),
				x: getDOY(date),
				date: date
			}
		});
		console.log(converted);
		return converted
	}
</script>

<section>
	<button on:click={() => convertDates(items.items)}>test</button>
	<Canvas items={items.items[1]?.y ? items.items : convertDates(items.items)} links={items.links} />
</section>

<style lang="scss">
	section {
		margin-left: auto;
		margin-right: auto;
		margin-top: 5rem;
		width: 600px;
		height: 70vh;
	}
</style>
