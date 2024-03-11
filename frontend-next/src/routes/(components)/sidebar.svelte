<script lang="ts">
	import SidebarButton from './sidebar-button.svelte';
	import SidebarSection from './sidebar-section.svelte';
	import PlaceholderIcon from './placeholder-icon.svelte';
	import LedgerSwitcher from './ledger-switcher.svelte';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
</script>

<aside
	class="hidden
  lg:flex lg:min-h-0 lg:flex-col lg:space-y-2 lg:pt-4"
>
	<h1 class="pl-4 pr-4 text-2xl">Beancount</h1>

	<div class="px-2">
		<LedgerSwitcher />
	</div>

	<div class="block flex-1 min-h-0">
		<ScrollArea orientation="vertical" class="h-full">
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
				<span slot="heading">Other Section</span>
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
				<span slot="heading">Utilities</span>
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
		</ScrollArea>
	</div>
</aside>
