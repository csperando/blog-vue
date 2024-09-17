<script>
</script>

<template>
    <main>
        <section id="featured" class="two-col">

            <!-- TODO make it's own component-->
            <div class="post-wrapper">
                <img src="../assets/logo.svg" width="250" height="250" alt="test"/>
                <div>
                    <p>Title</p>
                </div>
            </div>

            <div class="post-container">
                <!-- smaller blog post components -->

                <div class="post-wrapper-sm" v-for="i in [1, 2, 3, 4]">
                    <img src="../assets/logo.svg" width="50" height="50" alt="test"/>
                    <div>
                        <p>Title - {{ i }}</p>
                    </div>
                </div>
                
                <div class="post-wrapper-sm">
                    <p>More...</p>
                </div>

            </div>
        </section>

        <section id="category">
            <p>DevOps</p>

            <div class="two-col">
                <!-- TODO make it's own component-->
                <div class="post-wrapper">
                    <img src="../assets/logo.svg" width="250" height="250" alt="test"/>
                    <div>
                        <p>Title</p>
                    </div>
                </div>
                
                <div class="post-container">
                    <!-- smaller blog post components -->
                    
                    <div class="post-wrapper-sm" v-for="i in [1, 2, 3, 4]">
                        <img src="../assets/logo.svg" width="50" height="50" alt="test"/>
                        <div>
                            <p>Title - {{ i }}</p>
                        </div>
                    </div>
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

    .post-wrapper, .post-wrapper-sm {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: hsla(160, 100%, 37%, 0.2);
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
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

    .post-container > p {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    /* TODO - add media breakpoints */
    
</style>
