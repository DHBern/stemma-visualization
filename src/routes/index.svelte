<script>
	import Canvas from '$lib/Canvas.svelte';
    import items from './items.json';

</script>

<section>
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
