ChartManager.vue is a component. its role is to display 3 different graphs according to a user. We first display the number of hours of the last 7 days, secondly the number of the current month and thirdly the percentage of time effected.
<template>
    <div class="col-lg-12 format">
        <h1 style="margin-bottom: 36px">Statistics </h1>
        <div class="row">
            <div class="col-lg-5">
                <h2>The last 7 days</h2>
                <apexchart v-if="pret" height="400" width="500" type="bar" :options="options" :series="series"></apexchart>

            </div>
            <div class="col-lg-5">
                <h2>This month</h2>
                <apexchart v-if="pret" width="700" type="bar" :options="optionsMonth" :series="seriesMonth"></apexchart>

            </div>

        </div>
        <div style="margin-top: 18px" class="row">
            <div class="col-lg-5 offset-3">
                <h2>Overtime of the current month</h2>
                <apexchart type=radialBar height=450 :options="chartOptionsDon" :series="seriesDon" />


            </div>
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
                idUser : 2,
                statWeek : null,
                hoursByMonth : 122,
                hoursByMonthByUser : 145,
                options: {
                    chart: {id: 'vuechart-example'},
                    xaxis: {
                        //ICI C'EST LE JOUR
                        categories: ["23/9", "24/9", "25/9", "26/9", "27/9", "28/9","29/9"]
                        //categories: []
                    }
                },
                series: [{
                    //ICI C'EST LE NOMBRE D'HEURE PAR JOUR
                    name: 'series-1',
                    data: [7,8,7,6,9,7,10,]
                    //data: []
                }],
                optionsMonth: {
                    chart: {id: 'vuechart-example'},
                    xaxis: {
                        //ICI C'EST LE JOUR
                        categories: ["1","2","3","4","5","6","7","8","9","10"
                            ,"11","12","13","14","15","16","17","18","19","20"
                            ,"21","22","23","24","25","26","27","28","29","30"]
                        //categories: []
                    }
                },
                seriesMonth: [{
                    //ICI C'EST LE NOMBRE D'HEURE PAR JOUR
                    name: 'series-1',
                    data: [7,6,9,7,10,7,6,9,7,10,7,6,9,7,10,7,6,9,7,10,7,6,9,7,10,7,6,9,7,10,]
                    //data: []
                }],
                seriesDon: [75],
                chartOptionsDon: {
                    chart: {
                        toolbar: {
                            show: true
                        }
                    },
                    plotOptions: {
                        radialBar: {
                            startAngle: -135,
                            endAngle: 225,
                            hollow: {
                                margin: 0,
                                size: '70%',
                                background: '#fff',
                                position: 'front',
                                dropShadow: {
                                    enabled: true,
                                    top: 3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.24
                                }
                            },
                            track: {
                                background: '#fff',
                                strokeWidth: '67%',
                                margin: 0, // margin is in pixels
                                dropShadow: {
                                    enabled: true,
                                    top: -3,
                                    left: 0,
                                    blur: 4,
                                    opacity: 0.35
                                }
                            },

                            dataLabels: {
                                name: {
                                    offsetY: -10,
                                    show: true,
                                    color: '#888',
                                    fontSize: '17px'
                                },
                                value: {
                                    formatter: function (val) {
                                        return parseInt(val);
                                    },
                                    color: '#111',
                                    fontSize: '36px',
                                    show: true,
                                }
                            }
                        }
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shade: 'dark',
                            type: 'horizontal',
                            shadeIntensity: 0.5,
                            gradientToColors: ['#ABE5A1'],
                            inverseColors: true,
                            opacityFrom: 1,
                            opacityTo: 1,
                            stops: [0, 100]
                        }
                    },
                    stroke: {
                        lineCap: 'round'
                    },
                    labels: ['Hours completed this month in %'],
                }
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

            this.idUser = this.$parent.idUser
            this.chartWeek()
            this.charMonth()

        },
        methods : {
            chartHoursOver(){
                //this function calculates the percentage of time performed by an employee and displays the information as a graph


                /*
                axios.get('http://localhost:4000/api/users/by_id?id='+this.sessionUserConnect.id)
                    .then(response => {
                        this.hoursByMonthByUser = response.data.timeByMonth
                    })
                */

                /*
                for (let hours in this.seriesMonth[0].data) {
                    this.hoursByMonth = this.hoursByMonth +this.seriesMonth[0].data[hours]
                }
                this.seriesDon = ((this.hoursByMonth /this.hoursByMonthByUser) - 1) * 100
                */


                this.seriesDon = 75 // Variable test
                this.pret = true
            },
            chartWeek(){
                //This function calculates the number of hours worked by an employee over the last 7 days and displays them as a graph.
                //We do the same treatment as on the ChartMonth function


                /*
                axios.get('http://localhost:4000/api/workingtimes/'+this.sessionUserConnect.id)
                    .then(response=> {
                        this.workTs = response.data.data
                        var limiteDays = []
                        for (var workT in this.workTs) {
                            var dataDate = new Date(this.workTs[workT].start)
                            dataDate = dataDate.getDate()+"/"+(dataDate.getMonth()+1)
                            if (limiteDays.indexOf(dataDate) === -1){
                                limiteDays.push(dataDate)
                            }
                            var dataDateEnd = new Date(this.workTs[workT].end)
                            dataDateEnd = dataDateEnd.getDate()+"/"+(dataDateEnd.getMonth()+1)
                            if (limiteDays.indexOf(dataDateEnd) === -1){
                                limiteDays.push(dataDateEnd)
                            }
                            console.log(limiteDays)

                        }
                        if (limiteDays.length > 7){
                            console.log("sup a 7")
                            limiteDays.splice(0,(limiteDays.length-7))
                            console.log(limiteDays)
                        }

                        //  console.log(limiteDays)
                        for (var workT in this.workTs) {
                            //console.log(workT)
                            var dayStart = new Date(this.workTs[workT].start)
                            dayStart = dayStart.getDate()+"/"+(dayStart.getMonth()+1)
                            var dayEnd = new Date(this.workTs[workT].end)
                            dayEnd = dayEnd.getDate()+"/"+(dayEnd.getMonth()+1)
                            if (limiteDays.indexOf(dayStart) !== -1 ||limiteDays.indexOf(dayEnd) !== -1 ) {
                                var dayStart = new Date(this.workTs[workT].start)
                                dayStart = dayStart.getDate()
                                var dayEnd = new Date(this.workTs[workT].end)
                                dayEnd = dayEnd.getDate()


                                if (this.workTs[workT-1] == null) {
                                    var dateStart = new Date(this.workTs[workT].start)
                                    this.options.xaxis.categories.push(dateStart.getDate()+"/"+(dateStart.getMonth()+1))

                                    var Hdeb = new Date(this.workTs[workT].start)
                                    var Hfin = new Date(this.workTs[workT].end)
                                    var inputTab = this.dateDiff(Hdeb,Hfin)
                                    this.series[0].data.push(inputTab.hour+(inputTab.min/100))


                                }
                                else {
                                    var dpd = new Date( this.workTs[workT-1].end ) ;dpd = dpd.getDate()
                                    var dd = new Date( this.workTs[workT].end ) ;dd = dd.getDate()
                                    if (dpd === dd ){
                                        // on est dans le meme jour il faut additionner les H du workingTime
                                        var Hdeb = new Date(this.workTs[workT].start)
                                        var Hfin = new Date(this.workTs[workT].end)
                                        var inputTab = this.dateDiff(Hdeb,Hfin)
                                        var taille = (this.series[0].data.length - 1)
                                        var oldData = this.series[0].data[taille]
                                        var newData = oldData + (inputTab.hour+(inputTab.min/100))
                                        this.series[0].data.splice(taille,1, newData)
                                    } else {
                                        var dds = new Date( this.workTs[workT].start ) ;dds = dds.getDate()
                                        if (dds !== dd){
                                            //jour 1
                                            var HourDayOne = null;
                                            var lastMinuteDayOne = new Date(this.workTs[workT].start);
                                            lastMinuteDayOne.setHours(23)
                                            lastMinuteDayOne.setMinutes(59)
                                            var deb = new Date(this.workTs[workT].start)
                                            HourDayOne = this.dateDiff(deb,lastMinuteDayOne)
                                            var taille = (this.series[0].data.length - 1)
                                            var oldData = this.series[0].data[taille]
                                            var newData = oldData + (HourDayOne.hour+(HourDayOne.min/100))
                                            newData= this.arrondi(newData)
                                            this.series[0].data.splice(taille,1, newData)

                                            // jour 2
                                            var HourDayTwo = null;
                                            var fin = new Date(this.workTs[workT].end)
                                            HourDayTwo = this.dateDiff(lastMinuteDayOne,fin)
                                            var newData2= HourDayTwo.hour+(HourDayTwo.min/100)
                                            newData2= this.arrondi(newData2)
                                            this.series[0].data.push(newData2)
                                            var dateEnd = new Date(this.workTs[workT].end)
                                            this.options.xaxis.categories.push(dateEnd.getDate()+"/"+(dateEnd.getMonth()+1))
                                        } else {
                                            var dateStart = new Date(this.workTs[workT].start)
                                            this.options.xaxis.categories.push(dateStart.getDate()+"/"+(dateStart.getMonth()+1))
                                            var Hdeb = new Date(this.workTs[workT].start)
                                            var Hfin = new Date(this.workTs[workT].end)
                                            var inputTab = this.dateDiff(Hdeb,Hfin)
                                            this.series[0].data.push(inputTab.hour+(inputTab.min/100))

                                        }
                                    }
                                }
                            }


                        }
                        this.pret = true
                    })
                    */
                this.pret = true
            },
            charMonth(){
                //This function calculates the number of hours worked by an employee over the current month and displays them as a graph


              /*

              // First we get all the workingTime of a user
                axios.get('http://localhost:4000/api/workingtimes/'+this.sessionUserConnect.id)
                    .then(response=> {
                        this.workTs = response.data.data
                        var limiteDays = []
                        //We keep in a table only the last 7 different dates
                        for (var workT in this.workTs) {
                            var dataDate = new Date(this.workTs[workT].start)
                            dataDate = (dataDate.getMonth()+1)
                            if (limiteDays.indexOf(dataDate) === -1){
                                limiteDays.push(dataDate)
                            }
                            var dataDateEnd = new Date(this.workTs[workT].end)
                            dataDateEnd = (dataDateEnd.getMonth()+1)
                            if (limiteDays.indexOf(dataDateEnd) === -1){
                                limiteDays.push(dataDateEnd)
                            }
                        }
                        //
                        for (var workT in this.workTs) {
                            //console.log(workT)
                            var dayStart = new Date(this.workTs[workT].start)
                            dayStart =(dayStart.getMonth()+1)
                            var monthNow = new Date()
                            monthNow = (monthNow.getMonth()+1)
                            //
                            if (dayStart === monthNow ) {
                                var dayStart = new Date(this.workTs[workT].start)
                                dayStart = dayStart.getDate()
                                var dayEnd = new Date(this.workTs[workT].end)
                                dayEnd = dayEnd.getDate()
                                //
                                if (this.workTs[workT-1] == null) {
                                //First scenario: if it is the first data, then we record it
                                    var dateStart = new Date(this.workTs[workT].start)
                                    this.optionsMonth.xaxis.categories.push(dateStart.getDate()+"/"+(dateStart.getMonth()+1))
                                    var Hdeb = new Date(this.workTs[workT].start)
                                    var Hfin = new Date(this.workTs[workT].end)
                                    var inputTab = this.dateDiff(Hdeb,Hfin)
                                    this.seriesMonth[0].data.push(inputTab.hour+(inputTab.min/100))
                                }
                                else {
                                    var dpd = new Date( this.workTs[workT-1].end ) ;dpd = dpd.getDate()
                                    var dd = new Date( this.workTs[workT].end ) ;dd = dd.getDate()
                                    if (dpd === dd ){
                                    Second scenario: if the starting date of the working time in treatment is the same as that of the previous working time, then we addiction with the previous given because it is the same day
                                        // on est dans le meme jour il faut additionner les H du workingTime
                                        var Hdeb = new Date(this.workTs[workT].start)
                                        var Hfin = new Date(this.workTs[workT].end)
                                        var inputTab = this.dateDiff(Hdeb,Hfin)
                                        var taille = (this.seriesMonth[0].data.length - 1)
                                        var oldData = this.seriesMonth[0].data[taille]
                                        var newData = oldData + (inputTab.hour+(inputTab.min/100))
                                        this.seriesMonth[0].data.splice(taille,1, newData)
                                    } else {

                                        var dds = new Date( this.workTs[workT].start ) ;dds = dds.getDate()
                                        if (dds !== dd){
                                        //Third scenario: when a working time starts one day and ends the next day, then it is divided into two parts, the first until 23:59 and the second 23:59 at the end of workingTime
                                            //jour 1
                                            var HourDayOne = null;
                                            var lastMinuteDayOne = new Date(this.workTs[workT].start);
                                            lastMinuteDayOne.setHours(23)
                                            lastMinuteDayOne.setMinutes(59)
                                            var deb = new Date(this.workTs[workT].start)
                                            HourDayOne = this.dateDiff(deb,lastMinuteDayOne)
                                            var taille = (this.seriesMonth[0].data.length - 1)
                                            var oldData = this.seriesMonth[0].data[taille]
                                            var newData = oldData + (HourDayOne.hour+(HourDayOne.min/100))
                                            newData= this.arrondi(newData)
                                            this.seriesMonth[0].data.splice(taille,1, newData)
                                            // jour 2
                                            var HourDayTwo = null;
                                            var fin = new Date(this.workTs[workT].end)
                                            HourDayTwo = this.dateDiff(lastMinuteDayOne,fin)
                                            var newData2= HourDayTwo.hour+(HourDayTwo.min/100)
                                            newData2= this.arrondi(newData2)
                                            this.seriesMonth[0].data.push(newData2)
                                            var dateEnd = new Date(this.workTs[workT].end)
                                            this.optionsMonth.xaxis.categories.push(dateEnd.getDate()+"/"+(dateEnd.getMonth()+1))
                                        } else {
                                            //Fourth scenario, the date of the beginning and end of the workingtime is the same so we record the data
                                            var dateStart = new Date(this.workTs[workT].start)
                                            this.optionsMonth.xaxis.categories.push(dateStart.getDate()+"/"+(dateStart.getMonth()+1))
                                            var Hdeb = new Date(this.workTs[workT].start)
                                            var Hfin = new Date(this.workTs[workT].end)
                                            var inputTab = this.dateDiff(Hdeb,Hfin)
                                            this.seriesMonth[0].data.push(inputTab.hour+(inputTab.min/100))
                                        }
                                    }
                                }
                            }
                        }
                        this.pret = true
                    }).then(()=>this.chartHoursOver())
           */


              this.chartHoursOver() // function test

            },
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
            },
            arrondi(x) {
                return Number.parseFloat(x).toFixed(2);
            },
            cleanArray(array) {
                var i, j, len = array.length, out = [], obj = {};
                for (i = 0; i < len; i++) {
                    obj[array[i]] = 0;
                }
                for (j in obj) {
                    out.push(j);
                }
                return out;
            }
        }
    }
</script>
<style>

</style>

