<script lang="ts">
    import {getContext, onMount} from 'svelte'
    import {user} from "../stores";
    const poiService = getContext("PoiService");
    import { push } from "svelte-spa-router";
    import Select from 'svelte-select';
    import { get } from "svelte/store";
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
    let currentUser = get(user);
    let files = [];
    //let selectedCategory;

    onMount(async () => {
        poiList = await poiService.getPois();
        categoryList = await poiService.getCategories();
    });

    async function createPoi() {
        let ifile = files[0];
        let reader = new FileReader();
        const submitter = currentUser;
        reader.onload = async function(e) {
            image = e.target.result;
            const success = await poiService.createPoi(name, location, latitude, longitude, selectedCategory, image, submitter)
            if (success) {
                push("/pois");
            } else {
                errorMessage = "POI creation not completed - some error occurred";
            }
        };
        reader.readAsDataURL(ifile);
    };

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
            <Select {items}
                    bind:value={category}
                    class="uk-select"
                    type="text"
                    id="form-stacked-text"
                    name="category"
                    on:select={handleSelect}/>
            <div class="uk-margin">
                <label style="color: black" class="uk-form-label" for="form-stacked-text">Upload an Image of the Pub</label>
                <div class="uk-form-controls">
                    <input bind:files class="uk-input" id="form-stacked-file" type="file" name="image" placeholder="Image"/>
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