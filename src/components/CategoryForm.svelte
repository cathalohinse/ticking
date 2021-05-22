<script>
  import {onMount, getContext} from 'svelte';
  import { PoiService } from "../services/poi-service";
  import {push} from "svelte-spa-router";

  const poiService = getContext("PoiService");
  let county = "";
  let province = "";
  let errorMessage = "";
  let message = "";
  let categoryList = [];
  let category;
  let countyList = [];

  onMount(async () => {
    categoryList = await poiService.getCategories();
    console.log("Current Categories in db: ", categoryList);
  });

  async function createCategory() {
    let success = await poiService.createCategory(county, province);
    if (success) {
      push("/categories");
      message = "Category Created";
    } else {
      errorMessage = "Error Creating Category";
    }
  };
</script>


<div class="uk-width-expand@m">
  <div style="background-color: #877EB4" class="uk-card uk-card-default uk-width-xlarge uk-card-body uk-box-shadow-large">
    <h3 class="uk-card-title uk-text-center">New Category:</h3>
      <form on:submit|preventDefault={createCategory}>
      <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
          <input bind:value={county} class="uk-input uk-form-large" type="text" name="county" placeholder="Enter County">
        </div>
      </div>
      <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
          <input bind:value={province} class="uk-input uk-form-large" type="text" name="province" placeholder="Enter Province">
        </div>
      </div>
      <div class="uk-margin">
        <button style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1">Save</button>
      </div>
      <div class="uk-margin">
        <button style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1"><a href="/#/categories" style="color: white">View all Categories</a></button>
      </div>
        {#if errorMessage}
          <div style="color: black" class="uk-text-left uk-text-small">
            {errorMessage}
          </div>
        {/if}
    </form>
  </div>
</div>
