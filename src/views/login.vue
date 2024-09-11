<script setup>
    import { ref } from 'vue';
    import { initUserStore } from '../stores/user.store';
    import { useRouter } from 'vue-router';

    const userStore = initUserStore();
    const username = ref("");
    const password = ref("");

    const route = useRouter();

    const login = async (e) => {
        e.preventDefault();

        const success = await userStore.login(username.value, password.value);
        if(success) {
            route.push({ name: "Home" });
        }
    }

</script>

<template>

    <section>
        <p><!-- Login --></p>

        <br/>

        <form @submit.prevent="">
            <div>
                <label for="username">Username:</label>
                <input type="text" name="username" id="u-input" v-model="username"/>
            </div>
            
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" id="pw-input" v-model="password"/>
            </div>

            <div>
                <input type="button" name="submit" value="submit" @click="login"/>
            </div>
        </form>
    </section>

</template>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        margin-bottom: 30px;
    }
</style>
