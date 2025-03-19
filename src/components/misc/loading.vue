<script setup>
    const props = defineProps(["isLoading"]);
</script>

<template>
    <div>
        <span v-if="isLoading">Loading<span class="dots"></span></span>
        <span v-else>&nbsp;</span>
    </div>
</template>

<style scoped>
    @keyframes loading-dots {
        0% { content: ""; }
        33% { content: "."; }
        66% { content: ".."; }
        99% { content: "..."; }
    }

    .dots::after {
        content: "";
        animation: loading-dots 1.5s infinite steps(3);
    }
</style>
