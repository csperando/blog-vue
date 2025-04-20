<script setup>
    import { ref } from "vue";

    import progressTabSection from "./progressTabSection.vue";

    // TODO - props active tab
    const active = ref(1);

    const styles = {
        activeBackground: "bg-(--app-color-green)",
        nonActiveBackground: "outline outline-(--app-color-green)",
        activeText: "text-white font-bold",
        nonActiveText: "text-(--color-text) dark:text-white"
    }

    const setActive = function(sectionNumber) {
        active.value = sectionNumber;
    }

</script>

<template>
    <section>
        <div class="relative w-full bg-white dark:bg-gray-500 flex flex-row items-center h-[50px] outline outline-[2px] outline-(--app-color-text) overflow-hidden rounded-xl">
            
            <div class="relative w-full h-full flex flex-row items-center justify-start gap-2 hover:opacity-60 hover:cursor-pointer" 
                data-section="1"
                @click="setActive(1)">
                
                <div class="ml-4 relative w-[30px] h-[30px] rounded-full flex flex-row items-center justify-center" 
                    :class="(active == 1) ? styles.activeBackground : styles.nonActiveBackground">
                    
                    <p :class="(active == 1) ? styles.activeText : styles.nonActiveText">1</p>
                </div>
                <div>
                    <p class="text-(--color-text) dark:text-white">Meta Info</p>
                </div>
            </div>

            <progressTabSection>test</progressTabSection>

            <div class="relative w-full h-full flex flex-row items-center justify-start gap-2 hover:opacity-60 hover:cursor-pointer" 
                data-section="3"
                @click="setActive(3)">
                
                <div class="relative triangle-left">
                    <div class="inner-triangle"></div>
                </div>
                <div class="ml-4 relative w-[30px] h-[30px] rounded-full flex flex-row items-center justify-center" 
                    :class="(active == 3) ? styles.activeBackground : styles.nonActiveBackground">

                    <p :class="(active == 3) ? styles.activeText : styles.nonActiveText">3</p>
                </div>
                <div>
                    <p class="text-(--color-text) dark:text-white">Content</p>
                </div>
            </div>
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
