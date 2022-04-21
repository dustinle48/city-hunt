<template>
  <div id="container">
    <h3>Search</h3>
    <!-- Country search -->
    <ion-item>
      <ion-label>Country</ion-label>
      <ion-select v-model="location.country">
        <ion-select-option value="canada">Canada</ion-select-option>
        <ion-select-option value="us">US</ion-select-option>
      </ion-select>
    </ion-item>

    <!-- Province search -->
    <ion-item>
      <ion-label>Province</ion-label>
      <ion-select v-model="location.province">
        <ion-select-option value="ontario">Ontario</ion-select-option>
        <ion-select-option value="us">US</ion-select-option>
      </ion-select>
    </ion-item>

    <!-- City search -->
    <ion-item>
      <ion-label>City</ion-label>
      <ion-select v-model="location.city">
        <ion-select-option value="toronto">Toronto</ion-select-option>
        <ion-select-option value="us">US</ion-select-option>
      </ion-select>
    </ion-item>

    <!-- Difficulty search -->
    <ion-item>
      <ion-label>Difficulty</ion-label>
      <ion-select v-model="difficulty">
        <ion-select-option value="any">Any</ion-select-option>
        <ion-select-option value="easy">Easy</ion-select-option>
        <ion-select-option value="normal">Normal</ion-select-option>
        <ion-select-option value="hard">Hard</ion-select-option>
      </ion-select>
    </ion-item>

    <ion-button @click="searchTreasure()">Search</ion-button>
  </div>
</template>

<script>
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchComponent',
  components: { IonItem, IonLabel, IonSelect, IonSelectOption, IonButton },
  data() {
    return {
      location: {
        city: 'toronto',
        province: 'ontario',
        country: 'canada'
      },
      difficulty: 'any',
      distance: 5,
    }
  },
  methods: {
    searchTreasure() {
      this.$emit('search-treasure',{location:this.location,difficulty:this.difficulty,distance:this.distance})
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(77, 95, 122, 0.3);
}

#container a {
  text-decoration: none;
}

ion-item {
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  opacity: 90%;
}

ion-button {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>