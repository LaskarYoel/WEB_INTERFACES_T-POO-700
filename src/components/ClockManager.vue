<template>
    <div style="margin-top: 10px" class="">
        <h2>Status</h2>

        <b-button variant="outline-success" @click="makeToastS('success')">Start</b-button>
        <b-button style="margin-left: 18px" variant="outline-danger" @click="makeToastD('danger')">Stop</b-button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "ClockManager",
        data(){
          return {
              lastCo: "2019/09/10 12:45",
              datas : null,
              resultT : null,
              resultF : null,
          }
        },
        methods:{
            toast(etat) {
                var status
                if (etat === true) {
                    status = "You are already working"
                } else status = "You're already paused"
                var append = false
                var toaster = 'b-toaster-top-center'
                this.counter++
                this.$bvToast.toast(status, {
                    title: `WARNING`,
                    toaster: toaster,
                    variant : 'warning',
                    solid: true,
                    appendToast: append
                })
            },
            makeToastS(variant = null) {
                this.resultF = 0 ;
                this.resultT = 0 ;
                var currentDate = new Date();
                axios.get('http://localhost:4000/api/clocks/2')
                    .then(response => {
                        this.datas = response.data.data
                        for (let data in this.datas){
                            if(this.datas[data].status === false ){
                                this.resultF ++
                            } else this.resultT ++
                        }
                    }).catch(error => console.log(error))
                    .then(()=>{
                        if (this.resultT === this.resultF) {
                            axios.post(' http://localhost:4000/api/clocks',{
                                clocks:{
                                    "time": currentDate,
                                    "status": true,
                                    "user": 2
                                }
                            }).then(()=>{
                                this.$bvToast.toast(''+currentDate, {
                                    title: `Heure d'arrivée`,
                                    variant: variant,
                                    solid: true
                                })
                            })
                        }
                        else {
                            this.toast(true)
                        }
                    })


            },
            makeToastD(variant = null) {
                this.resultF = 0 ;
                this.resultT = 0 ;
                var currentDate = new Date();
                axios.get('http://localhost:4000/api/clocks/2')
                    .then(response => {
                        this.datas = response.data.data
                        for (let data in this.datas){
                            if(this.datas[data].status === false ){
                                this.resultF ++
                            } else this.resultT ++
                        }
                    }).catch(error => console.log(error))
                    .then(()=>{
                        if (this.resultT > this.resultF) {
                            axios.post(' http://localhost:4000/api/clocks',{
                                clocks:{
                                    "time": currentDate,
                                    "status": false,
                                    "user": 2
                                }
                            }).then(()=>{
                                this.$bvToast.toast(''+currentDate, {
                                    title: `Heure de départ`,
                                    variant: variant,
                                    solid: true
                                })
                            })
                        }
                        else {
                            this.toast(false)
                        }
                    })


            },

        }
    }
</script>

<style scoped>

</style>