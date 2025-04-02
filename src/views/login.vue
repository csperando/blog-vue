<script setup>
    import { ref, inject } from 'vue';
    import { useRouter } from 'vue-router';

    const route = useRouter();

    const userStore = inject('userStore');

    const username = ref("");
    const password = ref("");
    const displayError = ref(false);

    const login = async (e) => {
        e.preventDefault();
        displayError.value = false;

        const success = await userStore.login(username.value, password.value);
        if(success) {
            route.push({ name: "Home" });
        } else {
            displayError.value = true;
            setTimeout(() => {
                displayError.value = false;
            }, 3000);
        }
    }

</script>

<template>

    <section>
        <p><!-- Login --></p>

        <br/>

        <form class="relative w-full flex flex-col items-center justify-center gap-[50px]" @submit.prevent="">
            <div class="flex flex-col items-center justify-center">
                <label for="username">Username:</label>
                <input type="text" name="username" id="u-input" v-model="username" class="outline"/>
            </div>
            
            <div class="flex flex-col items-center justify-center">
                <label for="password">Password:</label>
                <input type="password" name="password" id="pw-input" v-model="password" class="outline"/>
            </div>

            <div class="flex flex-col items-center justify-center">
                <input type="button" name="submit" value="submit" @click="login" class="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 border border-blue-700 rounded"/>
            </div>

            <div v-if="displayError" class="error">
                <p>Invalid credentials. Please try again.</p>
            </div>
        </form>
    </section>

</template>

<style scoped>
    .error {
        color: red;
        font-weight: bold;
    }
</style>
