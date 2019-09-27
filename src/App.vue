<template>
  <div >
    <img style="margin-top: 10px;margin-left: 45%" alt="Vue logo" src="./assets/logo1.png">


    <div v-if="!sessionUserConnect.id" class="col-lg-12 format">
      <div style="margin-top: 10%" class="row">
        <div style="box-shadow: 0px 0px 5px black;border-radius: 30px;" class="col-lg-6 offset-3">
          <form method="post" @submit.prevent="login">
            <h3 style="margin-top: 26px">Email : </h3>
            <b-form-input   type="email" id="email" class="fadeIn second" name="email" placeholder="email" v-model="email" maxlength="30" :has-counter="false" size="is-medium"/>
            <h3 style="margin-top: 26px">Password : </h3>
            <b-form-input    type="password" id="password" class="fadeIn third" name="password" placeholder="password" v-model="password" maxlength="30" :has-counter="false" size="is-medium"/>

            <b-button @click="tryConnect" class="b-button" size="lg" pill variant="primary">Log In</b-button>

          </form>
        </div>
      </div>
    </div>

    <BaseFront v-if="sessionUserConnect.id" ></BaseFront>

    <router-view></router-view>

  </div>
</template>




<script>
/*
import User from './components/User.vue'
import ChartManager from "@/components/ChartManager";
import HelloWorld from "@/components/HelloWorld";
import WorkingTimes from "@/components/WorkingTimes";
import ClockManager from "@/components/ClockManager";
*/
import BaseFront from "@/components/BaseFront";
import axios from 'axios'

export default {
  name: 'app',
  components: {
    /*
    ClockManager,
    WorkingTimes,
    //HelloWorld,
    ChartManager,
    User,*/
    BaseFront,

  },
  data(){
    return {
      sessionUserConnect : null ,
      isConnected : false,
      email : null,
      password : null,
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
  methods: {
    tryConnect(){
      axios.get('http://localhost:4000/api/users/sign_in?email='+this.email+'&password='+this.password)
              .then(response => {
                if (response.data.data[0]){
                  sessionStorage.setItem('id',response.data.data[0].id);
                  sessionStorage.setItem('email', response.data.data[0].email);
                  sessionStorage.setItem('firstname', response.data.data[0].firstname);
                  sessionStorage.setItem('lastname', response.data.data[0].lastname);
                  sessionStorage.setItem('role', response.data.data[0].role);

                  this.sessionUserConnect = {id :null, email :null, firstname :null, lastname :null, role :null};

                  this.sessionUserConnect.id = sessionStorage.getItem('id')
                  this.sessionUserConnect.email = sessionStorage.getItem('email')
                  this.sessionUserConnect.firstname = sessionStorage.getItem('firstname')
                  this.sessionUserConnect.lastname = sessionStorage.getItem('lastname')
                  this.sessionUserConnect.role = sessionStorage.getItem('role')

                  this.isConnected = true
                }
                else this.makeToast('danger','Connecting fail','User not found')
              })
    },
    makeToast(variant,title,msg) {
      this.$bvToast.toast(msg, {
        title: `${title}`,
        variant: variant,
        solid: true
      })
    },
    funModif() {
      this.$refs.form.funModif()
    },
    funRecherche() {
      this.$refs.form.funRecherche()
    },
    funCreerUser() {
      this.$refs.form.funCreerUser()
    },
    funCreerTeam() {
      this.$refs.form.funCreerTeam()
    },
  }
}
</script>

<style scoped>


  .b-button {
    margin-top: 26px;
    margin-bottom: 26px
  }
</style>