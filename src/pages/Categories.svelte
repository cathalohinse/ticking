<script>
  import CategoryList from "../components/CategoryList.svelte";
  import UserList from "../components/UserList.svelte";
  import clancy from "/src/assets/clancy.jpg";
  import {navBar, mainBar, subTitle, title} from "../stores"

  title.set("Poi Services Inc.");
  subTitle.set("All Current Categories");
  navBar.set({
    bar: mainBar
  });
</script>

<div class="uk-container uk-margin" uk-grid>
  <div class="uk-width-auto@m">
    <img width="300" src="{clancy}" alt="pub">
  </div>
  <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center">
    <div class="uk-width-auto@m" style="background-color: #877EB4; color: black">
      <CategoryList/>

    </div>

    <div class="uk-width-auto@m" style="background-color: #877EB4; color: black">
    <UserList/>
    </div>

  </div>
</div>