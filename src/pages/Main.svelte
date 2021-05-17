<script>
  import {title, subTitle, navBar, welcomeBar} from "../stores"
  import henchy from "/src/assets/henchy.jpg";
  title.set("Poi Services Inc");
  subTitle.set("Sign up or Log in");

  navBar.set({
    bar: welcomeBar
  });
</script>

<div class="uk-text-center" uk-grid>
  <div class="uk-width-1-2@m">
    <img width="200" src="{henchy}" alt="pub">
    <p> Lets do this thing </p>
  </div>
  <div class="uk-width-1-2@m ">
    <div class="uk-width-2xlarge">
      <h3 class="uk-heading-small uk-flex"> Help Me Run Springfield  </h3>
      <p> Bitcoins accepted! </p>
    </div>
  </div>
</div>

