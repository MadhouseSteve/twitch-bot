<script>
  import Navigation from "./components/Navigation.svelte";
  import Homepage from "./pages/Homepage.svelte";
  import Dashboard from "../../test/client/mocks/Dashboard.svelte";
</script>

<Navigation />

{#if window.location.pathname === '/'}
  <Homepage />
{:else if window.location.pathname === '/dashboard'}
  <Dashboard />
{/if}
