<script lang="ts">
    import { onMount, getContext } from "svelte";
    import Coordinates from "./Coordinates.svelte";
    const poiService = getContext("PoiService");

    export let lat = 0.0;
    export let lng = 0.0;
    let categoryList = [];
    let amount = 0;
    let selectedMethod = 0;
    let selectedCategory = 0;
    let methods = ["Paypal", "Cash"]
    let errorMessage = "";

    onMount(async () => {
        categoryList = await poiService.getCatgories()
    });

    async function poi() {
        const success = await poiService.poi(amount, methods[selectedMethod], categoryList[selectedCategory])
        if (success) {

        } else {
            errorMessage = "Poi creation not completed - some error occurred";
        }
    }

</script>

<form on:submit|preventDefault={poi} class="uk-form-stacked uk-text-left">
    <div class="uk-grid uk-grid-stack">
        <div class="uk-width-1-2@m">
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Enter amount</label>
                <div class="uk-form-controls">
                    <input bind:value={amount} class="uk-input" id="form-stacked-text" type="number" name="amount" placeholder="Euros">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-form-label">Payment </div>
                <div class="uk-form-controls">
                    <label><input bind:group={selectedMethod} value={0} class="uk-radio" type="radio" name="method"> {methods[0]} </label><br>
                    <label><input bind:group={selectedMethod} value={1} class="uk-radio" type="radio" name="method"> {methods[1]} </label>
                </div>
            </div>
        </div>
        <div class=" uk-width-1-2@m">
            <div class="uk-margin uk-text-left">
                <div class="uk-form-label">Select Category </div>
                <div class="uk-form-controls ">
                    {#each categoryList as category, i}
                        <label>
                            <input bind:group={selectedCategory} value={i} class="uk-radio" type="radio" name="category" />
                            {category.county}, {category.province}
                        </label>
                        <br>
                    {/each}
                </div>
            </div>
            <div class="uk-margin">
                <button class="submit uk-button uk-button-primary uk-button-large uk-width-1-1" style="background-color: #653DC2">Submit</button>
            </div>
            {#if errorMessage}
                <div class="uk-text-left uk-text-small">
                    {errorMessage}
                </div>
            {/if}
        </div>
    </div>
    <Coordinates bind:lat={lat} bind:lng={lng}/>
</form>