<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/tabs/home"></ion-back-button>
                </ion-buttons>
                <ion-title>Treasure</ion-title>
            </ion-toolbar>
        </ion-header>
    <ion-content :fullscreen="true">
        <TreasureComponent v-bind:treasure="treasure" />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
import TreasureComponent from '@/components/TreasureComponent.vue';

export default {
    name: 'TreasurePage',
    components: { TreasureComponent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton },
    computed: {
        treasure() {
            let treasure = this.$store.getters.getById(`${this.$route.params.id}`)
            console.log(treasure)
            return treasure
        }
    }
}
</script>

<style scoped>

</style>