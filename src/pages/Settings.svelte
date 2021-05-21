<script>
  import CategoryForm from "../components/CategoryForm.svelte";
  import UserForm from "../components/UserForm.svelte";
  import clancy from "/src/assets/clancy.jpg";
  import {navBar, mainBar, subTitle, title, user} from "../stores"
  import {writable} from "svelte/store";
  import {getContext} from "svelte";

  const poiService = getContext("PoiService");
  title.set("Poi Services Inc.");
  subTitle.set("Settings");
  navBar.set({
    bar: mainBar
  });


</script>


<div class="uk-container uk-margin">
  <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-auto@m">
      <img width="300" src="{clancy}" alt="pub">
    </div>
    <div class="uk-width-expand@m">
      <UserForm/>
    </div>
    <div class="uk-width-expand@m">
      <CategoryForm/>
    </div>
  </div>
</div>
