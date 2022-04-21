<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
        <ion-title slot="end">Hello {{ user.name.toUpperCase() }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div id="bg">
        <div id="location">
          <LocationComponent v-if="location" :location=location />
        </div>
        <TreasureList v-if="treasure" :treasure=treasure />
        <div v-else>Loading</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import TreasureList from '@/components/TreasureList.vue';
import LocationComponent from '@/components/LocationComponent.vue';
import { mapGetters } from 'vuex';
import { Geolocation } from '@capacitor/geolocation';
const axios = require('axios');

export default {
  name: 'HomePage',
  components: { TreasureList, LocationComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      API: 'AIzaSyChJArZ78Q22GQJD-NlCfuopjEZ_9SNVPU',
      location: {
        latitude: 0,
        longitude: 0,
        name: ''
      },
    }
  },
  mounted() {
    this.init();
    this.addScore(this.treasure)
  },
  computed: {
    ...mapGetters({
      treasure: 'getAll',
      user: 'getUser'
    }),
  },
  methods: {
    init() {
      //Get current location from Geolocation
      Geolocation.getCurrentPosition().then(
        res => {
          this.location.latitude = res.coords.latitude
          this.location.longitude = res.coords.longitude
          this.getCurrentLocationName(res.coords.latitude,res.coords.longitude).then(name => {
            this.location.name = name.data.plus_code.compound_code
            this.addLocation(this.location);
            //Calculate distance of treasure based on current location
            for(let t of this.treasure) {
              let d = this.getDistance(this.location.latitude,this.location.longitude,t.location.lat,t.location.lng)
              this.addDistance(t._id,d)
            }
          },
          () => {
            this.location.name = "Google API returns an error"
          }
          )
        },
        () => {
          this.location.name = "Need Location service permission"
        }
      )
    },

    //Geocoding google API
    async getCurrentLocationName(lat,lng) {
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.API}`)
    },
      
    //Calculate each treasure distance
    getDistance(c_lat,c_lng,t_lat,t_lng) {
      //current lat lng and treasure lat lng
      //Each latitude degree is approx 110km
      let x = Math.pow(((t_lat - c_lat)*110),2)
      //Each longitude degree is approx 85km
      let y = Math.pow((t_lng - c_lng)*85,2)
      return Math.sqrt(x+y)
    },

    addLocation(location) {
      this.$store.dispatch('addLocation',{
        location: location
      })
    },

    addDistance(id,distance) {
      this.$store.dispatch('addDistance',{
        id: id,
        distance: distance
      })
    },

    addScore(treasure) {
      for (const t of treasure) {
        let a = 0
        if (t.feedback.length > 0) {
          for (const s of t.feedback) {
            a += s.rate
          }
        }
        let average = a / t.feedback.length
        this.$store.dispatch("addScore",{
          id: t._id,
          score: average
        })
      }
    }

    //test
  }
};
</script>

<style scoped>
#bg {
  height: 100%;
  background-image: url('~/public/assets/waterfalls.jpg');
  background-size: cover;
  opacity: 80%;
}
#location {
  padding-top: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>