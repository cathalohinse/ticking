<script>
  import PoiList from "../components/PoiList.svelte";
  import dan from "/src/assets/dan.png";
  import {navBar, mainBar, subTitle, title} from "../stores"

  title.set("Poi Services Inc.");
  subTitle.set("Latest Pois");
  navBar.set({
    bar: mainBar
  });
</script>



<div class="uk-container uk-margin">
  <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-expand@m" style="background-color: #877EB4">
      <PoiList/>
    </div>
    <div class="uk-width-auto@m">
      <img width="300" src="{dan}">
    </div>
  </div>
</div>