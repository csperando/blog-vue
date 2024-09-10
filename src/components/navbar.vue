<script setup>
    const loggedIn = false;
</script>

<template>
    <nav>
        <div class="float-left">
            <router-link :to="{ name: 'Home' }">Home</router-link>
        </div>

        <div class="float-left">
            <router-link :to="{ name: 'Blog' }">Blog</router-link>
        </div>

        <div class="float-left">
            <router-link :to="{ path: '/about' }">About</router-link>
        </div>

        <div v-if="loggedIn" class="float-right">
            <router-link :to="{ name: 'Profile' }">Profile</router-link>
        </div>

        <div v-if="loggedIn" class="float-right">
            <router-link :to="{ name: 'BlogWrite' }">Create</router-link>
        </div>
        
        <div v-if="!loggedIn" class="float-right">
            <router-link :to="{ path: '/' }">Login</router-link>
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
