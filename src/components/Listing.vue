<template>
    <div>
        <b-container style="margin-top: 26px" >
        <b-row v-if="pret">
            <b-col cols="12" md="12" >
                <vue-good-table
                        :columns="columns"
                        :rows="rows"
                        :search-options="{enabled: true}"
                        :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 5,
                            perPageDropdown: [10, 20, 30],
                            dropdownAllowAll: false,
                            setCurrentPage: 1,
                            nextLabel: 'next',
                            prevLabel: 'prev',
                            rowsPerPageLabel: 'Rows per page',
                            ofLabel: 'of',
                            pageLabel: 'page', // for 'pages' mode
                            allLabel: 'All',
                          }">

                    <template slot="table-row" slot-scope="rows">
                        <div v-if="rows.column.field === 'action'" style="text-align: center ">
                            <b-button variant="outline-info" @click="showStats(rows.row.idUser)">Stats ({{rows.row.idUser}})</b-button>
                            <b-button style="margin-left: 18px" variant="outline-success" id="show-btn" @click="showModal(rows.row.idUser)">
                                Modifier
                            </b-button>
                        </div>
                    </template>
                </vue-good-table>
            </b-col>
        </b-row>
            <b-row>
                <div v-if="ShowsStats">
                    <ChartManager :idUser="idUser" :key="compositeKey"></ChartManager>
                    <br>
                    <b-button variant="info" class="" @click="retourListe()" >Retour à la liste </b-button>
                </div>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import axios from 'axios'
    import ChartManager from "./ChartManager";

    export default {
        components:{
            ChartManager,

        },
        data(){
            return{
                pret : false ,
                affiche : false ,
                ShowsStats : false ,
                listTeam : false ,
                listUser : true ,
                compositeKey: null,
                datas : null ,
                idUser : null ,
                data : null ,
                items: [],
                itemsTeam : [],
                columns: [
                    {
                        label: 'Lastname',
                        field: 'last_name',
                    },
                    {
                        label: 'Firstname',
                        field: 'first_name',
                    },
                    {
                        label: 'Email',
                        field: 'email',
                    },
                    {
                        label: 'Role',
                        field: 'role',
                    },
                    {
                        label: '',
                        field: 'action',
                    },
                ],
                rows: [],
            }
        },
        mounted(){
            this.$root.$on('funList', () => {
                this.funList()
            })
            axios.get('http://localhost:4000/api/users')
                .then(response => {
                    console.log(response.data.data)
                    this.datas = response.data.data
                    for (let data in this.datas){
                        var rol = this.datas[data].role
                        if (rol === 1 ) {
                            rol = "Manager"
                        } else if (rol === 2) {
                            rol = " Employe"
                        } else if (rol === 3 ) {
                            rol = "Administrator"
                        }
                        this.rows.push({
                            first_name: this.datas[data].firstname,
                            last_name: this.datas[data].lastname ,
                            email: this.datas[data].email,
                            idUser: this.datas[data].id,
                            role : rol,
                        })
                    }
                }).then(()=>{
                    this.pret = true
                console.log(this.rows)
            })
        },
        methods :{
            retourListe(){
                this.pret = true
                this.ShowsStats = false
            },
            showStats(value){
                this.compositeKey++
                this.pret = false
                this.ShowsStats = true
                this.idUser = value;
            },
            funList(){
                this.affiche = true
            },
            funListTeam(){
                console.log("mdr")
                this.itemsTeam =[
                    { name : 'Epitech' ,number_of_members : '14',action :'' },
                    { name : 'Epita' ,number_of_members : '8',action :'' },
                    { name : 'Esgi' ,number_of_members : '18',action :''},
                ]


                /*
                axios.get('http://localhost:4000/api/team')
                    .then(response => {
                        console.log(response)
                        this.data = response.data.data
                        for (let data in this.data){
                            this.itemsTeam.push({
                                name: this.data[data].firstname,
                                number_of_members : '12'
                            })
                        }
                    })
                                    * */

            }
        }
    }
</script>
<style>

</style>

