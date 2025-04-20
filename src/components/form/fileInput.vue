<script setup>
    import { ref } from 'vue';

    const emit = defineEmits({ "update-file-input": "update-file-input" });

    const props = defineProps(["name", "label", "required", "id"]);
    const query = ref('');

    const emitUpdate = function(e) {
        emit("update-file-input", e);
    }
</script>

<template>
    <div class="relative">
        <label class="text-2xl font-bold" for="{{ name }}">{{ label }}</label>
        
        <div class="relative flex flex-row w-[250px] h-[50px] lg:w-[350px]">
            <input type="file" 
                class="relative w-full h-full pl-[5px] rounded-md outline outline-(--app-color-text) focus:outline-2"
                :name
                autocomplete="off"
                :required
                :id

                @change="emitUpdate"
                /> 
            
        </div>
    </div>
</template>

<style scoped>
    input {
        padding: 0;
        margin: 0;
    }

    input::file-selector-button {
        position: relative;
        height: 100%;
        background-color: var(--app-color-bg);
        padding: 0 10px;
        margin-right: 10px;
        color: black;
    }
</style>
