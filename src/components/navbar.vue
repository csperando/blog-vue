<script setup>
    import { storeToRefs } from 'pinia';
    import { initUserStore } from '../stores/user.store';
    import { ref, computed, onMounted } from 'vue';

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

    const w = ref(window.innerWidth);
    const path = ref(regenPath());

    onMounted(() => {
        window.addEventListener("resize", function() {
            path.value = regenPath();
        });
    });

    function regenPath() {
        const width = w.value;
        const height = 100;
        const steps = 10;

        let path = "M0,0 ";
        path += " L 0," + height + " ";

        let x1=-50, y1 = height;
        let x2, y2;
        for(let x = 0; x <= width; x += width/steps) {
            let y = height + (Math.random() * height);
            x2 = x-50;
            y2 = y;

            path += "C " + x1 + "," + y1 + " " + x2 + "," + y2 + " " + x + "," + y + " ";
            x1 = x2 + 100;
            y1 = y2;
        }

        path += "L" + width + ",0 ";
        path += "L0,0 ";
        path += "Z";

        return path;
    }

</script>

<template>
    <nav class="relative pb-[100px]">
        <div class="relative w-full h-[100px] hidden lg:block">
            <div id="nav-background" class="absolute w-full h-[200px] left-0 top-0 bg-(--app-color-bg)"></div>
            <svg id="mask" class="absolute w-full h-[200px] left-0 top-0"><clipPath id="nav-clip-path"><path :d="path"/></clipPath></svg>

            <div class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-left"><span>&nbsp;</span></div>

            <div class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-left">
                <router-link :to="{ name: 'Home' }">Home</router-link>
            </div>
            
            <div class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-left">
                <router-link :to="{ name: 'Blog' }">Archive</router-link>
            </div>
            
            <div class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-right"><span>&nbsp;</span></div>

            <div v-if="loggedIn" class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-right">
                <router-link @click="logout" :to="{ name: 'Login' }">Logout</router-link>
            </div>
            
            <div v-if="loggedIn" class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-right">
                <router-link :to="{ name: 'Profile' }">Profile</router-link>
            </div>
            
            <div v-if="loggedIn" class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-right">
                <router-link :to="{ name: 'BlogWrite' }">Create</router-link>
            </div>
            
            <div v-if="!loggedIn" class="relative flex flex-row items-center h-[100px] my-10px mx-2 float-right">
                <router-link :to="{ name: 'Login' }">Login</router-link>
            </div>


            <!-- todo - lower border effect -->
            <!-- <div class="absolute w-full h-[50px] -bottom-0 left-0 overflow-hidden"></div> -->
        </div>
        
        <div class="relative lg:hidden bg-white z-1">
            <div class="absolute w-full flex flex-col items-center justify-start gap-[20px] p-4 rounded-lg
                bg-gray-100 border rounded-sm shadow-md drop-shadow-lg dark:bg-gray-700" 
                
                v-if="dd">
                
                <div class="my-10px mx-2 float-left" @click="toggleDropdown">
                    <router-link :to="{ name: 'Home' }">Home</router-link>
                </div>
                
                <div class="my-10px mx-2 float-left" @click="toggleDropdown">
                    <router-link :to="{ name: 'Blog' }">Archive</router-link>
                </div>
                
                <!--
                    <div class="my-10px mx-2 float-left" @click="toggleDropdown">
                        <router-link :to="{ path: '/about' }">About</router-link>
                    </div>
                -->

                <div v-if="!loggedIn" class="float-right" @click="toggleDropdown">
                    <router-link :to="{ name: 'Login' }">Login</router-link>
                </div>
                
                
                <div v-if="loggedIn" class="my-10px mx-2 float-right" @click="toggleDropdown">
                    <router-link :to="{ name: 'BlogWrite' }">Create</router-link>
                </div>
                
                <div v-if="loggedIn" class="my-10px mx-2 float-right" @click="toggleDropdown">
                    <router-link :to="{ name: 'Profile' }">Profile</router-link>
                </div>
                
                <div v-if="loggedIn" class="my-10px mx-2 float-right" @click="toggleDropdown">
                    <router-link @click="logout" :to="{ name: 'Login' }">Logout</router-link>
                </div>
            </div>

            <div class="absolute right-0 w-[50px]" @click="toggleDropdown">
                <svg v-if="!dd" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="fill-[#00bd7e]" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>

                <svg v-else xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="fill-[#00bd7e]" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    #nav-background {
        clip-path: url(#nav-clip-path);
    }
</style>
