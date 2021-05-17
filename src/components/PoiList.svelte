<script>
  import {getContext, onMount} from 'svelte'
  import {LeafletMap} from "../services/leaflet-map";

  const poiService = getContext("PoiService");
  let poiList = [];
  let categoryList = [];

  onMount(async () => {
    poiList = await poiService.getPois();
    categoryList = await poiService.getCategories();
  });


  let lat = "";
  let lng = "";
  let map;
  onMount(async () => {
    const mapConfig = {
      location: {lat: lat, lng: lng},
      zoom: 6,
      minZoom: 1,
    };
    map = new LeafletMap("poi-map", mapConfig, 'Terrain');
    map.showZoomControl();
    map.showLayerControl();
    //map.addMarker({lat: lat, lng: lng});
    map.zoomTo({lat: 30.00000, lng: 70.00000});
  });



</script>

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
          <td>{poi.category.county}, {poi.category.province}</td>
          <td>{poi.submitter}</td>
          <td><i class="fas fa-trash fa-2x" style="color:#653DC2"></i></td>
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

