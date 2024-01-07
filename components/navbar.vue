<script lang="ts">

</script>

<template>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/search">Search</NuxtLink>
    </nav>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
    height: 50px;
    width: 100%;
}
</style>
