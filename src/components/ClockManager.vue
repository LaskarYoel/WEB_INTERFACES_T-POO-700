<template>
    <div style="margin-top: 10px" class="">
        <h2>Mes actions</h2>
        <b-button variant="outline-success" @click="makeToast('success')">Je commence</b-button>
        <b-button style="margin-left: 18px" variant="outline-danger" @click="makeToast('danger')">je m'arrete</b-button>
    </div>
</template>

<script>
    export default {
        name: "ClockManager",
        data(){
          return {
              lastCo: "2019/09/10 12:45",
          }
        },
        methods:{
            makeToast(variant = null) {
                var currentDate = new Date();
                if (variant === 'success'){
                    this.$bvToast.toast(''+currentDate, {
                        title: `Heure d'arrivée`,
                        variant: variant,
                        solid: true
                    })
                }
                if (variant === 'danger'){
                    this.$bvToast.toast(''+currentDate, {
                        title: `Heure de départ`,
                        variant: variant,
                        solid: true
                    })
                }

            }
        }
    }
</script>

<style scoped>

</style>