<script lang="ts">
    import tavern from "/src/assets/tavern.jpg";
    import {title, subTitle, navBar, welcomeBar, user} from "../stores";
    import SignupForm from "../components/SignupForm.svelte";

    title.set("POI Services Inc.");
    subTitle.set("Please Sign up");
    navBar.set({
        bar: welcomeBar
    });
    user.set({
        email: $user.email,
        token: $user.token
    });
</script>


<div class="uk-flex-middle uk-text-center" uk-grid>
    <div class="uk-width-1-2@m ">
        <img width="300" src="{tavern}" alt="pub">
    </div>
    <div class="uk-width-1-2@m">
        <div class="uk-card uk-card-default uk-card-body uk-box-shadow-large uk-width-2xlarge" style="background-color: #877EB4; color: black">
            <h3 class="uk-card-title uk-text-center">Fill in your details below</h3>
            <SignupForm />
        </div>
    </div>
</div>