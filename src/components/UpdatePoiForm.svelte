<script lang="ts">
    import {getContext, onMount} from 'svelte';
    import {user} from "../stores";
    const poiService = getContext("PoiService");
    import { push } from "svelte-spa-router";
    import Select from 'svelte-select';
    import { get } from "svelte/store";
    import 'leaflet/dist/leaflet.css';
    import {LeafletMap} from "../services/leaflet-map";

    export let poiId;
    let name = "";
    let image;
    let poiList = [];
    let categoryList = [];
    const categories = poiService.categoryList;
    let items = [];
    let currentUser = get(user);
    let files = [];
    let message = "";
    let errorMessage = "";
    let poi;
    let map;
    let lat = 0;
    let lng = 0;
    let newDetails = {
        name: "",
        location: "",
        latitude: null,
        longitude: null,
        image: null,
        category: "",
        submitter: currentUser
    };

    onMount(async () => {
        poiList = await poiService.getPois();
        categoryList = await poiService.getCategories();
        setDefaultValues();
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
        map.zoomTo({lat: 40.00000, lng: 30.00000});
    });

    //Sets all the values, including in the event of errors in updating the POI
    async function setDefaultValues() {
        let poi = await poiService.findOnePoi(poiId);
        newDetails.name = poi.name;
        newDetails.location = poi.location;
        newDetails.latitude = poi.latitude;
        newDetails.longitude = poi.longitude;
        newDetails.image = poi.image;
        newDetails.submitter = await currentUser;
        map.addMarker({lat: newDetails.latitude, lng: newDetails.longitude}, newDetails.name);
    }

    //Main function
    async function updatePoi() {
        let ifile = files[0];
        let reader = new FileReader();
        reader.onload = async function(e) {
            image = e.target.result;
            const newPoi = {
                name: newDetails.name,
                location: newDetails.location,
                latitude: newDetails.latitude,
                longitude: newDetails.longitude,
                category: selectedCategory,
                image: image,
                submitter: newDetails.submitter
            };
            const success = await poiService.updatePoi(poiId, newPoi);
        if (success) {
            push("/pois");
            message = "POI Updated";
            console.log("POI ID: ", poiId, "New Details: ", newDetails);
        } else {
            errorMessage = "Error Updating POI";
            setDefaultValues();
        }
        };
        reader.readAsDataURL(ifile);
    };


    //These two functions are for getting the Categories
    categories.forEach(category=>{
        let categorySelection = JSON.stringify(category);
        items.push(
            {value: category, label: category.county + ", " + category.province}
        );
    });

    let selectedCategory;
    function handleSelect(event) {
        console.log('Selected Category: ', event.detail, "and: ");
        selectedCategory = event.detail.value;
    };
</script>


<form on:submit|preventDefault={updatePoi} class="uk-form-stacked uk-text-left">
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: user"></span>
            <input class="uk-input uk-form-large" type="text" name="name" bind:value="{newDetails.name}">
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon" uk-icon="icon: location"></span>
            <input class="uk-input uk-form-large" type="text" name="location" bind:value="{newDetails.location}">
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-form-controls">
            <label style="color: black" class="uk-form-label" for="form-stacked-text">Latitude:</label>
            <input class="uk-input" id="form-stacked-text" type="number" step="any" name="latitude" bind:value="{newDetails.latitude}"/>
            <label style="color: black" class="uk-form-label" for="form-stacked-text">Longitude:</label>
            <input class="uk-input" id="form-stacked-text" type="number" step="any" name="longitude" bind:value="{newDetails.longitude}"/>
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-margin">
            <label style="color: black" class="uk-form-label" for="form-stacked-text">Image</label>
            <input bind:files class="uk-input" id="form-stacked-file" type="file" name="image" placeholder="Image"/>
        </div>
        <img src="{newDetails.image}" alt="Pub">
    </div>
    <div class="uk-margin">
        <label style="color: black" class="uk-form-label-left" for="form-stacked-text">Select Category</label>
        <div class="uk-form-controls">
            <Select {items}
                    bind:value={newDetails.category}
                    name="category"
                    class="uk-select"
                    type="text"
                    id="form-stacked-text"
                    on:select={handleSelect}/>
        </div>
    </div>
    <div class="uk-margin">
        <button style="background-color: #653DC2" class="submit uk-button uk-button-primary uk-button-large uk-width-1-1">Submit</button>
        <div id="poi-map" class="ui embed" style="height:600px"></div>
    </div>
    {#if errorMessage}
        {errorMessage}
    {/if}
</form>