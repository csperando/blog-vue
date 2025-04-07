<script setup>
    import { ref } from 'vue';
    
    import searchIcon from "../icons/search.vue";

    const emit = defineEmits('update-search-input');

    const props = defineProps(["name", "label", "placeholder", "value", "required", "query", "loading"]);
    const query = ref('');

    const emitUpdate = function(e) {
        emit('update-search-input', query);
    }
</script>

<template>
    <div class="relative">
        <label class="font-bold" for="{{ name }}">{{ label }}</label>
        
        <div class="relative flex flex-row w-[250px] h-[50px] lg:w-[350px]">
            <div class="absolute top-[17px] left-[17px] h-[16px] w-[16px]">    
                <searchIcon class="relative left-0 top-0" />
            </div>
            
            <input type="text" 
                class="relative w-full h-full pl-[50px] rounded-md outline outline-(--app-color-text) focus:outline-2"
                :name
                :placeholder
                autocomplete="off"
                :required
                
                v-model="query"
                @input="emitUpdate"
                /> 
            
        </div>
    </div>
</template>
