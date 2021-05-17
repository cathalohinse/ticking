<script>
    import hamilton from "/src/assets/hamilton.jpg";
    import {navBar, mainBar, subTitle, title} from "../stores"
    import PoiForm from "../components/CreatePoi.svelte";
    import 'leaflet/dist/leaflet.css';
    import {onMount, getContext} from 'svelte'
    import {LeafletMap} from "../services/leaflet-map";

    title.set("Poi Services Inc.");
    subTitle.set("Make a POI!");
    navBar.set({
        bar: mainBar
    });

    let lat = 52.160858;
    let lng = -7.152420;
    let map;
    onMount(async () => {
        const mapConfig = {
            location: {lat: lat, lng: lng},
            zoom: 8,
            minZoom: 7,
        };
        map = new LeafletMap("poi-map", mapConfig, 'Terrain');
        map.showZoomControl();
        map.addMarker({lat: lat, lng: lng});
    });

</script>

<div class="uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-1-2@m ">
        <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge" style="background-color: #877EB4">
            <img width="300" src="{hamilton}" alt="pub">
            <div id="poi-map" class="ui embed" style="height:600px"></div>
        </div>
    </div>
    <div class="uk-width-1-2@m ">
        <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge" style="background-color: #877EB4; color: black">
            <PoiForm bind:lat={lat} bind:lng={lng}/>
        </div>
    </div>
</div>