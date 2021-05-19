<script>
    import {getContext, onMount} from 'svelte'
    //import { PoiService } from "../services/poi-service"
    import {push} from "svelte-spa-router"
    import {title, subTitle, user} from "../stores.js"

    const poiService = getContext("PoiService");
    let userList = [];
    let categoryList = [];

    let firstName;
    let lastName;
    let email;
    let password;
    let errorMessage = "";
    let message = "";
    //let user;

    onMount(async () => {
        userList = await poiService.getUsers();
        categoryList = await poiService.getCategories();
    });

    async function createUser() {
        let success = await poiService.createCategory(firstName)
        if (success) {
            push("/categories");
            message = "This function is only a filler";
        } else {
            errorMessage = "Error Creating Category";
        }
    }


</script>



<div class="uk-width-expand@m">
    <div style="background-color: #877EB4" class="uk-card uk-card-default uk-width-xlarge uk-card-body uk-box-shadow-large">
        <h3 class="uk-card-title uk-text-center">Update User Settings:</h3>

        <form >
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <input class="uk-input uk-form-large" type="text" name="firstName" placeholder="{$user.firstName}">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <input class="uk-input uk-form-large" type="text" name="lastName" placeholder="{$user.lastName}">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <input class="uk-input uk-form-large" type="email" name="email" placeholder="{$user.email}">
                </div>
            </div>
            <div class="uk-margin">
                <div class="uk-inline uk-width-1-1">
                    <input class="uk-input uk-form-large" type="password" name="password" placeholder="{$user.password}">
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

        </form>

    </div>
</div>

