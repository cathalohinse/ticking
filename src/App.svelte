<script>
  import {setContext} from "svelte";
  import {PoiService} from "./services/poi-service";
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Settings from "./pages/Settings.svelte";
  import Pois from "./pages/PoiList.svelte";
  import Poi from "./pages/Poi.svelte";
  import Category from "./pages/CategoryList.svelte";
  import User from "./pages/UserList.svelte";
  import Signup from "./pages/Signup.svelte";
  import Router from "svelte-spa-router";
  import Navigator from "./components/Navigator.svelte";

  setContext("PoiService", new PoiService("http://laptop-s80vbeoh:4000"));
  //setContext("PoiService", new PoiService("http://https://ticking1.netlify.app/"));

  let routes = {
    "/" : Main,
    "/login": Login,
    "/settings": Settings,
    "/pois": Pois,
    "/logout" : Main,
    "/poi": Poi,
    "/signup": Signup,
    "/categories": Category,
    "/users": User,
  };
</script>

<div class="uk-container">
  <Navigator/>
  <Router {routes}/>
</div>