<script>
  let login_url = "https://id.twitch.tv/oauth2/authorize?";
  login_url += "&client_id=" + process.env.TWITCH_CLIENT_ID;
  login_url += "&redirect_uri=http://localhost:3000/login";
  login_url += "&response_type=code";
  login_url += "&scope=user:read:email";

  let logged_in = document.cookie.indexOf("LOGGED_IN=1") !== -1;
</script>

<style>
  nav {
    background-color: #eee;
    box-shadow: 0 -5px 15px #aaa;
    margin-bottom: 10px;
    padding-left: 10px;
  }

  a {
    display: inline-block;
    text-decoration: none;
    color: black;
    padding: 15px 5px;
  }

  a:hover {
    background-color: #ccc;
  }

  a.active {
    font-weight: 600;
  }
</style>

<nav>
  <a href="/" class="active">Home</a>
  {#if logged_in}
    <a href="/logout">Logout</a>
  {:else}
    <a href={login_url}>Login</a>
  {/if}
</nav>
