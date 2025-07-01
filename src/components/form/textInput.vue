<script setup>
    import { ref } from 'vue';

    const emit = defineEmits({"update-text-input": "update-text-input"});

    const props = defineProps(["name", "label", "placeholder", "value", "required", "id"]);
    const query = ref(props.value);

    const emitUpdate = function(e) {
        emit("update-text-input", query);
    }
</script>

<template>
    <div class="relative">
        <label class="text-2xl font-bold" for="{{ name }}">{{ label }}</label>
        
        <div class="relative flex flex-row w-[250px] h-[50px] lg:w-[350px]">
            <input type="text" 
                class="relative w-full h-full pl-[5px] rounded-md outline outline-(--app-color-text) focus:outline-2"
                :name
                :placeholder
                autocomplete="off"
                :required
                :id
                
                v-model="query"
                @input="emitUpdate"
                /> 
            
        </div>
    </div>
</template>
