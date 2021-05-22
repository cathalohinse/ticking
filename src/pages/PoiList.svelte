<script>
  import dan from "/src/assets/dan.png";
  import {navBar, mainBar, subTitle, title, user} from "../stores";
  import {getContext, onMount} from 'svelte';
  import {LeafletMap} from "../services/leaflet-map";
  import {push} from "svelte-spa-router";

  const poiService = getContext("PoiService");
  let poiList = [];
  let categoryList = [];
  let getCounty;
  let lat = 0;
  let lng = 0;
  let category;
  let message = "";
  let errorMessage = "";
  let map;

  title.set("Poi Services Inc.");
  subTitle.set("Latest Pois");
  navBar.set({
    bar: mainBar
  });

  onMount(async () => {
    poiList = await poiService.getPois();
    categoryList = await poiService.getCategories();
    console.log(categoryList);
    getCounty = await poiService.getCategory($user._id);
    console.log(await getCounty.county);
    console.log(await getCategoryProvince($user._id));
    const users = localStorage.getItem($user._id);
    console.log($user);
    console.log(localStorage.getItem($user));
  });

  onMount(async () => {
    const mapConfig = {
      location: {lat: lat, lng: lng},
      zoom: 6,
      minZoom: 1,
    };
    map = new LeafletMap("poi-map", mapConfig, 'Terrain');
    map.showZoomControl();
    map.showLayerControl();
    /*poiList.forEach(poi=>{
      {map.addMarker({lat: poi.latitude, lng: poi.longitude}, poi.name)}
    });*/
    //map.addMarker({lat: lat, lng: lng});
    map.zoomTo({lat: 30.00000, lng: 70.00000});
  });

  //One of many test functions written while trying to figure out how to get anything at all to work
  async function getCategoryProvince(category) {
    let getCategory = await poiService.getCategory(category);
    let getProvince = await getCategory.province;
    console.log(getProvince);
    return getProvince;
  }

  async function getCategory(category) {
    const response = await poiService.getCategory(category);
    return response;
  }

  async function deletePoi(poi) {
    let marker = [
      {
        latitude: poi.latitude,
        longitude: poi.longitude
      }
    ];
    let success = await poiService.deletePoi(poi);
    console.log("Marker: " + marker);
    console.log("Category: " + getCategory(poi.category));
    if (success) {
      push("/pois");
      poiList = await poiService.getPois();
      message = "POI Deleted";
      console.log("The following POI has been deleted: " + poi);
      console.log(poiList);
    } else {
      errorMessage = "Error Deleting POI";
    }
  };

</script>


<div class="uk-container uk-margin">
  <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-expand@m" style="background-color: #877EB4">
      <h3 class="uk-heading-divider">
        Poi List </h3>
      <div class="uk-table uk-table-divider">
        <table class="uk-table">
          <thead>
          <th style="color: black">
            Name
          </th>
          <th style="color: black">
            Location
          </th>
          <th style="color: black">
            Coordinates
          </th>
          <th style="color: black">
            Image
          </th>
          <th style="color: black">
            Category
          </th>
          <th style="color: black">
            Submitter
          </th>
          <th style="color: black">
            Delete
          </th>
          <th style="color: black">
            Update
          </th>
          </thead>
          <tbody class="uk-text-left">
          {#if poiList}
            {#each poiList as poi}
              <tr>
                <td>{poi.name}</td>
                <td>{poi.location}</td>
                <td>{poi.latitude}, {poi.longitude}</td>
                <td><img src="{poi.image}" alt="Pub" width="200" height="200"></td>
                <td>{#await getCategoryProvince(poi.category)}{/await} {poi.category}</td>
                <td>{poi.submitter}</td>
                <td> <a on:click={deletePoi(poi._id)} class="fas fa-trash fa-2x" style="color:#653DC2"></a></td>
                <td><i class="fas fa-recycle fa-2x" style="color:#653DC2"></i></td>
              </tr>
            {/each}
          {/if}
          </tbody>
        </table>
        <div id="poi-map" class="ui embed" style="height:600px"></div>
        {#if poiList}
          {#each poiList as poi}
            {map.addMarker({lat: poi.latitude, lng: poi.longitude}, poi.name)}
          {/each}
        {/if}
      </div>
    </div>
    <div class="uk-width-auto@m">
      <img width="300" src="{dan}">
    </div>
  </div>
</div>