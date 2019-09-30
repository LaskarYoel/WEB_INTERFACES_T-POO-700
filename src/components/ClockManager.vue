ClockManager.vue is a component. Its role is to allow a user to announce his time of arrival and departure.
Before each request post in the database we check that the user is not already working or paused so that the recorded data is not false

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
                workingtimeStart : null,
                workingtimeEnd : null,
            }
        },
        mounted(){
            this.sessionUserConnect = {id :null, email :null, firstname :null, lastname :null, role :null};

            this.sessionUserConnect.id = sessionStorage.getItem('id')
            this.sessionUserConnect.email = sessionStorage.getItem('email')
            this.sessionUserConnect.firstname = sessionStorage.getItem('firstname')
            this.sessionUserConnect.lastname = sessionStorage.getItem('lastname')
            this.sessionUserConnect.role = sessionStorage.getItem('role')

            if (this.sessionUserConnect.id == null){
                this.$router.push('/')
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
            converToString(date){
                const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth(),
                    day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
                    heure = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
                    min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
                    sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

                return date.getFullYear() + "-" + month + "-" + day + " " + heure + ":" + min + ":" + sec
            },
            makeToastS(variant = null) {
                this.resultF = 0 ;
                this.resultT = 0 ;
                var dateZone = new Date();
                var decalage = dateZone.getTimezoneOffset() / 60;
                var currentDate = dateZone
                currentDate.setHours(currentDate.getHours()-decalage);
                currentDate = this.converToString(currentDate);
                axios.get('http://localhost:4000/api/clocks/'+this.sessionUserConnect.id)
                    .then(response => {
                        this.datas = response.data.data;
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
                                    "user": this.sessionUserConnect.id
                                }
                            }).then(()=>{
                                var currentDate = this.converToString(new Date())
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
                //once you have checked that a user is working well, we record his departure time and then create a workingtime in the database to make a couple between the arrival time and the time of arrival. departure time
                this.resultF = 0 ;
                this.resultT = 0 ;
                var dateZone = new Date();
                var decalage = dateZone.getTimezoneOffset() / 60;
                var currentDate = dateZone
                currentDate.setHours(currentDate.getHours()-decalage);
                currentDate = this.converToString(currentDate);
                axios.get('http://localhost:4000/api/clocks/'+this.sessionUserConnect.id)
                    .then(response => {
                        this.datas = response.data.data;
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
                                    //"time": "2019-09-22T22:03:43.885Z",
                                    "status": false,
                                    "user": this.sessionUserConnect.id
                                }

                            }).then(()=>{
                                var currentDate = this.converToString(new Date())
                                this.$bvToast.toast(''+currentDate, {
                                    title: `Heure de départ`,
                                    variant: variant,
                                    solid: true
                                })
                            }).then(()=>{
                               this.datas.sort(this.compare)
                                console.log(this.datas)
                            }).then(()=>{
                               axios.post('http://localhost:4000/api/workingtimes/',{
                                    workingtimes:{
                                        "start": this.datas[this.datas.length-1].time,
                                        //"end": "2019-09-22T22:03:43.885Z",//BAD
                                        "end": currentDate,
                                        "user": this.sessionUserConnect.id
                                    }
                                })
                            })
                        } else {
                            this.toast(false)
                        }
                    })


            },
            compare(a, b) {
                const idA = a.id;
                const idB = b.id;

                let comparison = 0;
                if (idA > idB) {
                    comparison = 1;
                } else if (idA < idB) {
                    comparison = -1;
                }

                return comparison;

            }
        }
    }
</script>

<style scoped>

</style>