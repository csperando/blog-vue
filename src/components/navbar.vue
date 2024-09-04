<template>
    <nav>
        <div class="float-left">
            <router-link :to="{ name: 'Home' }">Home</router-link>
        </div>

        <div class="float-left">
            <router-link :to="{ name: 'Blog' }">Blog</router-link>
        </div>

        <div class="float-left">
            <router-link :to="{ name: 'About' }">About</router-link>
        </div>

        <div class="float-right">
            <router-link :to="{ name: 'Profile' }">Profile</router-link>
        </div>

        <div class="float-right">
            <router-link :to="{ name: 'BlogWrite' }">Create</router-link>
        </div>
    </nav>
</template>

<style scoped>
    .float-left {
        float: left;
    }

    .float-right {
        float: right;
    }

    nav > div {
        margin: 0 10px;
    }
</style>
