<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
const axios = require('axios');

export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let treasure = await axios.get('https://city-hunt-backend.herokuapp.com/treasure')
      for (const t of treasure.data) {
        this.$store.dispatch("addTreasure",{
          treasure: t
        })
      }
    },
  }
};
</script>