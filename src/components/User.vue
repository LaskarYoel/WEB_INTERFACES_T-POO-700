<template>
    <div class="">
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <div style="margin-top: 10px" v-if="clickCreer">
                        <h2>Creating a new user</h2>
                        <b-form-group label-cols="6" label-cols-lg="6"  label="First name:" >
                            <b-form-input  v-model="newFirstname " required
                                          placeholder="Enter the first name"></b-form-input>
                        </b-form-group>
                        <b-form-group label-cols="6" label-cols-lg="6"  label="Last name:" >
                            <b-form-input id="input-1" v-model="newLastname " required
                                          placeholder="Enter the last name"></b-form-input>
                        </b-form-group>
                        <b-form-group label-cols="6" label-cols-lg="6"  label="Email:" >
                            <b-form-input id="input-1" v-model="newEmail " type="email" required
                                          placeholder="Enter the email"></b-form-input>
                        </b-form-group>
                        <b-form-group label-cols="6" label-cols-lg="6"  label="Password:" >
                            <b-form-input id="input-1" v-model="newPassword" type="password" required
                                          placeholder="Enter the password"></b-form-input>
                        </b-form-group>

                        <br><b-button @click="newUser()" variant="success">Valider</b-button>
                    </div>
                    <div v-if="clickRecherche">
                        <br><br>
                        <b-form-input id="input-1" v-model="rechercheEmail" type="email" required
                                      placeholder="Enter le mail"></b-form-input>
                        <br><b-button variant="info">Valider</b-button>
                    </div>
                    <div v-if="clickModif">
                        <b-form-input id="input-1" v-model="this.userConnectFirst" required
                                      placeholder="Enter le prenom"></b-form-input>
                        <b-form-input id="input-1" v-model="this.userConnectLast" required
                                      placeholder="Enter le nom"></b-form-input>
                        <b-form-input id="input-1" v-model="this.userConnectEmail" type="email" required
                                      placeholder="Enter le mail"></b-form-input>
                        <b-form-input id="input-1" v-model="this.userConnectPassword" type="password" required
                                      placeholder="Enter le mot de passe"></b-form-input>
                        <br><b-button variant="warning">Valider</b-button>
                    </div>
                </b-col>
            </b-row>
        </b-container>


    </div>

</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                clickCreer: false,
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
            };
        },mounted() {
            const axios = require('axios');
            axios
                .get('http://localhost:4000/api/users/1')
                .then(response => {
                    this.userConnectFirst = response.data.data.user
                    this.userConnectEmail = response.data.data.email
                })
        },
        methods: {
            newUser() {
                const axios = require('axios');
                axios
                    .post('http://localhost:4000/api/users',
                       {
                            users:{
                                "email":this.newEmail,
                                "firstname": this.newFirstname,
                               "lastname": this.newLastname,
                               "password": this.newPassword,

                            }
                        }
                    )
            },
            updateUser() {
                const axios = require('axios');

                    this.updateFirstname = this.userConnectFirst,
                    this.updateLastname = this.userConnectLast,
                    this.updateEmail = this.userConnectEmail,
                    this.updatePassword = this.userConnectPassword,

                axios
                    .put('http://localhost:4000/api/users/1',
                       {
                            users:{
                                "email":this.updateEmail,
                                "username": this.updateFirstname
                                //"firstname": this.updateFirstname
                              // "lastname": this.updateLastname
                              // "password": this.updatePassword
                            }
                        }
                    )
            },
            funCreerUser() {
                this.clickCreer = true,
                this.clickRecherche = false,
                this.clickModif = false
            },
            funRecherche() {
                this.clickCreer = false,
                this.clickRecherche = true,
                this.clickModif = false
            },
            funModif() {
                this.clickCreer = false,
                this.clickRecherche = false,
                this.clickModif = true
            },
        }
    }
</script>

<style scoped>

</style>