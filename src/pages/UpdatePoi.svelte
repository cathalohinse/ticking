<script>
    import clemens from "/src/assets/clemens.jpg";
    import {navBar, mainBar, subTitle, title, user} from "../stores";
    import UpdatePoiForm from "../components/UpdatePoiForm.svelte";
    import 'leaflet/dist/leaflet.css';
    import {onMount, getContext} from 'svelte';

    const poiService = getContext("PoiService");
    let lat = 52.160858;
    let lng = -7.152420;
    export let params = {};
    let poiId = params.id;

    title.set("POI Services Inc.");
    subTitle.set("Edit POI");
    navBar.set({
        bar: mainBar
    });
    user.set({
        email: $user.email,
        token: $user.token
    });
</script>


<div class="uk-container uk-margin">
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center" uk-grid>
        <div class="uk-width-auto@m uk-position-center-left">
            <img width="300" src="{clemens}" alt="pub">
        </div>
        <div class="uk-width-auto@m">
            <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge" style="background-color: #877EB4; color: black">
                <UpdatePoiForm bind:lat={lat} bind:lng={lng} {poiId}/>
            </div>
        </div>
    </div>
</div>