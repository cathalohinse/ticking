<script>
  import {title, subTitle, navBar, welcomeBar, user} from "../stores";
  import henchy from "/src/assets/henchy.jpg";
  import {getContext} from "svelte";

  const poiService = getContext("PoiService");
  title.set("POI Services Inc.");
  subTitle.set("Sign up or Log in");
  navBar.set({
    bar: welcomeBar
  });
  user.set({
    email: $user.email,
    token: $user.token
  });
  poiService.logout();
</script>


<div class="uk-text-center" uk-grid>
  <div class="uk-width-1-2@m">
    <img width="200" src="{henchy}" alt="pub">
    <p>Beautiful Pubs</p>
  </div>
  <div class="uk-width-1-2@m ">
    <div class="uk-width-2xlarge">
      <h3 class="uk-heading-small uk-flex">Ticking!</h3>
      <p>Great Porter!</p>
    </div>
  </div>
</div>