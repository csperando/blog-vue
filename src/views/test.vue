<script setup>
import progressTabs from "../components/progressTabs.vue";

const progressBarData = [ "Metas", "Series", "Content" ];

const test = function(e) {
    console.log(e);
}

</script>

<template>
    <progressTabs :data="progressBarData" @update="test"></progressTabs>
</template>
