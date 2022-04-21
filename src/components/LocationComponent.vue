<template>
  <div id="container">
    <h4>Your location</h4>
    <h3>{{ location.name }}</h3>
    <p v-if="location.latitude"><ion-badge>{{ location.latitude.toFixed(2) }}</ion-badge> <ion-badge>{{ location.longitude.toFixed(2) }}</ion-badge></p>
  </div>
</template>

<script>
import { IonBadge } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LocationComponent',
    props: ['location'],
    components: { IonBadge },
});
</script>

<style scoped>
#container {
  text-align: center;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}

#container a {
  text-decoration: none;
}
</style>