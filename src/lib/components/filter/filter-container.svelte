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
	import {
		CheckIcon,
		ChevronsUpDownIcon,
		GalleryHorizontalIcon,
		LayoutGridIcon
	} from 'lucide-svelte';
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

<div
	class="flex flex-col items-center justify-between gap-12 rounded-lg border px-6 py-6 lg:h-28 lg:flex-row lg:py-0"
>
	<div class="flex h-full w-full flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-12">
		<div class="w-full space-y-1 lg:w-auto">
			<Label class="px-0">Type</Label>

			<Select type="single" bind:value={filterState.current.type}>
				<SelectTrigger class="w-full lg:w-[100px]">
					{actionTypes[filterStateType]}
				</SelectTrigger>

				<SelectContent class="w-full lg:w-[100px]">
					<SelectItem value="buy">Buy</SelectItem>
					<SelectItem value="sell">Sell</SelectItem>
				</SelectContent>
			</Select>
		</div>

		<div class="w-full space-y-1 lg:w-auto">
			<Label class="px-0">Select Token</Label>

			<Select type="single" bind:value={filterState.current.selectedToken}>
				<SelectTrigger class="w-full lg:w-[150px]">
					{filterStateSelectedToken}
				</SelectTrigger>

				<SelectContent class="w-full lg:w-[150px]">
					{#each availableTokensList as token (token)}
						<SelectItem value={token}>{token}</SelectItem>
					{/each}
				</SelectContent>
			</Select>
		</div>

		<div class="w-full space-y-1 lg:w-auto">
			<Label class="px-0">Fiat List</Label>

			<Popover>
				<PopoverTrigger>
					{#snippet child({ props })}
						<Button
							{...props}
							role="combobox"
							aria-expanded={openFiatList}
							variant="outline"
							class="w-full justify-between lg:w-[150px]"
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

	<Separator orientation="vertical" class="hidden lg:block" />

	<div class="inline-flex items-center gap-8">
		<Refresh />

		<div class="space-y-1 text-center">
			<Label class="px-0">View Mode</Label>

			<div class="inline-flex items-center gap-1">
				<Button
					title="Grid View"
					variant="ghost"
					onclick={() => (filterState.current.viewMode = 'grid')}
					class={cn('cursor-pointer', {
						'opacity-50': filterState.current.viewMode !== 'grid'
					})}
				>
					<LayoutGridIcon />
				</Button>

				<Button
					title="Horizontal View"
					variant="ghost"
					onclick={() => (filterState.current.viewMode = 'horizontal')}
					class={cn('cursor-pointer', {
						'opacity-50': filterState.current.viewMode !== 'horizontal'
					})}
				>
					<GalleryHorizontalIcon />
				</Button>
			</div>
		</div>
	</div>
</div>
