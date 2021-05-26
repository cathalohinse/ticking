<script>
    import {getContext, onMount} from 'svelte'
    import { PoiService } from "../services/poi-service"
    import {user} from "../stores"
    import {push} from "svelte-spa-router";

    const poiService = getContext("PoiService");
    let userList = [];
    let categoryList = [];
    let firstName = $user.firstName;
    let lastName = $user.lastName;
    let email = $user.email;
    let password = $user.password;
    let errorMessage = "";
    let message = "";
    let getUser;

    onMount(async () => {
        userList = await poiService.getUsers();
        categoryList = await poiService.getCategories();
        console.log("Current Users in db: ", userList);
        getUser = await poiService.getUser($user._id);
        console.log("Logged in User: ", await getUser.firstName);
        console.log("Logged in User: ", await getUser._id);
    });

    //Save Function
    async function save() {
        let success = await poiService.updateSettings(firstName, lastName, email, password, $user._id);
        if (success) {
            message = "Settings updated";
        } else {
            errorMessage = "Error Trying to save settings";
        }
    };

    //Delete Function
    async function deleteUser(user) {
        let success = await poiService.deleteUser(user);
        if (success) {
            push("/main");
            userList = await poiService.getUsers();
            message = "User Deleted";
        } else {
            errorMessage = "Error Deleting User";
        }
    };
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
                                                                                   type="email" name="email">
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
                <button on:click={deleteUser($user._id)} style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1">Delete</button>
            </div>
            <div class="uk-margin">
                <button style="background-color: #653DC2" class="uk-button uk-button-primary uk-button-large uk-width-1-1"><a href="/#/users" style="color: white">View all Users</a></button>
            </div>
                <div style="color: black" class="uk-text-left uk-text-small">
                </div>
            {#if errorMessage}
                <div style="color: black" class="uk-text-left uk-text-small">
                    {errorMessage}
                </div>
            {/if}
        </form>
    </div>
</div>