<script lang="ts">
	import { filterState, refreshTimers } from '$lib/components/filter/stateFilter.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import type { ExchangeP2PAd, filterExchangesArr } from '$lib/exchanges';
	import { fetchUrlBuilder } from '$lib/exchanges/url-builder';
	import { cn } from '$lib/utils';
	import { createQuery } from '@tanstack/svelte-query';

	let {
		exchange
	}: {
		exchange: ReturnType<typeof filterExchangesArr>[number];
	} = $props();

	const filterStateSelectedToken = $derived(filterState.current.selectedToken);
	const filterStateType = $derived(filterState.current.type);
	const filterStateFiat = $derived(filterState.current.fiat);
	const refreshTimer = $derived(filterState.current.refreshTimer);
	const viewMode = $derived(filterState.current.viewMode);

	let ads = $derived.by(() =>
		createQuery<{ responses: null | ExchangeP2PAd[] }>({
			queryKey: ['ads', exchange.key, filterStateSelectedToken, filterStateType, filterStateFiat],
			queryFn: async () => {
				const res = await fetch(
					fetchUrlBuilder(
						{
							type: filterStateType,
							fiat: filterStateFiat,
							token: filterStateSelectedToken
						},
						exchange.key
					)
				);

				if (!res.ok) {
					throw new Error('Network response was not ok');
				}

				return (await res.json()) as { responses: null | ExchangeP2PAd[] };
			},
			refetchInterval: refreshTimer ? refreshTimers[refreshTimer].value : false,
			refetchIntervalInBackground: refreshTimer ? true : false
		})
	);
</script>

<Card class="w-lg">
	<CardHeader>
		<CardTitle class="inline-flex items-center gap-2">
			<img
				src={exchange.icon}
				alt={exchange.name}
				class="size-10 rounded-lg border bg-secondary p-1"
			/>

			<span>{exchange.name}</span>
		</CardTitle>
	</CardHeader>

	<CardContent class="bg-secondary py-6">
		{#if $ads.isPending}
			<p class="text-muted-foreground">Loading...</p>
		{:else if $ads.isError}
			<p class="text-red-500">Error: {$ads.error.message}</p>
		{:else if $ads.data?.responses && $ads.data.responses.length > 0}
			<ScrollArea
				class={cn('pr-4', {
					'h-[900px]': viewMode === 'grid',
					'h-[600px]': viewMode === 'horizontal'
				})}
			>
				<div class="grid grid-cols-1 gap-4">
					{#each $ads.data.responses as ad (ad.advNo)}
						<Card>
							<CardHeader>
								<CardTitle class="flex items-center justify-between">
									<div class="text-lg font-black">
										{new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: ad.fiatUnit
										}).format(Number(ad.price))}
									</div>

									<div class="text-muted-foreground">
										{ad.advertiser.name}
									</div>
								</CardTitle>
								<CardDescription>
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: ad.fiatUnit
									}).format(Number(ad.minSingleTransAmount))} - {new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: ad.fiatUnit
									}).format(Number(ad.maxSingleTransAmount))}{' '}
									{ad.fiatUnit} <br />
									{ad.advertiser.monthOrderCount} trades • {Number(
										(ad.advertiser.positiveRate * 100).toFixed(2)
									)}% completion
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<div class="flex flex-wrap gap-1">
									{#each ad.paymentMethods as payment}
										<Badge
											variant="outline"
											style={`${payment.bgColor ? `background-color: ${payment.bgColor}` : ''}`}
											class="text-neutral-50"
										>
											{payment.name}
										</Badge>
									{/each}
								</div>
							</CardFooter>
						</Card>
					{/each}
				</div>
			</ScrollArea>
		{:else}
			<p class="text-muted-foreground">No ads found.</p>
		{/if}
	</CardContent>

	<CardFooter>
		<small>
			<a
				href={exchange.p2pLink}
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground underline"
				title={`Trade on ${exchange.name}`}
			>
				Trade on {exchange.name}
			</a>
		</small>
	</CardFooter>
</Card>
