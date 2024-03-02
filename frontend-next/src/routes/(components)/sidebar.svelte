<script lang="ts">
	import { cn } from '@/utils';
	import SidebarButton from './sidebar-button.svelte';
	import SidebarSection from './sidebar-section.svelte';
	import PlaceholderIcon from './placeholder-icon.svelte';
	import LedgerSwitcher from './ledger-switcher.svelte';

	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<div class={cn('pb-12', className)}>
	<div class="space-y-4 py-4 overflow-y-auto">
    <h1 class="pl-4 pr-4 text-2xl" >Beancount</h1>

    <div class="pl-2 pr-2">
      <LedgerSwitcher />
    </div>

		<SidebarSection>
			<SidebarButton href="/income-statement">
        <PlaceholderIcon />
        Income Statement
			</SidebarButton>
			<SidebarButton href="/balance-sheet">
        <PlaceholderIcon />
				Balance Sheet
			</SidebarButton>
			<SidebarButton href="/trial-balance">
        <PlaceholderIcon />
        Trial Balance
			</SidebarButton>
			<SidebarButton href="/journal">
        <PlaceholderIcon />
        Journal
			</SidebarButton>
			<SidebarButton href="/query">
        <PlaceholderIcon />
        Query
			</SidebarButton>
		</SidebarSection>

		<SidebarSection>
      <span slot='heading'>Other Section</span>
			<SidebarButton href="/holdings">
        <PlaceholderIcon />
        Holdings
			</SidebarButton>
			<SidebarButton href="/commodities">
        <PlaceholderIcon />
        Commodities
			</SidebarButton>
			<SidebarButton href="/documents">
        <PlaceholderIcon />
        Documents
			</SidebarButton>
			<SidebarButton href="/events">
        <PlaceholderIcon />
        Events
			</SidebarButton>
			<SidebarButton href="/statistics">
        <PlaceholderIcon />
        Statistics
			</SidebarButton>
		</SidebarSection>

		<SidebarSection>
      <span slot='heading'>Utilities</span>
			<SidebarButton href="/editor">
        <PlaceholderIcon />
        Editor
			</SidebarButton>
			<SidebarButton href="/import">
        <PlaceholderIcon />
        Import
			</SidebarButton>
			<SidebarButton href="/options">
        <PlaceholderIcon />
        Options
			</SidebarButton>
			<SidebarButton href="/help">
        <PlaceholderIcon />
        Help
			</SidebarButton>
		</SidebarSection>
	</div>
</div>
