<script setup>
    import { storeToRefs } from 'pinia';
    import { initUserStore } from '../stores/user.store';
    import { ref } from 'vue';

    const userStore = initUserStore();
    const { loggedIn } = storeToRefs(userStore);

    const logout = () => {
        userStore.logout();
    }

    // toggle dropdown display for mobile
    const dd = ref(false);
    const toggleDropdown = () => {
        dd.value = !dd.value;
    }
</script>

<template>
    <nav>
        <div class="desktop">
            <div class="link-wrap float-left">
                <router-link :to="{ name: 'Home' }">Home</router-link>
            </div>
            
            <div class="link-wrap float-left">
                <router-link :to="{ name: 'Blog' }">Archive</router-link>
            </div>
            
            <div class="link-wrap float-left">
                <router-link :to="{ path: '/about' }">About</router-link>
            </div>
            
            <div v-if="loggedIn" class="link-wrap float-right">
                <router-link @click="logout" :to="{ name: 'Login' }">Logout</router-link>
            </div>
            
            <div v-if="loggedIn" class="link-wrap float-right">
                <router-link :to="{ name: 'Profile' }">Profile</router-link>
            </div>
            
            <div v-if="loggedIn" class="link-wrap float-right">
                <router-link :to="{ name: 'BlogWrite' }">Create</router-link>
            </div>
            
            <div v-if="!loggedIn" class="float-right">
                <router-link :to="{ name: 'Login' }">Login</router-link>
            </div>
        </div>
        
        <div class="mobile">
            <div class="menu-button" @click="toggleDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="hsla(160, 100%, 37%, 1)" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </div>

            <div class="dropdown" v-if="dd">
                <div class="link-wrap float-left" @click="toggleDropdown">
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                </div>
                
                <div class="link-wrap float-left" @click="toggleDropdown">
                    <router-link :to="{ name: 'Blog' }">Archive</router-link>
                </div>
                
                <div class="link-wrap float-left" @click="toggleDropdown">
                    <router-link :to="{ path: '/about' }">About</router-link>
                </div>
                

                <div v-if="!loggedIn" class="float-right" @click="toggleDropdown">
                    <router-link :to="{ name: 'Login' }">Login</router-link>
                </div>
                
                
                <div v-if="loggedIn" class="link-wrap float-right" @click="toggleDropdown">
                    <router-link :to="{ name: 'BlogWrite' }">Create</router-link>
                </div>
                
                <div v-if="loggedIn" class="link-wrap float-right" @click="toggleDropdown">
                    <router-link :to="{ name: 'Profile' }">Profile</router-link>
                </div>
                
                <div v-if="loggedIn" class="link-wrap float-right" @click="toggleDropdown">
                    <router-link @click="logout" :to="{ name: 'Login' }">Logout</router-link>
                </div>
            </div>
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

    .link-wrap {
        margin: 0 10px;
    }

    .mobile, .dropdown {
        display: none;
    }

    @media only screen and (max-width: 720px) {
        .mobile {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1;
        }

        .desktop {
            display: none;
        }

        .menu-button {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 50px;
            height: 50px;
        }

        .dropdown {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 60px;
            left: 0;
            background-color: white;
            gap: 20px;
            padding-bottom: 20px;
        }

        .link-wrap {
            float: none;
            width: 100%;
            text-align: center;
        }
    }

</style>
