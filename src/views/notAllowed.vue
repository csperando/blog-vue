<template>
    <section>
        <h1>Uh Oh!</h1>
        <p>Something went wrong! You might not have access to this page.</p>
        <p>Have you tried to <router-link :to="{ name: 'Login' }">login</router-link>?</p>
    </section>
</template>
