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
    <div>
        <label for="{{ name }}">{{ label }}</label>
        
        <div class="input-wrap">
            <input type="text" 
                class="input-text"
                :name
                :placeholder
                autocomplete="off"
                :required
                
                v-model="query"
                @input="emitUpdate"
                /> 

            <div class="icon-wrap">    
                <searchIcon class="icon"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    label {
        font-weight: bold;
    }

    .input-wrap {
        margin: 0;
        padding: 0;
        position: relative;
        height: 50px;
        width: 350px;
    }

    .input-text {
        position: relative;
        width: 100%;
        height: 100%;
        padding-left: 50px;
    }

    .icon-wrap {
        position: absolute;
        left: 16px;
        top: 17px;
        height: 16px;
        width: 16px;
    }


</style>
