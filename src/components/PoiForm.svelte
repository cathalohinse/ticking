<script lang="ts">
    import {getContext, onMount} from 'svelte'
    import Coordinates from "./Coordinates.svelte";
    import {user} from "../stores";
    const poiService = getContext("PoiService");
    import { push } from "svelte-spa-router";
    import Select from 'svelte-select';
    import {each} from "svelte/internal";

    let name = "";
    let location = "";
    let latitude;
    let longitude;
    let image;
    let category = "";
    //let submitter = "";
    let poiList = [];
    let categoryList = [];
    let message = "";
    let errorMessage = "";
    const categories = poiService.categoryList;
    let items = [];
    let selectedCategory;

    onMount(async () => {
        poiList = await poiService.getPois();
        categoryList = await poiService.getCategories();
    });

    async function createPoi() {
        const submitter = "60a8a1e1ddca59436c3b1242";
        const success = await poiService.createPoi(name, location, latitude, longitude, image, categoryList[selectedCategory], submitter)
        if (success) {
            //push("/poi");
        } else {
            errorMessage = "POI creation not completed - some error occurred";
        }
    };

    categories.forEach(category=>{
        let categorySelection = JSON.stringify(category);
        items.push(
            {value: category.county + ", " + category.province, label: category.county + ", " + category.province}
            );
    });

    let selectedValue = {value: 'Select Category', label: 'Select Category'};
    function handleSelect(event) {
        console.log('Selected Category: ', event.detail);
    };

    async function createsPoi() {
        let success = await poiService.createPoi(name, location, latitude, longitude, category, image);
        if (success) {
            push("/poi");
            message = "POI Created";
        } else {
            errorMessage = "Error Creating POI";
        }
    };
</script>


<form on:submit|preventDefault={createPoi} class="uk-form-stacked uk-text-left">
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-1-1@m">
            <div class="uk-margin">
                <label style="color: black" class="uk-form-label" for="form-stacked-text">Enter Name of Pub</label>
                <div class="uk-form-controls">
                    <input bind:value={name} class="uk-input" id="form-stacked-text" type="text" name="name" placeholder="Name of Pub"/>
                </div>
            </div>
            <div class="uk-margin">
                <label style="color: black" class="uk-form-label" for="form-stacked-text">Enter Location of Pub</label>
                <div class="uk-form-controls">
                    <input bind:value={location} class="uk-input" id="form-stacked-text" type="text" name="location" placeholder="Location of Pub"/>
                </div>
            </div>
            <div class="uk-margin">
                <label style="color: black" class="uk-form-label" for="form-stacked-text">Enter Coordinates (Latitude & Longitude) of Location of Pub</label>
                <div class="uk-form-controls">
                    <input bind:value={latitude} class="uk-input" id="form-stacked-text" type="number" step="any" name="latitude" placeholder="Latitude"/>
                    <input bind:value={longitude} class="uk-input" id="form-stacked-text" type="number" step="any" name="longitude" placeholder="Longitude"/>
                </div>
            </div>
            <label style="color: black" class="uk-form-label" for="form-stacked-text">Select Category</label>
            <Select {items} on:select={handleSelect}></Select>
            <div class="uk-margin">
                <label style="color: black" class="uk-form-label" for="form-stacked-text">Upload an Image of the Pub</label>
                <div class="uk-form-controls">
                    <input bind:value={image} class="uk-input" id="form-stacked-text" type="file" name="image" placeholder="Image"/>
                </div>
            </div>
        </div>
    </div>
    <div class="uk-margin">
        <button style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1">Submit</button>
    </div>
    {#if errorMessage}
        <div style="color: black" class="uk-text-left uk-text-small">
            {errorMessage}
        </div>
    {/if}
</form>