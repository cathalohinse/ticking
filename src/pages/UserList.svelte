<script>
    import {getContext, onMount} from 'svelte'
    import grandkhaan from "/src/assets/grandkhaan.jpg";
    import {user, navBar, mainBar, subTitle, title} from "../stores";
    import {push} from "svelte-spa-router";
    import { get } from "svelte/store";

    const poiService = getContext("PoiService");
    let userList = [];
    let categoryList = [];
    let errorMessage = "";
    let message = "";
    let currentUser = get(user);

    title.set("POI Services Inc.");
    subTitle.set("All Current Users");
    navBar.set({
        bar: mainBar
    });
    user.set({
        email: $user.email,
        token: $user.token
    });

    onMount(async () => {
        userList = await poiService.getUsers();
        categoryList = await poiService.getCategories();
        console.log("current user: ", currentUser);
        console.log("user for deletion: ", user);
    });

    //Delete User Function. This doesn't work. I couldn't even get the Error Message to work
    async function deleteUser(user) {
        let success = await poiService.deleteUser(user);
        if (success) {
            if (user == currentUser) {
                push("/main");
            } else {
                push("/users");
            }
            userList = await poiService.getUsers();
            message = "User Deleted";
        } else {
            errorMessage = "Error Deleting User";
        }
    };
</script>


<div class="uk-container uk-margin" uk-grid>
    <div class="uk-width-auto@m">
        <img width="300" src="{grandkhaan}" alt="pub">
    </div>
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center">
        <div class="uk-margin uk-width-2xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large" style="background-color: #877EB4; color: black">
            <h3 class="uk-heading-divider">User List </h3>
            <div class="uk-table uk-table-divider">
                <table class="uk-table">
                    <thead>
                    <th style="color: black">Christian Name</th>
                    <th style="color: black">Email Address</th>
                    <th style="color: black">Password</th>
                    </thead>
                    <tbody class="uk-text-left">
                    {#if userList}
                        {#each userList as user}
                            <tr>
                                <td>{user.firstName}, {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td> <a on:click={deleteUser(user._id)} class="fas fa-trash fa-2x" style="color:#653DC2"></a></td>
                                <td><i class="fas fa-recycle fa-2x" style="color:#653DC2"></i></td>
                            </tr>
                        {/each}
                    {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>