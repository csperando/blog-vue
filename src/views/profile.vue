<script setup>
    import { inject } from 'vue';
    import { storeToRefs } from 'pinia';

    const userStore = inject('userStore');
    const { userData, userPosts } = storeToRefs(userStore);

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
        
        <div v-if="userPosts">
            <h2>Your posts: ({{ userPosts.length || 0 }})</h2>
            <ul>
                <li v-for="post in userPosts">
                    <router-link :to="{ name: 'BlogEdit', params: { id: post._id } }">
                        {{ post.title }}
                    </router-link>
                </li>
            </ul>
        </div>
        
        <br/><br/>

        <div>
            <h2>Top keywords:</h2>
            <ul>
                <li>ToDo</li>
            </ul>
        </div>

    </div>
</template>

<style scoped>
    .title {
        text-align: center;
    }
</style>
