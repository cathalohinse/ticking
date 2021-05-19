<script>
  import {setContext} from "svelte";
  import {PoiService} from "./services/poi-service";
  import Main from "./pages/Main.svelte"
  import Login from "./pages/Login.svelte"
  import Settings from "./pages/Settings.svelte";
  import Pois from "./pages/Pois.svelte";
  import Navigator from "./components/Navigator.svelte";
  import Router from "svelte-spa-router";
  import Poi from "./pages/Poi.svelte";
  import Category from "./pages/Categories.svelte";

  setContext("PoiService", new PoiService("http://laptop-s80vbeoh:4000"));

  let routes = {
    "/" : Main,
    "/login": Login,
    "/settings": Settings,
    "/pois": Pois,
    "/logout" : Main,
    "/poi": Poi,
    "/categories": Category,
  }
</script>

<div class="uk-container">
  <Navigator/>
  <Router {routes}/>
</div>
