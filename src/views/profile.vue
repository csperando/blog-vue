<script setup>
    import { inject } from 'vue';
    import { storeToRefs } from 'pinia';

    const userStore = inject('userStore');
    const { userData } = storeToRefs(userStore);

</script>

<template>
    <div>
        <h1 class="title">{{ userData.username }}</h1>
        
        <div>
            <h2>Info</h2>
            <p>Name: <b>{{ userData.firstName + " " + userData.lastName }}</b></p>
            <p>Email: <b>{{ userData.email }}</b></p>
        </div>

        <br/><br/>
        
        <div>
            <h2>Your posts: ({{ 0 }})</h2>

        </div>
        
        <br/><br/>

        <div>
            <h2>Top keywords:</h2>
            <ul>
                <li>test</li>
            </ul>
        </div>

    </div>
</template>

<style scoped>
    .title {
        text-align: center;
    }
</style>
