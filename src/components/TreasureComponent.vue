<template>
  <div id="container">
    <ion-grid v-if="treasure">
      <!-- A brief description -->
      <ion-row id="description" class="section">
        <ion-col>
          <div class="text">
            <h4><strong>A brief description</strong></h4>
            <p>{{ treasure.description }}</p>
          </div>
          <ion-button size="small" @click="reveal_c1()">Reveal challenge 1</ion-button>
        </ion-col>
      </ion-row>
      <!-- Challenge 1 -->
      <ion-row id="challenge1" class="section" v-if="c1_reveal">
        <ion-col>
          <div class="text">
            <h4><strong>Challenge 1</strong></h4>
            <p>Question: {{ treasure.puzzle.q }}</p>
          </div>
          <ion-input v-model="c1_ans"></ion-input>
          <ion-button size="small" @click="c1Answer()">Submit</ion-button>
        </ion-col>
      </ion-row>
      <!-- Location -->
      <ion-row id="location" class="section" v-if="c1">
        <ion-col>
          <div class="text">
            <h4><strong>Location</strong></h4>
            <p>Upon arriving to this location, next challenge will be reveal.</p>   
          </div>
          <!-- Google map -->
          <div id="map"></div>
        </ion-col>
      </ion-row>
      <!-- Challenge 2 -->
      <ion-row id="challenge2" class="section" v-if="c1">
        <ion-col>
          <div class="text">
            <h4><strong>Challenge 2</strong></h4>
            <p>Take some beautiful pictures of you and the place to complete this challenge!</p>   
          </div>
          <ion-img :src="image.webPath"></ion-img>
          <ion-button class="camera" shape="round" size="small" @click="takePhoto()"><ion-icon :icon="camera"></ion-icon></ion-button>
        </ion-col>
      </ion-row>
      <!-- Reward -->
      <ion-row id="reward" class="section" v-if="finish">
        <ion-col>
          <div class="text">
            <h4><strong>Reward</strong></h4>
          </div>
          <p>{{ treasure.reward }}</p>
          <ion-button size="small" @click="share()">Share your archivement</ion-button>
        </ion-col>
      </ion-row>
      <!-- Feedback -->
      <ion-row id="feedback" class="section" v-if="finish">
        <ion-col v-if="!feed">
          <div class="text">
            <h4><strong>Feedback</strong></h4>
          </div>
          <p>Please let us know how you think about this treasure!</p>
          <ion-textarea v-model="feedback.comment"></ion-textarea>
          <ion-range v-model="feedback.rate" min="0" max="10" step="1" snaps="true" pin color="secondary">
            <ion-label slot="start">0</ion-label>
            <ion-label slot="end">10</ion-label>
          </ion-range>
          <ion-button size="small" @click="sendFeedback()">Send</ion-button>
        </ion-col>
        <ion-col v-if="feed">
          <h4>Thank you for your feedback!</h4>
        </ion-col>
      </ion-row>
    </ion-grid>
    <h2 v-else>Something went wrong!</h2>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { isPlatform, IonLabel, IonGrid, IonRow, IonCol, IonInput, IonButton, IonIcon, IonImg, IonTextarea, IonRange, loadingController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem } from '@capacitor/filesystem';
import { FileSharer } from '@byteowls/capacitor-filesharer';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default defineComponent({
    name: 'TreasureComponent',
    props: ['treasure'],
    components: { IonLabel, IonGrid, IonRow, IonCol, IonInput, IonButton, IonIcon, IonImg, IonTextarea, IonRange },
    data() {
      return {
        c1_reveal: false,
        c1_ans: '',
        c1: false,
        finish: false,
        image: Object,
        base64: '',
        feedback: {
          comment: '',
          rate: 0,
        },
        feed: false,
        map: null,
        marker: null,
        currPos: null,
      }
    },
    setup(props) {
      const center = { lat: props.treasure.location.lat, lng: props.treasure.location.lng };
      return {
        camera,
        center,
      }
    },
    computed: {
      ...mapGetters({
        location: 'getLocation'
      }),
    },
    methods: {
      reveal_c1() {
        this.c1_reveal = true;
      },
      c1Answer() {
        if(this.c1_ans.toLowerCase() == this.treasure.puzzle.a.toLowerCase()) {
          this.c1 = true;
          setTimeout(this.initMap, 2000)
        }
      },
      async initMap() {
        await loadingController.create({
          message: "Initiating map...",
          duration: 2000
        }).then(loading => loading.present());
        this.showMap();
        this.setMarker(this.center,"B");
        this.setMarker({lat:this.location.latitude,lng:this.location.longitude},"A")
        this.setDirection();
      },
      async showMap() {
        let location = new google.maps.LatLng(this.treasure.location.lat,this.treasure.location.lng)
        const options = {
          center: location,
          zoom: 12,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }
        this.map = new google.maps.Map(document.getElementById('map'),options)
      },

      setMarker(location,label) {
        this.currPos = new google.maps.Marker({
          position: {lat:location.lat, lng:location.lng},
          map: this.map,
          label: {
            text: label
          }
        })
      },

      setDirection() {
        let dS = new google.maps.DirectionsService();
        let dD = new google.maps.DirectionsRenderer();
        let request = {
          origin: {lat:this.location.latitude,lng:this.location.longitude},
          destination: this.center,
          travelMode: 'DRIVING'
        };
        dD.setMap(this.map);
        dS.route(request,(result,status)=>{
          if(status=='OK') {
            dD.setDirections(result);
          }
        })
      },

      //Take and share image
      async takePhoto() {
        this.image = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 80,
        })
        this.finish = true
        console.log(this.image)
      },
      async share() {
        this.base64 = await this.readAsBase64(this.image)
        console.log(this.base64)
        FileSharer.share({
          filename: "image.jpeg",
          base64Data: this.base64,
          contentType: "image/jpeg",
        }).then(res=> {
          console.log(res)
        })
      },
      async readAsBase64(photo) {
        if(isPlatform('hybrid')) {
          const file = await Filesystem.readFile({
            path: photo.path
          })
          return file.data
        } else {
          const res = await fetch(photo.webPath)
          const blob = await res.blob()
          return await this.convertBlobToBase64(blob)
        }
      },
      //Helper
      convertBlobToBase64(blob) {
        return new Promise((res,rej) => {
          const reader = new FileReader
          reader.onerror = rej
          reader.onload = () => {
            res(reader.result)
          }
          reader.readAsDataURL(blob)
        })
      },
      /* convertBlobToBase64 = (blob) => new Promise((res,rej) => {
        const reader = new FileReader
        reader.onerror = rej
        reader.onload = () => {
          res(reader.result)
        }
        reader.readAsDataURL(blob)
      }), */

      async sendFeedback() {
        const res = await axios.post('https://city-hunt-backend.herokuapp.com/treasure/feedback/:_id',{
          _id: this.treasure._id,
          user: 'guest',
          comment: this.feedback.comment,
          rate: this.feedback.rate
        })
        if (res.status==200) {
          this.feed = true
        }
      }
    }
});
</script>

<style scoped>
#container {
  background-image: url('~/public/assets/background.png');
  text-align: center;
  min-height: 100%;
  background-size: cover;
  padding-bottom: 2rem;
}

#container a {
  text-decoration: none;
}

ion-input {
  border: 0.1rem black solid;
  margin-bottom: 0.5rem;
}

ion-badge {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-size: 20px;
}

ion-textarea {
  border: 1px solid black;
}
.section {
  border-radius: 15px;
  margin-top: 0.8rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0.5rem;
  opacity: 80%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px) saturate(180%);
  -webkit-backdrop-filter: blur(8px) saturate(180%);
  border: 1px solid rgba(50, 48, 48, 0.35);
}

.text {
  text-align: start;
  text-align: justify;
}

.camera {
  border-radius: 25px;
}

#map {
  height: 12rem;
  width: auto;
}

#description {
  background-color: aqua;
}

#challenge1 {
  background: yellow;
}

#location {
  color: white;
  background-color: blue;
}

#challenge2 {
  background-color:blanchedalmond;
}

#reward {
  color: white;
  background-color: brown;
}

#feedback {
  background-color: rgb(204, 218, 203);
}
</style>