<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/téléchargement.png">

    <BaseFront></BaseFront>
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
