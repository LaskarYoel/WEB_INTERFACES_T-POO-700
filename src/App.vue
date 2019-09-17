<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/téléchargement.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <div style="margin-top: 10px">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">GC</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown text="Access management" right>
              <b-dropdown-item href="#">Listing</b-dropdown-item>
              <b-dropdown-item @click.prevent="funCreerUser" >Create a User</b-dropdown-item>
              <b-dropdown-item @click.prevent="funCreerTeam">Create a Team</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#">Statistics</b-nav-item>
          </b-navbar-nav>

          <b-navbar-brand style="font-size: 16px; margin-left: auto">Welcome back Mr/Mme Dupond Tupont , last login on the 2019/09/16 at 11h26</b-navbar-brand>


          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="funRecherche">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item @click.prevent="funModif" >Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <b-container class="bv-example-row" >
      <b-row>
        <b-col>
          <User ref="form" msg="Welcome to Your Vue.js App"/>
        </b-col>
        <b-col>
          <ClockManager/>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <ChartManager />
        </b-col>
        <b-col>
          <WorkingTimes />
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>




<script>
import User from './components/User.vue'
import ChartManager from "@/components/ChartManager";
import WorkingTime from "@/components/WorkingTime";
import WorkingTimes from "@/components/WorkingTimes";
import ClockManager from "@/components/ClockManager";

export default {
  name: 'app',
  components: {
    ClockManager,
    WorkingTimes,
    WorkingTime,
    ChartManager,
    User
  },
  methods: {
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.col { border: 1px solid transparent; }
</style>
