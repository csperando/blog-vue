<script setup>

import { ref } from 'vue';
import postTile from '../components/postTile.vue';

const props = defineProps({
    "posts": Array,
    "start": {
        type: Number,
        default: 0,
    },
    "tileWidth": {
        type: String,
        default: 'w-[350px]'
    }
});

const active = ref(props.start);

function previous() {
    active.value = (active.value - 1) > -1 ? (active.value - 1) : props.posts.length-1;
}

function next() {
    active.value = (active.value + 1) % props.posts.length;
}

function setActive(index) {
    active.value = index;
}

</script>

<template>
    <div class="relative w-full rounded-md">
            <!-- Content -->
            <div class="relative flex flex-row items-center justify-center rounded-lg">
                <button type="button" class="relative flex items-center justify-center px-4 focus:outline-none">
                    <span @click="previous" class="inline-flex items-center justify-center rounded-full bg-[#00bd7e33] dark:bg-gray-800/30 hover:ring-white hover:bg-gray-500 hover:cursor-pointer 
                        w-5 h-5 lg:w-10 lg:h-10">

                        <svg class="w-2 h-2 lg:w-4 lg:h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>

                <postTile 
                    v-for="(post, index) in posts"
                    :class="{ hidden: active != index}"
                    :postId="post._id"
                    :title="post.title" 
                    :timestamp="post.created" 
                    :description="post.description" 
                    :preview="true"
                    :thumbnailMimeType="post.mime"
                    :thumbnailBase64="post.thumbnail"
                    :width="tileWidth"
                />
                
                <button type="button" class="relative flex items-center justify-center px-4 focus:outline-none">
                    <span @click="next" class="inline-flex items-center justify-center rounded-full bg-[#00bd7e33] dark:bg-gray-800/30 hover:ring-white hover:bg-gray-500 hover:cursor-pointer 
                        w-5 h-5 lg:w-10 lg:h-10">

                        <svg class="w-2 h-2 lg:w-4 lg:h-4 text-white dark:text-gray-800 rtl:rotate-180" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 6 10">
                            
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>

            <!-- Slider indicators -->
            <div class="absolute z-30 flex flex-row items-center gap-3 -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button 
                    v-for="(post, index) in posts"
                    type="button" 
                    class="border rounded rounded-full" 
                    :class="(active == index) ? 'bg-gray-500 w-4 h-4 ' : 'bg-gray-100 w-3 h-3 '"
                    :aria-current="(active == index)" 
                    :aria-label="`Slide ${index}`" 
                    data-carousel-slide-to="0"
                    @click="setActive(index)"
                ></button>
            </div>
        </div>
</template>
