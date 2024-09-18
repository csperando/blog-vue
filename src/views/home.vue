
<script setup>
    import postTile from '../components/postTile.vue';
    import postTileSmall from '../components/postTileSmall.vue';

</script>

<template>
    <main>
        <section id="featured" class="two-col">

            <postTile title="test title" timestamp="12 Sept 2024" description="An example blog post" thumbnail="logo.svg"/>

            <div class="post-container">
                <!-- smaller blog post components -->

                <!--
                    <div class="post-wrapper-sm" v-for="i in [1, 2, 3, 4]">
                        <img src="../assets/logo.svg" width="50" height="50" alt="test"/>
                        <div>
                            <p>Title - {{ i }}</p>
                        </div>
                    </div>
                -->
                
                <postTileSmall v-for="i in [1, 2, 3, 4]" 
                    :title="'Another Test - ' + i" 
                    timestamp="12 Sept 2024" 
                    description="An example blog post" 
                    thumbnail="logo.svg"
                    class="post-wrapper-sm"
                    />
                
                <div class="post-wrapper-sm">
                    <p>More...</p>
                </div>

            </div>
        </section>

        <section id="category">
            <p>DevOps</p>

            <div class="two-col">
                
                <postTile title="I love DevOps!" timestamp="14 Sept 2024" description="A love story" thumbnail="logo.svg"/>
                
                <div class="post-container">
                    <postTileSmall v-for="i in [1, 2, 3, 4]" 
                        :title="'DevOps Test - ' + i" 
                        timestamp="12 Sept 2024" 
                        description="An example blog post" 
                        thumbnail="logo.svg"
                        class="post-wrapper-sm"
                        />
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
    * {
        position: relative;
    }

    .two-col {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-start;
        margin-bottom: 50px;
    }

    .post-wrapper-sm {
        flex-basis: 33%;
    }

    .post-container {
        flex-basis: 50%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
    }

    /* TODO - add media breakpoints */
    
</style>
