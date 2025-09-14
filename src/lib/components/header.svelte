<script lang="ts">
	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import { mode, toggleMode } from 'mode-watcher';
	import { Button } from './ui/button';
</script>

<header class="flex flex-col items-start justify-between gap-6 pt-6 md:flex-row md:items-center">
	<div>
		<h1 class="text-xl font-black">Crypto P2P Comparison</h1>
		<p class="text-muted-foreground">Compare P2P prices from different exchages in real-time.</p>
	</div>

	<div class="inline-flex items-center gap-2">
		<Button
			href="https://github.com/tbdsux/compare-p2p-trading"
			target="_blank"
			rel="noopener noreferrer"
			variant="link"
			title="View source on GitHub"
		>
			<img
				src={`https://cdn.simpleicons.org/github/${mode.current === 'dark' ? 'white' : 'black'}`}
				alt="Github Repo"
				class="size-6"
			/>
		</Button>

		<Button onclick={toggleMode} variant="outline" size="icon" title="Toggle theme">
			<SunIcon
				class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
			/>
			<MoonIcon
				class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</header>
