<template>
    <div id="container">
        <div>
            <!-- Treasure List -->
            <ion-list>
                <ion-item v-for="(t, i) in treasure" :key="i">
                    <ion-label>
                        <h2>{{ t.name }}</h2>
                    </ion-label>
                    <ion-label slot="end">
                        <ion-buttons>
                            <ion-button @click="edit(t);openModal(true)">Edit</ion-button>
                            <ion-button @click="deleteTreasure(t._id)">Delete</ion-button>
                        </ion-buttons>
                    </ion-label>
                </ion-item>
            </ion-list>
            <ion-button @click="createNew();openModal(true)">Create New Treasure</ion-button>

            <!-- Modal -->
            <ion-modal
                :is-open="isOpenRef"
                @didDismiss="openModal(false)"
            >
                <ion-content>
                <ion-header translucent>
                    <ion-toolbar>
                        <ion-title>Modal Content</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="openModal(false)">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-list>
                    <ion-list-header lines="full">
                        <ion-label>Treasure</ion-label>
                    </ion-list-header>

                    <ion-item>
                        <ion-label>ID</ion-label>
                        <ion-input disabled>{{ newTreasure._id }}</ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label>Name</ion-label>
                        <ion-input v-model="newTreasure.name" placeholder="Name"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label>Difficulty</ion-label>
                        <ion-input v-model="newTreasure.difficulty" placeholder="ID"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked">Location</ion-label>
                        <ion-input v-model="newTreasure.location.lat" type="number" placeholder="Latitude"></ion-input>
                        <ion-input v-model="newTreasure.location.lng" type="number" placeholder="Longitude"></ion-input>
                        <ion-input v-model="newTreasure.location.city" placeholder="City"></ion-input>
                        <ion-input v-model="newTreasure.location.province" placeholder="Province"></ion-input>
                        <ion-input v-model="newTreasure.location.country" placeholder="Country"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked">Puzzle</ion-label>
                        <ion-input v-model="newTreasure.puzzle.q" placeholder="Question"></ion-input>
                        <ion-input v-model="newTreasure.puzzle.a" placeholder="Answer"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label>Description</ion-label>
                        <ion-input v-model="newTreasure.description" placeholder="ID"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label>Reward</ion-label>
                        <ion-input v-model="newTreasure.reward" placeholder="ID"></ion-input>
                    </ion-item>
                </ion-list>
                <ion-button v-if="mode=='edit'" @click="updateTreasure()">Update</ion-button>
                <ion-button v-if="mode=='create'" @click="saveTreasure()">Save</ion-button>
                </ion-content>
            </ion-modal>
        </div>
    </div>
</template>

<script>
import { IonContent, IonModal, IonInput, IonLabel, IonButton, IonHeader, IonListHeader, IonToolbar, IonButtons, IonTitle, IonItem, IonList, toastController, alertController  } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
const axios = require('axios');

export default defineComponent ({
    name: 'AdminComponent',
    components: { IonContent, IonModal, IonInput, IonLabel, IonButton, IonHeader, IonListHeader, IonToolbar, IonButtons, IonTitle, IonItem, IonList },
    data() {
        return {
            mode: '',
            newTreasure: {
                _id: '',
                name: '',
                difficulty: '',
                distance: 0,
                location: {
                    lat: 0,
                    lng: 0,
                    city: '',
                    province: '',
                    country: '',
                },
                puzzle: {
                    q: '',
                    a: '',
                },
                description: '',
                reward: ''
            },
        }
    },
    setup() {
        const isOpenRef = ref(false);
        const openModal = (state) => isOpenRef.value = state;
        return {
            isOpenRef,
            openModal,
        }
    },
    computed: {
        ...mapGetters({
            treasure: 'getAll'
        }),
    },
    methods: {
        edit(t) {
            this.newTreasure = t
            this.mode = 'edit'
            console.log(this.newTreasure,t)
        },
        createNew() {
            this.mode = 'create'
            this.newTreasure._id = ''
            this.newTreasure.name = ''
            this.newTreasure.difficulty = ''
            this.newTreasure.location.lat = 0
            this.newTreasure.location.lng = 0
            this.newTreasure.location.city = ''
            this.newTreasure.location.province = ''
            this.newTreasure.location.country = ''
            this.newTreasure.puzzle.q = ''
            this.newTreasure.puzzle.a = ''
            this.newTreasure.description = ''
            this.newTreasure.reward = ''
        },
        async saveTreasure() {
            try {
                await axios.post("https://city-hunt-backend.herokuapp.com/treasure",{
                    name: this.newTreasure.name,
                    difficulty: this.newTreasure.difficulty,
                    distance: 0,
                    location: this.newTreasure.location,
                    puzzle: this.newTreasure.puzzle,
                    description: this.newTreasure.description,
                    reward: this.newTreasure.reward
                }).then(res => {
                    if(res.status==200) {
                        this.openToast("Success");
                        this.openModal(false)
                    } else {
                        this.openToast("Error");
                        this.openModal(false)
                    }
                })               
            } catch(e) {
                this.openToast("Error");
                console.log(e)
            }
        },
        async updateTreasure() {
            try {
                axios.post("https://city-hunt-backend.herokuapp.com/treasure/update/:_id",{
                    _id: this.newTreasure._id,
                    name: this.newTreasure.name,
                    difficulty: this.newTreasure.difficulty,
                    distance: 0,
                    location: this.newTreasure.location,
                    puzzle: this.newTreasure.puzzle,
                    description: this.newTreasure.description,
                    reward: this.newTreasure.reward
                })
                this.openToast("Success");
                this.openModal(false)
            } catch(e) {
                this.openToast("Error");
                console.log(e)
            }
        },
        async deleteTreasure(_id) {
            const alert = await alertController
                .create({
                    header: 'Confirm',
                    message: 'Are you sure you want to delete this?',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            id: 'cancel-button',
                            handler: blah => {
                                console.log('Confirm Cancel:', blah)
                            },
                        },
                        {
                            text: 'Okay',
                            id: 'confirm-button',
                            handler: () => {
                                axios.post(`https://city-hunt-backend.herokuapp.com/treasure/delete/:${_id}`,{
                                    _id: _id
                                })
                            },
                        },
                    ],
                });
            return alert.present();
        },
        async openToast(message) {
            const toast = await toastController.create({
                message: message,
                duration: 3000
            })
            return toast.present();
        },
    }
})
</script>

<style scoped>
#container {
    text-align: center;
}

#container a {
    text-decoration: none;
}
</style>