<script lang="typescript">
  async function joinBot() {
    await fetch("/bot/join", {
      method: "POST",
    });
  }
</script>

DASHBOARD
<button on:click={joinBot}>Join Bot</button>
