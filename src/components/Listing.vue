Listing.vue is a component that uses an imported module: VueGoodTable, which allows you to generate tables with a better style.
Two different paintings are present:
- The list of users
- The list of teams
Each table has different functionalities

<template>
    <div>

        <b-container style="margin-top: 26px" >

            <b-row v-if="pret">
                <b-col cols="12" md="12" >
                    <div v-if="!newSearch" style="margin-left: 22px; margin-bottom: 22px">
                        <b-button pill variant="outline-primary" @click="pret=true ; pretTeam=false;funList()">Users</b-button>
                        <b-button style="margin-left: 22px" @click="pret=false ; pretTeam=true ; funListTeam()" pill variant="outline-danger">Teams</b-button>
                    </div>
                   <vue-good-table
                            :columns="columns"
                            :rows="rows"
                            :search-options="{enabled: true}"
                            :pagination-options="{
                                enabled: true,
                                mode: 'records',
                                perPage: 10,
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

                        <template  slot="table-row" slot-scope="rows">
                            <div v-if="rows.column.field === 'action'" style="text-align: center ">
                                <div v-if="sessionUserConnect.role != 2">
                                    <div v-if="sessionUserConnect.role == 1">
                                        <div v-if="rows.row.role == 'Administrator' ">
                                            <span style="color: red">Acces denied</span>
                                        </div>
                                        <div v-else>
                                            <b-button variant="outline-info" @click="showStats(rows.row.idUser)">Stats </b-button>
                                            <b-button style="margin-left: 18px" @click="dataUserUpdate=rows.row;newPassword = null" v-b-modal="'modal-UserUpdate'" variant="outline-success" id="show-btn" >
                                                Modify
                                            </b-button>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <b-button variant="outline-info" @click="showStats(rows.row.idUser)">Stats </b-button>
                                        <b-button style="margin-left: 18px" @click="dataUserUpdate=rows.row;newPassword = null" v-b-modal="'modal-UserUpdate'" variant="outline-success" id="show-btn" >
                                            Modify
                                        </b-button>
                                    </div>
                                </div>
                                <div v-else>
                                    <span style="color: red">Acces denied</span>
                                </div>
                            </div>
                            <div v-else-if="rows.column.field === 'role'" style="text-align: center ">
                                <div v-if="sessionUserConnect.role != 2">
                                    <div v-if="sessionUserConnect.role == 1">
                                        <div v-if="rows.row.role== 'Administrator'">
                                            <span>Administrator</span>
                                        </div>
                                        <div v-else>
                                            <b-button style="margin-left: 18px" @click="dataUserUpdate=rows.row" v-b-modal="'modal-UserUpdateRole'" variant="outline-warning" id="show-btn" >
                                                {{rows.row.role}}
                                            </b-button>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <b-button style="margin-left: 18px" @click="dataUserUpdate=rows.row" v-b-modal="'modal-UserUpdateRole'" variant="outline-warning" id="show-btn" >
                                            {{rows.row.role}}
                                        </b-button>
                                    </div>
                                </div>
                                <div v-else>
                                    <p>{{rows.row.role}}</p>
                                </div>
                            </div>
                        </template>
                    </vue-good-table>
                </b-col>
            </b-row>
            <b-row v-if="pretTeam">
                <b-col cols="12" md="12" >
                    <div style="margin-left: 22px; margin-bottom: 22px">
                        <b-button pill variant="outline-primary" @click="pret=true ; pretTeam=false;funList()">Users</b-button>
                        <b-button style="margin-left: 22px" @click="pret=false; pretTeam=true" pill variant="outline-danger">Teams</b-button>
                    </div>
                    <vue-good-table
                            :columns="columnsTeam"
                            :rows="rowsTeam"
                            :search-options="{enabled: true}"
                            :pagination-options="{
                                enabled: true,
                                mode: 'records',
                                perPage: 10,
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
                                <div v-if="sessionUserConnect.role != 2">
                                    <b-button variant="outline-info" v-b-modal="'modal-Team'" @click="showTeam(rows.row.idTeam)">Show</b-button>
                                    <b-button v-if="sessionUserConnect.role == 3" style="margin-left: 18px" v-b-modal="'modal-TeamDelete'" variant="outline-danger" @click="teamName=rows.row.name">
                                        Delete
                                    </b-button>
                                </div>
                                <div v-else>
                                    <span style="color: red">Acces denied</span>
                                </div>
                            </div>
                        </template>
                    </vue-good-table>
                </b-col>
            </b-row>
        </b-container>

        <div>
            <b-modal
                    size="xl"
                    id="modal-Team"
                    ref="modal"
                    title="Members of the team"
            >
                <h3>{{teamName}}</h3>
                <vue-good-table
                        :columns="columns"
                        :rows="rowsMemberTeam"
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
                        <div v-if="rows.column.field === 'action' && gestionTeam" style="text-align: center ">
                            <b-button pill variant="danger" @click="removeMember(rows.row)"> - Remove</b-button>
                        </div>
                    </template>
                </vue-good-table>

                <b-button v-if="gestionTeam" style="margin-top: 18px;margin-bottom: 18px" pill variant="danger" @click="noMember">Add other users</b-button>
                <b-button v-if="gestionTeam" style="margin-top: 18px;margin-bottom: 18px; margin-left: 10px" pill variant="danger" v-b-modal="'modal-Team-manager'">Change manager</b-button>
                <div v-if="pretNoMember">
                    <vue-good-table
                            :columns="columns"
                            :rows="rowsNoMemberTeam"
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
                                <b-button pill variant="primary" @click="addMember(rows.row)"> + Add </b-button>
                            </div>
                        </template>
                    </vue-good-table>
                </div>
                <template v-slot:modal-footer="{ ok, cancel, hide }">
                    <b-button size="xl" variant="success" @click="update">Confirm</b-button>
                </template>
            </b-modal>
        </div>

        <div>
            <b-modal
                    size="xl"
                    id="modal-Team-manager"
                    ref="modal"
                    title="Change Manager"
            >
                <v-select ref="selectManager" :options="optionsManager"></v-select>

                <template v-slot:modal-footer="{ ok, cancel, hide }">
                    <b-button size="xl" variant="success" @click="updateManager">Confirm</b-button>
                </template>
            </b-modal>
        </div>

        <div>
        <b-modal

                id="modal-TeamDelete"
                ref="modal"
                title="Deleting a team"
        >
            <h4>Are you sure you want to delete this team :</h4><h3>{{teamName}}</h3>
            <template v-slot:modal-footer="{ ok, cancel, hide }">
                <b-button size="xl" variant="success" @click="deleteTeam()">Confirm</b-button>
            </template>
        </b-modal>
             </div>

        <div>
         <b-modal id="modal-UserUpdate" ref="modal" title="Update a user">
            <b-form-group label-cols="6" label-cols-lg="6"  label="First name:" >
                <b-form-input  v-model="dataUserUpdate.first_name" required
                               placeholder="Enter the first name"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="6" label-cols-lg="6"  label="Last name:" >
                <b-form-input  v-model=" dataUserUpdate.last_name" required
                              placeholder="Enter the last name"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="6" label-cols-lg="6"  label="Email:" >
                <b-form-input  v-model="dataUserUpdate.email " type="email" required
                              placeholder="Enter the email"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="6" label-cols-lg="6"  label="Password:" >
                <b-form-input  v-model="newPassword"  required
                              placeholder="Enter the password"></b-form-input>
            </b-form-group>
            <template v-slot:modal-footer="{ ok, cancel, hide }">
                <b-button size="xl" variant="success" @click="$bvModal.hide('modal-UserUpdate');updateUser(dataUserUpdate.idUser)">Confirm</b-button>
            </template>
        </b-modal>
        </div>

        <div >
         <b-modal id="modal-UserUpdateRole" ref="modal" title="Update a role">
             <b-form-group label-cols="6" label-cols-lg="6"  label="Role:" >
                 <b-form-select v-model="dataUserUpdate.role" :options="optionsRole"></b-form-select>
             </b-form-group>

            <template v-slot:modal-footer="{ ok, cancel, hide }">
                <b-button size="xl" variant="success" @click="$bvModal.hide('modal-UserUpdate');updateUserRole(dataUserUpdate)">Confirm</b-button>
            </template>
        </b-modal>
        </div>

        <div v-if="ShowsStats">
            <b-button style="margin-left: 50%" variant="warning" class="" @click="retourListe()" >Return to the list </b-button>
            <ChartManager :idUser="idUser" :key="compositeKey"></ChartManager>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import ChartManager from "./ChartManager";
    import 'vue-select/dist/vue-select.css';

    export default {
        components:{
            ChartManager,

        },
        data(){
            return{
                addUser : false ,
                pret : false ,
                pretTeam : false ,
                pretNoMember : false ,
                affiche : false ,
                ShowsStats : false ,
                listTeam : false ,
                listUser : true ,
                compositeKey: null,
                datas : null ,
                idUser : null ,
                data : null ,
                teamName : null ,
                teamIdManager: null,
                teamSelect : null ,
                newPassword : "" ,
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
                        label: 'Edit',
                        field: 'action',
                    },
                ],
                columnsTeam: [
                    {
                        label: 'Name',
                        field: 'name',
                    },
                    {
                        label: 'Edit',
                        field: 'action',
                    },
                ],
                rows: [],
                rowsTeam: [],
                rowsMemberTeam: [],
                rowsNoMemberTeam: [],
                dataUpdate : [],
                dataUserUpdate : {},
                newSearch : null,
                sessionUserConnect : null
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

            this.funList()

            this.$root.$on('funList', () => {
                this.funList()
            })

            this.newSearch = sessionStorage.getItem('search')
            if (this.newSearch !== null) {
                this.rows = []
                this.datas = []
                this.funSearch()
            }


        },
        computed: {
            optionsRole(){
                if (this.sessionUserConnect.role == 3){
                    return [
                        { value: 1, text: 'Manager', disabled: false },
                        { value: 2, text: 'Employe', disabled: false },
                        { value: 3, text: 'Administrator', disabled: false }
                    ]
                } else{
                    return [
                        { value: 1, text: 'Manager', disabled: false },
                        { value: 2, text: 'Employe', disabled: false }
                    ]
                }
            },
            optionsManager(){
                let list = [];
                for(let member of this.rowsMemberTeam){
                    if (member.role !== "Employe")
                        list.push({label: member.first_name + " " + member.last_name, value: member.idUser});
                }

                return list;
            },
            gestionTeam(){
                return this.sessionUserConnect.id == this.teamIdManager || this.sessionUserConnect.role === "3"
            }
        },
        methods :{
            funSearch(){
                axios.get('http://localhost:4000/api/users/search_user?nameSearch='+this.newSearch)
                    .then(response => {
                        console.log(response.data.data)
                        this.datas = []
                        this.rows = []
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

                    this.pret = true;
                    sessionStorage.removeItem('search');
                })
            },
            updateUser(value){
                let users = {}
                if (this.newPassword !== null){
                    users.password = this.newPassword
                }
                if (this.dataUserUpdate.first_name !== ""){
                    users.firstname = this.dataUserUpdate.first_name
                }
                if (this.dataUserUpdate.last_name !== ""){
                    users.lastname = this.dataUserUpdate.last_name
                }
                if (this.dataUserUpdate.email !== ""){
                    users.email = this.dataUserUpdate.email
                }
                axios.put('http://localhost:4000/api/users/update/',
                    {
                        users,
                        id: value
                    }
                ).then(()=>{
                    this.funList()
                })
            },
            updateUserRole(value){
                axios.put('http://localhost:4000/api/users/update/',
                    {
                        users: {
                            "email": value.email,
                            "roles_id": value.role
                        },
                        id: value.idUser
                    }
                ).then(()=>{
                    this.funList()
                })

            },
            deleteTeam(value){
                //la route api delete team n'existe pas encore
            },
            removeMember(value){
                this.rowsNoMemberTeam.push(value)

                for (let pos in this.rowsMemberTeam ) {
                    if (this.rowsMemberTeam[pos].email === value.email) {
                        this.rowsMemberTeam.splice(pos, 1);
                    }
                }
            },
            addMember(value){
                this.rowsMemberTeam.push(value)
                
                for (let pos in this.rowsNoMemberTeam ) {
                    if (this.rowsNoMemberTeam[pos].email === value.email) {
                        this.rowsNoMemberTeam.splice(pos, 1);
                    }
                }
            },
            noMember(){
                this.rowsNoMemberTeam = []
                axios.get('http://localhost:4000/api/users')
                    .then(response => {
                        this.datas = response.data.data;
                        for (let data in this.datas){
                            var add = true
                           for (let us in this.rowsMemberTeam){
                               console.log("this.datas[data].id"+this.datas[data].id);
                               if (this.rowsMemberTeam[us].idUser === this.datas[data].id){
                                   add = false
                               }
                           }
                           if (add){
                               var rol = this.datas[data].role
                               if (rol === 1 ) {
                                   rol = "Manager"
                               } else if (rol === 2) {
                                   rol = " Employe"
                               } else if (rol === 3 ) {
                                   rol = "Administrator"
                               }
                               this.rowsNoMemberTeam.push({
                                   first_name: this.datas[data].firstname,
                                   last_name: this.datas[data].lastname ,
                                   email: this.datas[data].email,
                                   idUser: this.datas[data].id,
                                   role : rol,
                               })
                           }
                        }
                    }).then(()=>{

                    this.pretNoMember = true

                })
            },
            showTeam(value){
                this.teamSelect = value
                this.rowsMemberTeam = []
                axios.get('http://localhost:4000/api/teams/'+value)
                    .then(response=> {
                        this.teamName = response.data.data.name;
                        this.teamIdManager = response.data.data.manager;
                        this.datas = response.data.data.users;
                        for (let data of this.datas) {
                            let rol = data.role;
                            if (rol === 1 )
                                rol = "Manager";
                            else if (rol === 2)
                                rol = "Employe";
                            else if (rol === 3 )
                                rol = "Administrator";

                            this.rowsMemberTeam.push({
                                first_name: data.firstname,
                                last_name: data.lastname,
                                email: data.email,
                                idUser: data.id,
                                role: rol,
                            })
                        }
                        })
            },
            update(){
                this.dataUpdate = []
                for (let us in this.rowsMemberTeam){
                    this.dataUpdate.push(this.rowsMemberTeam[us].idUser)
                }
                this.dataUpdate = this.cleanArray(this.dataUpdate);
                axios.put('http://localhost:4000/api/teams/change_user',
                        {
                            "id": this.teamSelect,
                            "users": this.dataUpdate
                        }).then(()=>{
	                        this.makeToast('success','Changing success','Member sucessfully change')
                })
            },
	        makeToast(variant,title,msg) {
		        this.$bvToast.toast(msg, {
			        title: `${title}`,
			        variant: variant,
			        solid: true
		        })
	        },
            updateManager(){
                axios.put('http://localhost:4000/api/teams/change_manager',
                    {
                        "id": this.teamSelect,
                        "managerID": this.$refs.selectManager.selectedValue[0].value
                    }).then(()=>{
                        this.makeToast('success','Changing success','Manager change')
                    })
            },
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
                this.rows = []
                this.datas = []
                    axios.get('http://localhost:4000/api/users')
                        .then(response => {
                            this.datas = response.data.data;
                            for (let data in this.datas){
                                var rol = this.datas[data].role;
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
                        this.pret = true;
                    }).then(()=> this.rows = this.cleanArray(this.rows))

            },
            funListTeam(){
                this.rowsTeam = [];
                axios.get('http://localhost:4000/api/teams')
                    .then(response => {
                        this.data = response.data.data
                        for (let data in this.data){
                            this.rowsTeam.push({
                                name: this.data[data].name,
                                idTeam : this.data[data].id
                            })
                        }
                    })


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
        },
        watch: {
            foo(newItems) {
                this.$parent.items[1].text = newItems
            }
        },
    }
</script>
<style>

</style>

