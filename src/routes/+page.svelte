<script lang="ts">
	import FilterContainer from '$lib/components/filter/filter-container.svelte';
	import { filterState } from '$lib/components/filter/stateFilter.svelte';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import AlertTitle from '$lib/components/ui/alert/alert-title.svelte';
	import { ScrollArea, Scrollbar } from '$lib/components/ui/scroll-area';
	import { filterExchangesArr } from '$lib/exchanges';
	import { cn } from '$lib/utils';
	import { InfoIcon } from 'lucide-svelte';
	import ExchangeCards from './exchange-cards.svelte';

	const filterStateSelectedToken = $derived(filterState.current.selectedToken);
	const filterStateViewMode = $derived(filterState.current.viewMode);
</script>

<div class="space-y-6">
	<FilterContainer />

	<Accordion type="single">
		<AccordionItem class="border-b last:border-b">
			<AccordionTrigger>Notes</AccordionTrigger>

			<AccordionContent>
				<div class="space-y-4">
					<Alert>
						<InfoIcon />
						<AlertTitle
							>Only exchanges with public APIs are listed, more will be added soon.</AlertTitle
						>
						<AlertDescription>
							Minimum of 10 ads / prices are shown by default, since you would only want the best
							prices anyway.
						</AlertDescription>
					</Alert>

					<Alert>
						<InfoIcon />
						<AlertTitle>Fiat List</AlertTitle>
						<AlertDescription>
							The list is based from Binance's P2P fiat list, other exchanges may have different
							fiat support.
						</AlertDescription>
					</Alert>
				</div>
			</AccordionContent>
		</AccordionItem>
	</Accordion>

	<div class="">
		{#if filterStateViewMode === 'horizontal'}
			<ScrollArea
				class={cn('w-full rounded-md border p-1', {
					'lg:rounded-md lg:border lg:p-4': filterStateViewMode === 'horizontal'
				})}
				orientation="horizontal"
			>
				<Scrollbar orientation="horizontal" />
				<div class="flex w-max space-x-4 p-4">
					{#each filterExchangesArr(filterStateSelectedToken) as exchange (exchange.key)}
						<ExchangeCards {exchange} />
					{/each}
				</div>
			</ScrollArea>
		{:else}
			<div
				class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-8 xl:grid-cols-3 2xl:gap-12 4xl:grid-cols-4"
			>
				{#each filterExchangesArr(filterStateSelectedToken) as exchange (exchange.key)}
					<ExchangeCards {exchange} />
				{/each}
			</div>
		{/if}
	</div>
</div>
