<script>
	import { extent } from 'd3-array';
	import Canvas from '$lib/Canvas.svelte';
	import items from './dates.json';

	/**
 	* A function to convert the data in the date field into a date object.
	* outputs a the number of miliseconds since the epoch for each date to use as x-coordinate.
 	* @param {Object[]} items
	* @param {Object} items[].date
	* @param {number} items[].date.year
	* @param {number?} items[].date.month
	* @param {number=} items[].date.day
 	*/
	function convertDates (items) {
		// let range = extent(items.map(i => new Date(...Object.values(i.date))));
		let converted = items.map(i => {
			// @ts-ignore
			const date = new Date(...Object.values(i.date));
			return {
				...i,
				x: date.valueOf(),
				date: date
			}
		});

		return converted
	}
</script>

<section>
	<button on:click={() => convertDates(items.items)}>test</button>
	<Canvas items={items.items[1]?.x ? items.items : convertDates(items.items)} links={items.links} />
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
