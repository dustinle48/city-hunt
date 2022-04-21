<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="bg">
        <div id="search">
          <SearchComponent v-on:search-treasure="searchTreasure($event)" />
        </div>
        <div id="treasure">
          <TreasureList v-if="treasure.length > 0" :treasure=treasure />
        </div>
        <div id="none" v-if="treasure.length <= 0">
          <ion-title>No result</ion-title>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import SearchComponent from '@/components/SearchComponent.vue';
import TreasureList from '@/components/TreasureList.vue';

export default {
  name: 'SearchPage',
  components: { SearchComponent, TreasureList, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      treasure: [],
    }
  },
  methods: {
    searchTreasure({location,difficulty}) {
      this.treasure = []
      if(difficulty == 'any') {
        this.treasure = this.$store.getters.getSearchTreasureNoDiff(location,999999999)
      } else {
        this.treasure = this.$store.getters.getSearchTreasure(location,difficulty,999999999)
      }
    }
  }
};
</script>

<style scoped>
#bg {
  min-height: 100%;
  background-image: url('~/public/assets/ice.jpg');
  background-size: cover;
  opacity: 80%;
  padding-bottom: 2rem;
}
#search {
  padding-top: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
#treasure {
  padding-top: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 2rem;
}
#none {
  padding-top: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 2rem;
  text-align: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  backdrop-filter: blur(4px) saturate(180%);
  -webkit-backdrop-filter: blur(4px) saturate(180%);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>
