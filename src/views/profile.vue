<script setup>
    import { initUserStore } from '../stores/user.store';
    import { storeToRefs } from 'pinia';

    const userStore = initUserStore();
    const { userData } = storeToRefs(userStore);

</script>

<template>
    <div>
        <p>{{ userData.username || "error" }}</p>
    </div>
</template>
