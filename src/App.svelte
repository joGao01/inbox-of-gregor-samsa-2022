<script>
  import Router from 'svelte-spa-router'
  import Inbox from './Inbox.svelte';
  import Bug from './Bug.svelte';

  const routes = {
    // Exact path
    '/': Inbox,

    // Catch-all
    // This is optional, but if present it must be the last
    '/bug': Bug,
}
</script>

<body>
  <Router {routes} />
</body>

<style>

</style>