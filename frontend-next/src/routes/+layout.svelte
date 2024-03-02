<script>
  import { ModeWatcher } from "mode-watcher";
	import '../app.pcss';
	import Sidebar from "./(components)/sidebar.svelte";
</script>

<ModeWatcher />

<div class="h-full md:hidden">
  <div>A Mobile Header Bar</div>
  <div class="col-span-3 lg:col-span-4 lg:border-l">
    <div class="px-4 py-6 lg:px-8">
      <slot />
    </div>
  </div>
</div>
<div class="h-full hidden md:block">
	<div class="border-t h-full">
		<div class="bg-background h-full">
			<div class="h-full grid lg:grid-cols-5">
				<Sidebar class="hidden lg:block overflow-auto" />
				<div class="col-span-3 lg:col-span-4 lg:border-l overflow-auto">
					<div class="px-4 py-6 lg:px-8">
            <slot />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
