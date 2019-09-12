<template>
    <div class="">
        <h2>Bonjour {{userConnect}}</h2>
        <h4>Derniere connexion : {{lastCo}}</h4>
    </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                userConnect: "yoel",
                lastCo: "2019/09/10 12:45",
            };
        },
    }
</script>

<style scoped>

</style>