<script>
    import {getContext, onMount} from 'svelte'
    //import { PoiService } from "../services/poi-service"
    import {push} from "svelte-spa-router"
    import {title, subTitle, user, navBar, mainBar} from "../stores"

    const poiService = getContext("PoiService");
    let userList = [];
    let categoryList = [];

    let firstName = $user.firstName;
    let lastName = $user.lastName;
    let email = $user.email;
    let password = $user.password;
    let errorMessage = "";
    let message = "";
    //let user;
    let token = $user.token;
    let id = $user._id



    async function save() {
        let success = await poiService.updateSettings(firstName, lastName, email, password, $user._id)
        if (success) {
            message = "Settings updated";
        } else {
            message = "Error Trying to save settings";
        }
    }


</script>



<div class="uk-width-expand@m">
    <div style="background-color: #877EB4" class="uk-card uk-card-default uk-width-xlarge uk-card-body uk-box-shadow-large">
        <h3 class="uk-card-title uk-text-center">Update User Settings:</h3>

        <form on:submit|preventDefault={save}>
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: user"></span> <input bind:value={firstName}
                                                                                   class="uk-input uk-form-large" type="text"
                                                                                   name="firstName">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: user"></span> <input bind:value={lastName}
                                                                                   class="uk-input uk-form-large" type="text"
                                                                                   name="lastName">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: mail"></span> <input bind:value={email} class="uk-input uk-form-large"
                                                                                   type="text" name="email">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: lock"></span> <input bind:value={password}
                                                                                   class="uk-input uk-form-large" type="password"
                                                                                   name="password">
                </div>
            </div>
            <div class="uk-margin">
                <button style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1">Update</button>
            </div>
            <div class="uk-margin">
                <button style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1">Delete</button>
            </div>
            <div class="uk-margin">
                <button style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1"><a href="/#/users" style="color: white">View all Users</a></button>
            </div>

                <div style="color: black" class="uk-text-left uk-text-small">

                </div>
            {#if message}
                <div class="uk-text-left uk-text-small">
                    {message}
                </div>
            {/if}
        </form>

    </div>
</div>

