<script lang="ts">
import { defineComponent } from "vue";
import navbar from "../components/navbar.vue";

export default defineComponent({
    setup() {

    },
    components: {
        navbar
    }
})
</script>

<template>
    <main>
        <navbar />
        <slot></slot>
    </main>
</template>
