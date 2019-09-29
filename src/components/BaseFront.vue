BaseFront.vue component is the centerpiece of the application and includes the redirection to the different components as well as the ClockManager component which allows a user to announce his arrival and departure time.
<template>
    <div class="">
        <div style="margin-top: 18px">
            <b-navbar  toggleable="lg"  type="light"  style="background-color: #316eb6">
                <b-navbar-brand href="/">GC</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <b-collapse  id="nav-collapse" is-nav>
                    <b-navbar-nav >
                        <b-nav-item-dropdown text="Access management" right>
                            <b-dropdown-item   @click.prevent="funList();funRedirect('listing')">
                                <router-link     to="/listing">Listing</router-link>
                            </b-dropdown-item>
                            <b-dropdown-item v-if="sessionUserConnect.role != 2" to="/user" @click.prevent="funRedirect('user')" >
                                <router-link     to="/user">Creating</router-link>
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item >
                            <router-link  to="/stats">Statistics</router-link>
                        </b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-brand style="font-size: 16px; margin-left: auto">Welcome back Mr/Mme {{sessionUserConnect.lastname}} {{sessionUserConnect.firstname}} </b-navbar-brand>


                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-form>
                            <b-form-input size="sm" class="mr-sm-2" v-model="newSearch" placeholder="Search"></b-form-input>
                            <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="funRecherche">Search</b-button>
                        </b-nav-form>

                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template v-slot:button-content><em>User</em></template>
                            <b-dropdown-item  @click.prevent="funRedirect('user');funModif()" >
                                <router-link to="/user">Profile</router-link>
                            </b-dropdown-item>
                            <b-dropdown-item @click="deconnexion">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        <b-row align-h="around">
        </b-row>

        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="6" md="9" ><User ref="form" v-if="cacher"/></b-col>
                <b-col cols="6" md="3"><ClockManager /></b-col>
            </b-row>
            <b-row>
                <b-col cols="6" md="9" ><Listing ref="form" v-if="cacher"/></b-col>
            </b-row>
            <b-row>

            </b-row>
        </b-container>

    </div>
</template>

<script>

    import User from './User.vue'
    import ClockManager from "./ClockManager";
    import Listing from "./Listing";


    export default {
        name: 'BaseFront',
        components: {
            Listing,
            ClockManager,
            //HelloWorld,
            User,
        },
        data() {
            return {
                newSearch : null ,
                cacher : false ,
                cache : true ,
                clickCreer: false,
                clickCreerTeam: false,
                clickRecherche: false,
                clickModif: false,
                userConnectFirst: "Yoel",
                userConnectLast: "Laskar",
                userConnectEmail: "yoel.laskar@epitech.eu",
                userConnectPassword: "",
                info : "",
                newFirstname :"",
                newLastname :"",
                newEmail :"",
                newPassword :"",
                updateFirstname :"",
                updateLastname :"",
                updateEmail :"",
                updatePassword :"",
                sessionUserConnect : {id :null, email :null, firstname :null, lastname :null, role :null}
            };
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
            if (this.sessionUserConnect.role == 2){
                this.$router.push('/stats')
            }

        },
        methods: {
            deconnexion(){
                //we empty the browser session when disconnecting
                sessionStorage.clear()
                this.$router.go("#")
            },
            funRedirect(value){
                //it is a redirection function
              this.$router.push("/"+value+"")
            },
            funList(){
                //this function is used to display a component or part of a component
                this.$root.$emit('funList')
                this.cache = false
            },
            funCreerUser(){
                //this function is used to display a component or part of a component

                this.$root.$emit('funCreerUser')
                this.cache = false
            },
            funModif() {
                //this function is used to display a component or part of a component

                this.$root.$emit('funModif')
                this.cache = false
            },
            funRecherche() {
                //this function is used to display a component or part of a component
                sessionStorage.setItem('search',this.newSearch);
                this.cache = false
                this.$router.push("/listing")
                window.location.reload(false);
            },
            funCreerTeam() {
                //this function is used to display a component or part of a component
                this.$root.$emit('funCreerTeam')
                this.cache = false
            },
        }
    }
</script>

<style scoped>

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        text-decoration: none;
        color: black;
    }
    #navbar{
        background-color: #D9A679;
    }

</style>