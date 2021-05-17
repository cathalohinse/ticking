<script>
    import {getContext, onMount} from 'svelte'

    const poiService = getContext("PoiService");
    let userList = [];
    let categoryList = [];

    onMount(async () => {
        userList = await poiService.getUsers();
        categoryList = await poiService.getCategories();
    });



</script>

<h3 class="uk-heading-divider">
    User List </h3>
<div class="uk-table uk-table-divider">
    <table class="uk-table">
        <thead>
        <th style="color: black">
            Christian Name
        </th>
        <th style="color: black">
            Surname
        </th>
        <th style="color: black">
            Email Address
        </th>
        <th style="color: black">
            Password
        </th>
        </thead>
        <tbody class="uk-text-left">
        {#if userList}
            {#each userList as user}
                <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td><i class="fas fa-trash fa-2x" style="color:#653DC2"></i></td>
                    <td><i class="fas fa-recycle fa-2x" style="color:#653DC2"></i></td>
                </tr>
            {/each}
        {/if}
        </tbody>
    </table>

</div>

