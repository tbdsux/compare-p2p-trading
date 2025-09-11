<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';

	import Header from '$lib/components/header.svelte';
	import '@fontsource-variable/outfit';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<main class="container mx-auto space-y-8">
	<Header />

	<hr class="" />

	<div class="">{@render children?.()}</div>
</main>
