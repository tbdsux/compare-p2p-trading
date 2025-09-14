<script lang="ts">
	import FilterContainer from '$lib/components/filter/filter-container.svelte';
	import { filterState } from '$lib/components/filter/stateFilter.svelte';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import AlertTitle from '$lib/components/ui/alert/alert-title.svelte';
	import { filterExchangesArr } from '$lib/exchanges';
	import { InfoIcon } from 'lucide-svelte';
	import ExchangeCards from './exchange-cards.svelte';

	const filterStateSelectedToken = $derived(filterState.current.selectedToken);
</script>

<div class=" space-y-12">
	<FilterContainer />

	<div class="space-y-4">
		<Alert>
			<InfoIcon />
			<AlertTitle>Only exchanges with public APIs are listed, more will be added soon.</AlertTitle>
			<AlertDescription>
				Minimum of 10 ads / prices are shown by default, since you would only want the best prices
				anyway.
			</AlertDescription>
		</Alert>

		<Alert>
			<InfoIcon />
			<AlertTitle>Fiat List</AlertTitle>
			<AlertDescription>
				The list is based from Binance's P2P fiat list, other exchanges may have different fiat
				support.
			</AlertDescription>
		</Alert>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
		{#each filterExchangesArr(filterStateSelectedToken) as exchange (exchange.key)}
			<ExchangeCards {exchange} />
		{/each}
	</div>
</div>
