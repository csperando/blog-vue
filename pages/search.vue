<template>
    <div>
        <form>
            <label for="input">Search for blog posts:</label>
            <input type="text" name="input" autocomplete="off"/>
            <input type="button" value="search" disabled="true"/>
        </form>
    </div>
</template>

<style scoped>
    div {
        margin: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }
</style>
