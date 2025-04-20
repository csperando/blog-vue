<script setup>

import { computed } from "vue";

const props = defineProps(["sectionNumber", "active", "isFirst"]);

const isActive = computed(() => {
    return (props.sectionNumber == props.active);
});

const emit = defineEmits({ updateActive: "updateActive"});

const updateActive = function(sectionNumber) {
    emit("updateActive", sectionNumber);
}

const styles = {
    activeBackground: "bg-(--app-color-green)",
    nonActiveBackground: "outline outline-(--app-color-green)",
    activeText: "text-white font-bold",
    nonActiveText: "text-(--color-text) dark:text-white"
}

</script>

<template>
    <div class="relative w-full h-full flex flex-row items-center justify-start gap-2 hover:opacity-60 hover:cursor-pointer" 
        data-section="{{ sectionNumber }}"
        @click="updateActive(sectionNumber)">
        
        <div v-if="!isFirst" class="relative triangle-left">
            <div class="inner-triangle"></div>
        </div>

        <div class="ml-4 relative w-[30px] h-[30px] rounded-full flex flex-row items-center justify-center" 
            :class="(isActive) ? styles.activeBackground : styles.nonActiveBackground">
            
            <p :class="(isActive) ? styles.activeText : styles.nonActiveText">{{ sectionNumber }}</p>
        </div>
        
        <div>
            <p class="text-(--color-text) dark:text-white"><slot></slot></p>
        </div>
    </div>
</template>

<style scoped>
.triangle-left {
    width: 0;
    height: 0;
    border-top: 29px solid transparent;
    border-bottom: 29px solid transparent;
    border-left: 29px solid var(--app-color-text);
}

.inner-triangle {
    position: absolute;
    top: -29px;
    right: 2px;
    width: 0;
    height: 0;
    border-top: 29px solid transparent;
    border-bottom: 29px solid transparent;
    border-left: 29px solid white;
}

@media (prefers-color-scheme: dark) {
    .inner-triangle {
        border-left: 29px solid var(--color-gray-500);
    }
}
</style>
