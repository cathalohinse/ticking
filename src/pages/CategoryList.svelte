<script>
    import CategoryForm from "../components/CategoryForm.svelte";
    import UserForm from "../components/UserForm.svelte";
    import phair from "/src/assets/phair.jpg";
    import {navBar, mainBar, subTitle, title} from "../stores"
    import {getContext, onMount} from "svelte";
    import {push} from "svelte-spa-router";

    const poiService = getContext("PoiService");
    let categoryList;
    let errorMessage = "";
    let message = "";
    let category = "";
    let categories = "";

    onMount(async () => {
        categoryList = await poiService.getCategories()
    })

    title.set("Poi Services Inc.");
    subTitle.set("All Current Categories");
    navBar.set({
        bar: mainBar
    });

    async function deleteCategory(category) {
        let success = await poiService.deleteCategory(category)
        if (success) {
            push("/categories");
            categoryList = await poiService.getCategories()
            message = "Category Deleted";
        } else {
            errorMessage = "Error Deleting Category";
        }
    }

</script>


<div class="uk-container uk-margin" uk-grid>
    <div class="uk-width-auto@m">
        <img width="300" src="{phair}" alt="pub">
    </div>
    <div class="uk-child-width-expand uk-flex-center uk-flex-middle uk-text-center">
        <div class="uk-margin uk-width-2xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large" style="background-color: #877EB4; color: black">
            <h3 class="uk-heading-divider">
                Category List </h3>
            <div class="uk-table uk-table-divider">
                <table class="uk-table">
                    <thead>
                    <th style="color: black">
                        County
                    </th>
                    <th style="color: black">
                        Province
                    </th>
                    <th style="color: black">
                        Delete
                    </th>
                    </thead>
                    <tbody class="uk-text-left">
                    {#if categoryList}
                        {#each categoryList as category}
                            <tr>
                                <td>{category.county}</td>
                                <td>{category.province}</td>
                                <td> <a on:click={deleteCategory(category._id)} class="fas fa-trash fa-2x" style="color:#653DC2"></a></td>
                            </tr>
                        {/each}
                    {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>