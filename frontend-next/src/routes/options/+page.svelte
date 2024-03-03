<script lang="ts">
	import Label from "@/components/ui/label/label.svelte";
  import LightSwitch from "../(components)/light-switch.svelte";
	import { cn } from "@/utils";

  export let classes: string = "";
</script>

<h1>Options</h1>

<div class="mt-4"></div>

<div class={cn("flex items-center space-x-2", classes)}>
  <LightSwitch id="switch" />
	<Label
		for="switch"
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
	>
    Toggle Dark Mode
	</Label>
</div>
