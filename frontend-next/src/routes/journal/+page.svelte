<script>
	import PageContent from "../(components)/page-content.svelte";
	import DataTable from "./(components)/data-table.svelte";

</script>

<PageContent>
  <span slot="heading">Journal</span>

  <div class="flex-1 min-h-0 block">
    <DataTable />
  </div>
</PageContent>
