<template>
    <div class="">
        <h2>Bonjour {{userConnectFirst}} {{userConnectLast}}</h2>

        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <div class="mt-3">
                        <b-button-group vertical>
                            <b-button @click="funCreer" variant="success">Créer un utilisateur</b-button>
                            <b-button @click="funRecherche" variant="info">Rechercher un utilisateur</b-button>
                            <b-button @click="funModif" variant="warning">Modifier mon profil</b-button>
                        </b-button-group>
                    </div>
                </b-col>
                <b-col>
                    <div v-if="clickCreer">
                        <b-form-input id="input-1" v-model="newFirstname" required
                                      placeholder="Enter le prenom"></b-form-input>
                        <b-form-input id="input-1" v-model="newLastname" required
                                      placeholder="Enter le nom"></b-form-input>
                        <b-form-input id="input-1" v-model="newEmail" type="email" required
                                      placeholder="Enter le mail"></b-form-input>
                        <b-form-input id="input-1" v-model="newPassword" type="password" required
                                      placeholder="Enter le mot de passe"></b-form-input>
                        <br><b-button variant="success">Valider</b-button>
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
            };
        },
        methods: {
            funCreer() {
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