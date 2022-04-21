<template>
  <div id="container">
    <ion-grid>
      <ion-row v-if="treasure" id="list">
        <ion-col>
          <ion-list>
            <ion-list-header><h2>Treasure list</h2></ion-list-header>
            <ion-item v-for="(t, i) in treasure" :key="i" :router-link="`/treasure/${t._id}`">
              <ion-label>
                <h2>{{ t.name }}</h2>
              </ion-label>
              <ion-label v-if="t.score" slot="end">
                <h4><ion-badge>{{ t.score.toFixed(2) }}</ion-badge></h4>
              </ion-label>
              <ion-label slot="end">
                <h4><ion-badge>{{ t.difficulty.toUpperCase() }}</ion-badge></h4>
              </ion-label>
              <ion-label slot="end">
                <h4 v-if="t.distance <= 5"><ion-badge>NEAR</ion-badge></h4>
                <h4 v-else-if="5 < t.distance && t.distance <= 10"><ion-badge color="warn">MEDIUM</ion-badge></h4>
                <h4 v-else-if="10 < t.distance"><ion-badge color="danger">FAR</ion-badge></h4>
                <h4 v-else><ion-badge>None</ion-badge></h4>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>
      <div v-else>
        <h4>No result</h4>
      </div>
    </ion-grid>
  </div>
</template>

<script>
import { IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonBadge, IonListHeader } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TreasureList',
  props: ['treasure'],
  components: { IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonBadge, IonListHeader },
});
</script>

<style scoped>
#container {
  text-align: center;
  margin-top: 1.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}

#container a {
  text-decoration: none;
}
ion-list {
  background-color: transparent;
}
ion-item {
  margin-top: 0.5rem;
  margin-right: 0.2rem;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(77, 95, 122, 0.3);
}
</style>
