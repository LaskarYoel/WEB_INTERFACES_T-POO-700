<template>
    <div >
        <h1>My statistics</h1>
            <div>
                <h2>The last 7 days</h2>
                <apexchart v-if="pret" width="500" type="bar" :options="options" :series="series"></apexchart>
            </div>

    </div>
</template>
<script>

    import VueApexCharts from 'vue-apexcharts'
    import axios from 'axios'

    export default {
        components : {
            apexchart : VueApexCharts,
        },
        data(){
            return{
                pret : false,
                workTs : null,
                statWeek : null,
                options: {
                    chart: {id: 'vuechart-example'},
                    xaxis: {
                        //ICI C'EST LE JOUR
                        categories: []
                    }
                },
                series: [{
                    //ICI C'EST LE NOMBRE D'HEURE PAR JOUR
                    name: 'series-1',
                    data: []
                }]
            }
        },
        mounted(){
            axios.get('http://localhost:4000/api/workingtimes/2')
                .then(response=>{
                    this.workTs = response.data.data
                    console.log(this.workTs)
                    var HourDayOne = null;
                    var HourDayTwo = null;
                    for (let workT in this.workTs) {

                        var dateStart = new Date(this.workTs[workT].start)
                        var double = false ;
                        for (var option in this.options.xaxis.categories){
                            if (this.options.xaxis.categories[option] === (dateStart.getDate()+"/"+dateStart.getMonth()) ){
                                double = true
                            }
                        }
                        if (double == false){
                            this.options.xaxis.categories.push(dateStart.getDate()+"/"+dateStart.getMonth())
                        }
                        console.log(this.options)
                        dateStart =  dateStart.getDate()

                        var dateEnd = new Date(this.workTs[workT].end)
                        dateEnd =  dateEnd.getDate()

                        if (dateStart !== dateEnd ) {
                            var lastMinuteDayOne = new Date(this.workTs[workT].start);
                            lastMinuteDayOne.setHours(23)
                            lastMinuteDayOne.setMinutes(59)
                            var deb = new Date(this.workTs[workT].start)
                            var fin = new Date(this.workTs[workT].end)
                            HourDayOne = this.dateDiff(deb,lastMinuteDayOne)
                            HourDayTwo = this.dateDiff(lastMinuteDayOne,fin)
                            console.log(HourDayOne)
                            console.log(HourDayTwo)

                            this.series[0].data.push(HourDayOne.hour+(HourDayOne.min/100))
                            this.series[0].data.push(HourDayTwo.hour+(HourDayTwo.min/100))

                        }
                    }
                }).then(()=>{
                    this.pret = true
            })
        },
        methods : {
             dateDiff(date1, date2){
                var diff = {}                           // Initialisation du retour
                var tmp = date2 - date1;

                tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
                diff.sec = tmp % 60;                    // Extraction du nombre de secondes

                tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
                diff.min = tmp % 60;                    // Extraction du nombre de minutes

                tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
                diff.hour = tmp % 24;                   // Extraction du nombre d'heures

                tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
                diff.day = tmp;
                return diff;
            }
        }
    }
</script>
<style>

</style>

