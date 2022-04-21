<template>
  <div id="container">
    <div class="wrapper">
      <h1><strong>CITY HUNT</strong></h1>
      <h3>COMP3097 PROJECT</h3>
      <p>_______________________________</p>
      <h3>LE DUC THINH - 101110291</h3>
      <p>_______________________________</p>
      <div v-if="!state">
        <h3>Feedback and suggestion</h3>
        <ion-textarea id="text-area" v-model="email"></ion-textarea>
        <ion-button @click="sendEmail()">Submit</ion-button>
      </div>
      <div v-if="state">
        <h3>Thank you for your feedback!</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { IonTextarea, IonButton, loadingController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default defineComponent({
  name: 'AboutView',
  components: { IonTextarea, IonButton },
  data() {
    return {
      email: `Your feedback is very important for us !`,
      state: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    }),
  },
  methods: {
    async sendEmail() {
      const loading = await loadingController.create({
          message: 'Sending...',
        })
      try {
        await loading.present()
        await axios.post('https://city-hunt-backend.herokuapp.com/mail/sendmailtodb',{
          user: this.user.email,
          platform: this.user.platform,
          email: this.email
        }).then(res => {
          if(res.status==200) {
            this.state = true
            setTimeout(() => {
              loading.dismiss()
            })
          }
        })
      } catch(e) {
        console.log(e)
      } finally {
        setTimeout(() => {
          loading.dismiss()
        })
      }
    },
  }
});
</script>

<style scoped>
#container {
  background-image: url('~/public/assets/leaf.jpg');
  background-size: cover;
  text-align: center;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container a {
  text-decoration: none;
}

.wrapper {
  margin: auto 2rem;
  padding: 1rem 2rem;
  text-align: center;
  backdrop-filter: blur(2px) saturate(180%);
  -webkit-backdrop-filter: blur(2px) saturate(180%);
  background-color: rgba(222, 230, 241, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#text-area {
  border: 0.1rem black solid;
  background-color: white;
  opacity: 90%;
  height: 6rem;
  text-align: start;
}

ion-button {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>