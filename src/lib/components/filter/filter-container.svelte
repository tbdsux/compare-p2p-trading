<script lang="ts">
	import {
		Label,
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger
	} from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import fiatList from '$lib/data/binance-fiat-list.json';
	import { actionTypes, availableTokensList } from '$lib/exchanges';
	import { CheckIcon, ChevronsUpDownIcon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList
	} from '../ui/command';
	import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

	import { cn } from '$lib/utils';
	import Refresh from './refresh.svelte';
	import { filterState } from './stateFilter.svelte';

	let openFiatList = $state(false);

	const filterStateType = $derived(filterState.current.type);
	const filterStateSelectedToken = $derived(filterState.current.selectedToken);
	const filterStateFiat = $derived(filterState.current.fiat);
</script>

<div class="flex h-28 items-center justify-between gap-12 rounded-lg border px-6">
	<div class="flex h-full items-center gap-12">
		<div class="space-y-1">
			<Label class="px-0">Type</Label>

			<Select type="single" bind:value={filterState.current.type}>
				<SelectTrigger class="w-[100px]">
					{actionTypes[filterStateType]}
				</SelectTrigger>

				<SelectContent class="w-[100px]">
					<SelectItem value="buy">Buy</SelectItem>
					<SelectItem value="sell">Sell</SelectItem>
				</SelectContent>
			</Select>
		</div>

		<Separator orientation="vertical" />

		<div class="space-y-1">
			<Label class="px-0">Select Token</Label>

			<Select type="single" bind:value={filterState.current.selectedToken}>
				<SelectTrigger class="w-[200px]">
					{filterStateSelectedToken}
				</SelectTrigger>

				<SelectContent class="w-[200px]">
					{#each availableTokensList as token (token)}
						<SelectItem value={token}>{token}</SelectItem>
					{/each}
				</SelectContent>
			</Select>
		</div>

		<Separator orientation="vertical" />

		<div class="space-y-1">
			<Label class="px-0">Fiat List</Label>

			<Popover>
				<PopoverTrigger>
					{#snippet child({ props })}
						<Button
							{...props}
							role="combobox"
							aria-expanded={openFiatList}
							variant="outline"
							class="w-[150px] justify-between"
						>
							{filterStateFiat}
							<ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
						</Button>
					{/snippet}
				</PopoverTrigger>

				<PopoverContent class="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search Fiats..." />
						<CommandList>
							<CommandEmpty>No fiats found.</CommandEmpty>
							<CommandGroup>
								{#each fiatList as fiat (fiat.currencyCode)}
									<CommandItem
										value={fiat.currencyCode}
										onSelect={() => {
											filterState.current.fiat = fiat.currencyCode;
											openFiatList = false;
										}}
									>
										<CheckIcon
											class={cn('mr-2 size-4', {
												'text-transparent': filterStateFiat !== fiat.currencyCode
											})}
										/>

										{fiat.currencyCode}
									</CommandItem>
								{/each}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	</div>

	<Refresh />
</div>
