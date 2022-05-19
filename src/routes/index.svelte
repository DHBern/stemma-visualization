<script>
	import { extent } from 'd3-array';
	import Canvas from '$lib/Canvas.svelte';
	import items from './dates.json';

	/**
 	*
 	* @param {Array.<Object.<string, number|string|Object<string, number>>>} items
 	*/
	function convertDates (items) {
		console.log(items)
		let range = extent(items.map(i => new Date(...Object.values(i.date))));
		let converted;
		console.log(range)
		return range

	}
</script>

<section>
	<button on:click={() => convertDates(items.items)}>test</button>
	<Canvas items={items.items} links={items.links} />
</section>

<style lang="scss">
	section {
		margin-left: auto;
		margin-right: auto;
		margin-top: 5rem;
		width: 600px;
	}
</style>
