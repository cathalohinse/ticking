<script>
    import hamilton from "/src/assets/hamilton.jpg";
    import {navBar, mainBar, subTitle, title, user} from "../stores";
    import PoiForm from "../components/PoiForm.svelte";
    import 'leaflet/dist/leaflet.css';

    title.set("POI Services Inc.");
    subTitle.set("Make a POI");
    navBar.set({
        bar: mainBar
    });
    user.set({
        email: $user.email,
        token: $user.token
    });

    let lat = 52.160858;
    let lng = -7.152420;
</script>


<div class="uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-1-2@m ">
        <img width="300" src="{hamilton}" alt="pub">
    </div>
    <div class="uk-width-1-2@m ">
        <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge" style="background-color: #877EB4; color: black">
            <PoiForm bind:lat={lat} bind:lng={lng}/>
        </div>
    </div>
</div>