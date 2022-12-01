<script>
	import { extent } from 'd3-array';
	import Canvas from '$lib/Canvas.svelte';
	// import items from './dates.json';

	//TODO: import this type
/**
	 * @typedef link
	 * @type {Object}
	 * @property {number} id
	 * @property {string} title
	 * @property {number[]} nodes
	 * @property {string} href
	 */

	/**
	 * @typedef {Object} dateItem
	 * @property {number} id
	 * @property {Object} items[].date
	 * @property {number} items[].date.year
	 * @property {number} items[].date.month
	 * @property {number=} items[].date.day
	 * @property {string} href
	 * @property {string} title
	 * @property {string} type
	 * @property {number=} x
	 */

	/**
	 * @typedef {Object} coordinateItem
	 * @property {number} id
	 * @property {string} href
	 * @property {string} title
	 * @property {string} type
	 * @property {number} x
	 * @property {number} y
	 */

	export let data;

	/**
	 * @typedef {Object} Container
	 * @property {dateItem[]} items
	 * @property {link[]} links
	 */


	/** @type {Container} */
	const items = data.items;

	/** @param {number} year */
	const isLeapYear = function (year) {
		if ((year & 3) != 0) return false; // Bitwise AND - is divisible by 4
		return year % 100 != 0 || year % 400 == 0; // Is divisible by 100 and 400
	};

	/**
	 * Get Day of Year
	 * @param {Date} date
	 */
	const getDOY = function (date) {
		const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
		const mn = date.getMonth();
		const dn = date.getDate();
		let dayOfYear = dayCount[mn] + dn;
		if (mn > 1 && isLeapYear(date.getFullYear())) dayOfYear++;
		return dayOfYear;
	};

	/**
	 * A function to convert the data in the date field into a date object.
	 * outputs a the number of miliseconds since the epoch for each date to use as x-coordinate.
	 * @param {(coordinateItem|dateItem)[]} items
	 * @returns {coordinateItem[]}
	 */
	function convertDates(items) {
		if (/** @type {dateItem[]} */ (items)[0]?.date) {
			// let range = extent(items.map(i => new Date(...Object.values(i.date))));
			let converted = items.map((i) => {
				// @ts-ignore
				const date = new Date(...(Object.values(i.date)));
				return {
					...i,
					y: date.getFullYear(),
					x: getDOY(date),
					date: date
				};
			});
			return /** @type {coordinateItem[]} */ (converted);
		} else {
			return /** @type {coordinateItem[]} */ (items);
		}
	}
</script>

<section>
	<Canvas items={convertDates(items.items)} links={items.links} />
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
