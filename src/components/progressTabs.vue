<script setup>
    import { ref } from "vue";
    import progressTabSection from "./progressTabSection.vue";

    const props = defineProps({
        "data": {
            type: Array,
            required: true,
        }
    });

    const active = ref(1);
    const setActive = function(sectionNumber) {
        active.value = sectionNumber;
        emitSectionUpdate(active.value);
    }

    const emit = defineEmits("update");
    const emitSectionUpdate = function(sectionNumber) {
        emit("update", sectionNumber);
    }

</script>

<template>
    <section>
        <div class="relative w-full bg-white dark:bg-gray-500 flex flex-row items-center h-[50px] outline outline-[2px] outline-(--app-color-text) overflow-hidden rounded-xl">
            <progressTabSection v-for="(section, index) in data" :active="active" :sectionNumber="(index + 1)" @update-active="setActive((index + 1))" :isFirst="(index == 0)">{{ section }}</progressTabSection>
        </div>
    </section>
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
